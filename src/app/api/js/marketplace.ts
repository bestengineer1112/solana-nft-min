import * as anchor from '@project-serum/anchor'
import { Marketplace as MarketplaceDefinition } from './types/marketplace'
import { MARKETPLACE_PROGRAM_ID } from './constant'
// import * as idl from './types/marketplace.json'
import idl from './types/marketplace.json'

import { Keypair, PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getCollectionPDA, getMarketplacePDA, getEscrowPDA } from './getPDAs'

import { IdlAccounts, web3 } from "@project-serum/anchor";


export class Marketplace {
    program: anchor.Program<MarketplaceDefinition>
    marketplacePDA: PublicKey
    // marketplace: 
    sellOrders?: IdlAccounts<MarketplaceDefinition>["sellOrder"]


    // program: {
    //     provider: {
    //         connection: {
    //             getAccountInfo: Function
    //         }
    //     },
    //     methods: {
    //         createMarketplace: Function,
    //         createCollection: Function
    //     }
    // }
    // marketplacePDA: PublicKey

    // createMarketplace: Function
    // createCollection: Function

    constructor(provider: anchor.Provider, marketplacePDA: PublicKey) {
        console.log(idl, "idl -- - - - - --")

        console.log(MARKETPLACE_PROGRAM_ID.toBase58())
        // @ts-ignore
        this.program = new anchor.Program(idl, MARKETPLACE_PROGRAM_ID, provider,)
        this.marketplacePDA = marketplacePDA

        // this.createMarketplace = this.createMarketplace1.bind(this)
        // this.createCollection = this.createCollection1.bind(this)
    }

    public async createMarketplace(
        owner: Keypair,
        mint: PublicKey,
        fees: number,
        feesDestination: PublicKey,
    ): Promise<string> {
        let marketplacePDA = await getMarketplacePDA(owner.publicKey)
        this.marketplacePDA = marketplacePDA
        const mPDAAccount = await this.program?.provider.connection.getAccountInfo(marketplacePDA);
        if (mPDAAccount != null) {
            console.log("Already created")
            return ""
        }

        let escrowPDA = await getEscrowPDA(marketplacePDA, mint)
        const ePDAAccount = await this.program.provider.connection.getAccountInfo(escrowPDA);
        if (ePDAAccount != null) {
            console.log("Already created")
            return ""
        }
        return await this.program.methods.createMarketplace(mint, fees, feesDestination, owner.publicKey).accounts(
            {
                payer: owner.publicKey,
                marketplace: marketplacePDA,
                mint: mint,
                escrow: escrowPDA,
                systemProgram: anchor.web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            }
        ).signers([owner]).rpc()
    }

    public async createCollection(
        authority: Keypair,
        name: string,
        required_metadata_signer: PublicKey,
        collection_symbol: PublicKey,
        ignore_creators: boolean,
        fee?: number,
    ): Promise<string> {
        let collectionPDA = await getCollectionPDA(this.marketplacePDA, collection_symbol)
        const cPDAAccount = await this.program.provider.connection.getAccountInfo(collectionPDA);
        if (cPDAAccount != null) {
            console.log("Already created collection")
            return ""
        }
        if (!fee) {
            fee = 0
        }

        return await this.program.methods.createCollection(collection_symbol, required_metadata_signer, fee, ignore_creators).accounts(
            {
                authority: authority.publicKey,
                marketplace: this.marketplacePDA,
                collection: collectionPDA,
                systemProgram: anchor.web3.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            }).signers([authority]).rpc()
    }

    public async getAllAccounts(): Promise<any> {
        return await this.program.account.sellOrder.all();
    }

    public async getAccountByPDA(sellOrdersPDA: PublicKey): Promise<any> {
        let values = await this.program.account.sellOrder.fetch(sellOrdersPDA);
        return values;
    }

    public async getAllOffers(): Promise<any> {
        return await this.program.account.buyOffer.all();
    }

    public async filterSellOrderByMint(mintPubkey: any) {

        let values = await this.program.account.sellOrder.all([
            {
                memcmp: {
                    offset: 8 + // Discriminator.
                        32 + // marketplace.
                        8 + // price.
                        8, // quantity.
                    bytes: mintPubkey,
                }
            }
        ]);

        console.log(values, "filterSellOrderByMint");
        return values;
    }
}
