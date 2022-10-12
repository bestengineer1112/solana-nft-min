import * as anchor from '@project-serum/anchor'
import { Marketplace as MarketplaceDefinition, IDL } from './types/marketplace'
import { MARKETPLACE_PROGRAM_ID } from './constant'
import { Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { _getAssociatedTokenAddress, getNftVaultPDA, getSellOrderPDA, getEscrowPDA, getBuyOfferPDA, getStorePDA } from './getPDAs'
import { getMetadata } from './metaplex'
import { programs } from '@metaplex/js'
import idl from './types/marketplace.json'
import { IdlAccounts, web3 } from "@project-serum/anchor";

const { Metadata } =
    programs.metadata

export class Collection {
    program: anchor.Program<MarketplaceDefinition>
    marketplacePDA: PublicKey
    collectionPDA: PublicKey

    private collectionCache?: IdlAccounts<MarketplaceDefinition>["collection"]

    constructor(
        provider: anchor.Provider,
        marketplacePDA: PublicKey,
        collectionPDA: PublicKey,
    ) {
        // @ts-ignore
        this.program = new anchor.Program(idl, MARKETPLACE_PROGRAM_ID, provider)

        this.marketplacePDA = marketplacePDA
        this.collectionPDA = collectionPDA
    }

    async sellAssetInstruction(
        nftMint: PublicKey,
        sellerNftAccount: PublicKey,
        sellerDestination: PublicKey,
        solPrice: anchor.BN,
        tokenPrice: anchor.BN,
        amount: anchor.BN,
        seller: PublicKey,
    ): Promise<TransactionInstruction> {
        let programNftVaultPDA = await getNftVaultPDA(nftMint)
        let sellOrderPDA = await getSellOrderPDA(sellerNftAccount, solPrice, tokenPrice);

        let metadataPDA = await Metadata.getPDA(nftMint)
        return await this.program.methods.createSellOrder(solPrice, tokenPrice, amount, sellerDestination).accounts(
            {
                payer: seller,
                sellerNftTokenAccount: sellerNftAccount,
                marketplace: this.marketplacePDA,
                collection: this.collectionPDA,
                mint: nftMint,
                metadata: metadataPDA,
                vault: programNftVaultPDA,
                sellOrder: sellOrderPDA,
                systemProgram: anchor.web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            }
        ).instruction()
    }

    async sellAsset(
        nftMint: PublicKey,
        sellerNftAccount: PublicKey,
        sellerDestination: PublicKey,
        solPrice: anchor.BN,
        tokenPrice: anchor.BN,
        amount: anchor.BN,
        seller: PublicKey
    ): Promise<string> {
        let ix = await this.sellAssetInstruction(
            nftMint, sellerNftAccount, sellerDestination,
            solPrice, tokenPrice, amount, seller
        )
        return this._sendInstruction(ix, [])
    }

    async removeSellOrderInstruction(
        nftMint: PublicKey,
        sellerNftAccount: PublicKey,
        sellOrderPDA: PublicKey,
        amount: anchor.BN,
        seller: PublicKey,
    ): Promise<TransactionInstruction> {
        let programNftVaultPDA = await getNftVaultPDA(nftMint)
        return await this.program.methods.removeSellOrder(amount).accounts({
            authority: seller,
            sellerNftTokenAccount: sellerNftAccount,
            vault: programNftVaultPDA,
            sellOrder: sellOrderPDA,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        }).instruction()
    }

    async removeSellOrder(
        nftMint: PublicKey,
        sellerNftAccount: PublicKey,
        sellOrderPDA: PublicKey,
        amount: anchor.BN,
        seller: Keypair,
    ): Promise<string> {
        let ix = await this.removeSellOrderInstruction(
            nftMint,
            sellerNftAccount,
            sellOrderPDA,
            amount,
            seller.publicKey,
        )
        return this._sendInstruction(ix, [seller])
    }

    async addToSellOrderInstruction(
        nftMint: PublicKey,
        sellerNftAccount: PublicKey,
        sellOrderPDA: PublicKey,
        amount: anchor.BN,
        seller: PublicKey,
    ): Promise<TransactionInstruction> {
        let programNftVaultPDA = await getNftVaultPDA(nftMint)
        return await this.program.methods.addQuantityToSellOrder(amount).accounts({
            authority: seller,
            sellerNftTokenAccount: sellerNftAccount,
            vault: programNftVaultPDA,
            sellOrder: sellOrderPDA,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        }).instruction()
    }

    async addToSellOrder(
        nftMint: PublicKey,
        sellerNftAccount: PublicKey,
        sellOrderPDA: PublicKey,
        amount: anchor.BN,
        seller: Keypair,
    ): Promise<string> {
        let ix = await this.addToSellOrderInstruction(
            nftMint,
            sellerNftAccount,
            sellOrderPDA,
            amount,
            seller.publicKey,
        )
        return this._sendInstruction(ix, [seller])
    }

    async buyInstruction(
        nftMint: PublicKey,
        seller: PublicKey,
        sellOrdersPDA: PublicKey[],
        buyerNftAccount: PublicKey,
        buyerPayingAccount: PublicKey,
        wanted_quantity: anchor.BN,
        buyer: PublicKey,
        payType: number
    ): Promise<TransactionInstruction> {
        let programNftVaultPDA = await getNftVaultPDA(nftMint)
        let marketplaceAccount = await this.program.account.marketplace.fetch(this.marketplacePDA)

        let metadata = await getMetadata(
            this.program?.provider.connection,
            nftMint,
        )


        console.log(metadata, "buyInstruction")
        // let metadataPDA = await Metadata.getPDA(nftMint)

        let collection = await this.getCollection()
        let creatorsAccounts = []

        if (!collection.ignoreCreatorFee) {
            for (let creator of metadata.data.creators) {
                let creatorAddress = new PublicKey(creator.address)
                let creatorATA = await _getAssociatedTokenAddress(creatorAddress, marketplaceAccount.mint)

                creatorsAccounts.push(
                    { pubkey: creatorAddress, isWritable: true, isSigner: false },
                )

                creatorsAccounts.push(
                    { pubkey: creatorATA, isWritable: true, isSigner: false },
                )
            }
        }

        let sellOrders = []
        for (let sellOrderPDA of sellOrdersPDA) {
            let so = await this.program.account.sellOrder.fetch(sellOrderPDA)
            sellOrders.push({ pubkey: sellOrderPDA, isWritable: true, isSigner: false })
            sellOrders.push({ pubkey: so.destination, isWritable: true, isSigner: false })
        }

        return await this.program.methods.buy(wanted_quantity, payType).accounts({
            buyer: buyer,
            seller: seller,
            buyerNftTokenAccount: buyerNftAccount,
            buyerPayingTokenAccount: buyerPayingAccount,
            marketplace: this.marketplacePDA,
            marketplaceDestAccount: marketplaceAccount.feesDestination,
            marketplaceAuthority: marketplaceAccount.authority,
            collection: this.collectionPDA,
            // metadata: await Metadata.getPDA(metadata.mint),
            metadata: await Metadata.getPDA(nftMint),
            vault: programNftVaultPDA,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
        }).remainingAccounts([
            ...creatorsAccounts,
            ...sellOrders,
        ]).instruction()
    }

    async buy(
        nftMint: PublicKey,
        seller: PublicKey,
        sellOrdersPDA: PublicKey[],
        buyerNftAccount: PublicKey,
        buyerPayingAccount: PublicKey,
        wanted_quantity: anchor.BN,
        buyer: PublicKey,
        payType: number
    ): Promise<string> {
        let ix = await this.buyInstruction(
            nftMint,
            seller,
            sellOrdersPDA,
            buyerNftAccount,
            buyerPayingAccount,
            wanted_quantity,
            buyer,
            payType,
        )

        return this._sendInstruction(ix, [])
    }

    async getCollection(): Promise<IdlAccounts<MarketplaceDefinition>["collection"]> {
        if (this.collectionCache) {
            return this.collectionCache
        }
        this.collectionCache = await this.program.account.collection.fetch(this.collectionPDA)
        return this.collectionCache
    }

    async createNftOffer(
        nftMint: PublicKey,
        buyerNftTokenAccount: PublicKey,
        buyerTokenAccount: PublicKey,
        buyer: PublicKey,
        solPrice: anchor.BN,
        tokenPrice: anchor.BN,
    ): Promise<string> {
        let metadataPDA = await Metadata.getPDA(nftMint)
        let marketplaceAccount = await this.program.account.marketplace.fetch(this.marketplacePDA)
        let escrowPDA = await getEscrowPDA(this.marketplacePDA, marketplaceAccount.mint)
        let buyOfferPDA = await getBuyOfferPDA(this.marketplacePDA, buyer, nftMint, solPrice, tokenPrice);

        let [storePDA, store_nonce] = await getStorePDA(this.marketplacePDA);

        console.log(this.marketplacePDA.toBase58(), "marketplacePDA")
        console.log(storePDA.toBase58(), "store")
        console.log(solPrice.toString(), "solPrice")
        console.log(tokenPrice.toString(), "tokenPrice")

        let ix = await this.program.methods.createBuyOffer(new anchor.BN(solPrice.toString()), new anchor.BN(tokenPrice.toString()), store_nonce).accounts({
            payer: buyer,
            nftMint: nftMint,
            metadata: metadataPDA,
            marketplace: this.marketplacePDA,
            collection: this.collectionPDA,
            escrow: escrowPDA,
            store: storePDA,
            buyerPayingAccount: buyerTokenAccount,
            buyerNftAccount: buyerNftTokenAccount,
            buyOffer: buyOfferPDA,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        }).instruction();

        return this._sendInstruction(ix, [])
    }

    async excuteNftOffer(
        nftMint: PublicKey,
        buyerNftTokenAccount: PublicKey,
        adminTokenAccount: PublicKey,
        sellerTokenAccount: PublicKey,
        sellerNftAssociatedTokenAccount: PublicKey,
        buyer: PublicKey,
        seller: PublicKey,
        sellOrderPDA: PublicKey,
        solPrice: anchor.BN,
        tokenPrice: anchor.BN,
    ): Promise<string> {
        let metadataPDA = await Metadata.getPDA(nftMint)
        let marketplaceAccount = await this.program.account.marketplace.fetch(this.marketplacePDA)
        let escrowPDA = await getEscrowPDA(this.marketplacePDA, marketplaceAccount.mint)
        let buyOfferPDA = await getBuyOfferPDA(this.marketplacePDA, buyer, nftMint, solPrice, tokenPrice);

        // let storePDA: PublicKey;
        // let store_nonce: number;

        let [storePDA, store_nonce] = await getStorePDA(this.marketplacePDA);

        let metadata = await getMetadata(
            this.program?.provider.connection,
            nftMint,
        )

        let collection = await this.getCollection()
        let creatorsAccounts = []

        if (!collection.ignoreCreatorFee) {
            for (let creator of metadata.data.creators) {
                let creatorAddress = new PublicKey(creator.address)
                let creatorATA = await _getAssociatedTokenAddress(creatorAddress, marketplaceAccount.mint)

                creatorsAccounts.push(
                    { pubkey: creatorAddress, isWritable: true, isSigner: false },
                )
                creatorsAccounts.push(
                    { pubkey: creatorATA, isWritable: true, isSigner: false },
                )
            }
        }

        let programNftVaultPDA = await getNftVaultPDA(nftMint);
        // let sellOrderPDA = await getSellOrderPDA(sellerNftAssociatedTokenAccount, solPrice, tokenPrice);


        // console.log(seller.toBase58(), "seller")
        // console.log(buyer.toBase58(), "buyer")
        // console.log(this.marketplacePDA.toBase58(), "marketplace")
        // console.log(this.collectionPDA.toBase58(), "collection")
        console.log(marketplaceAccount.authority.toBase58(), "marketplaceAuthority")
        // console.log(marketplaceAccount.feesDestination.toBase58(), "marketplaceDestAccount")
        // console.log(escrowPDA.toBase58(), "escrow")
        // console.log(sellerTokenAccount.toBase58(), "sellerFundsDestAccount")
        // console.log(sellerNftAssociatedTokenAccount.toBase58(), "sellerNftAccount")
        // console.log(metadataPDA.toBase58(), "metadata")
        // console.log(buyOfferPDA.toBase58(), "buyOffer")

        console.log(nftMint.toBase58(), "nftMint")
        console.log(programNftVaultPDA.toBase58(), "vault")
        console.log(buyerNftTokenAccount.toBase58(), "destination")
        console.log(storePDA.toBase58(), "store")
        console.log(store_nonce.toString(), "store_nonce")

        console.log(seller.toBase58(), "authority")
        console.log(marketplaceAccount.authority.toBase58(), "marketplaceAuthority")
        console.log(marketplaceAccount.feesDestination.toBase58(), "marketplaceDestAccount")
        // console.log(adminTokenAccount.toBase58(), "adminTokenAccount")
        // console.log(marketplaceAccount.feesDestination.toBase58(), "feesDestination")

        console.log(sellOrderPDA.toBase58(), "sellOrderPDA")
        // return "dddd";

        let ix = await this.program.methods.executeOffer(store_nonce).accounts({
            authority: seller,
            sellerNftTokenAccount: sellerNftAssociatedTokenAccount, //
            sellOrder: sellOrderPDA,
            buyer: buyer,
            marketplace: this.marketplacePDA,
            collection: this.collectionPDA,
            marketplaceAuthority: marketplaceAccount.authority,
            marketplaceDestAccount: marketplaceAccount.feesDestination,
            escrow: escrowPDA,
            store: storePDA,
            sellerFundsDestAccount: sellerTokenAccount, //
            destination: buyerNftTokenAccount, //
            metadata: metadataPDA, //
            vault: programNftVaultPDA,
            buyOffer: buyOfferPDA,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        }).remainingAccounts([...creatorsAccounts]).instruction();

        return this._sendInstruction(ix, [])
    }

    async removeNftOffer(
        nftMint: PublicKey,
        buyerTokenAccount: PublicKey,
        buyer: PublicKey,
        solPrice: anchor.BN,
        tokenPrice: anchor.BN,
    ) {
        // let metadataPDA = await Metadata.getPDA(nftMint)
        let marketplaceAccount = await this.program.account.marketplace.fetch(this.marketplacePDA)
        let escrowPDA = await getEscrowPDA(this.marketplacePDA, marketplaceAccount.mint)
        // let buyOfferPDA = await getBuyOfferPDA(this.marketplacePDA, buyer, nftMint, price);
        let buyOfferPDA = await getBuyOfferPDA(this.marketplacePDA, buyer, nftMint, solPrice, tokenPrice);

        let [storePDA, store_nonce] = await getStorePDA(this.marketplacePDA);

        let ix = await this.program.methods.removeBuyOffer(store_nonce).accounts({
            buyer: buyer,
            buyerPayingAccount: buyerTokenAccount,
            marketplace: this.marketplacePDA,
            escrow: escrowPDA,
            store: storePDA,
            buyOffer: buyOfferPDA,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        }).instruction();

        return this._sendInstruction(ix, [])
    }

    _sendInstruction(ix: TransactionInstruction, signers: Keypair[]): Promise<string> {
        let tx = new web3.Transaction()
        tx.add(ix)
        return this.program.provider.send(tx, signers)
    }

}