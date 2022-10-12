import * as anchor from '@project-serum/anchor'
import { MARKETPLACE_PROGRAM_ID } from './constant'
import { PublicKey } from '@solana/web3.js'
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress
} from '@solana/spl-token'

export const getMarketplacePDA = async (owner: PublicKey): Promise<PublicKey> => {
    return (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from('MARKETPLACE'),
            owner.toBuffer()
        ],
        MARKETPLACE_PROGRAM_ID,
    ))[0]
}

export const getEscrowPDA = async (marketplacePDA: PublicKey, marketplaceMint: PublicKey): Promise<PublicKey> => {
    return (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from('MARKETPLACE'),
            marketplacePDA.toBuffer(),
            marketplaceMint.toBuffer(),
            Buffer.from('ESCROW'),
        ],
        MARKETPLACE_PROGRAM_ID,
    ))[0]
}

export const getCollectionPDA = async (marketplacePDA: PublicKey, symbol: PublicKey): Promise<PublicKey> => {
    return (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from('MARKETPLACE'),
            symbol.toBuffer(),
            marketplacePDA.toBuffer(),
        ],
        MARKETPLACE_PROGRAM_ID,
    ))[0]
}

export const getNftVaultPDA = async (nftMint: PublicKey): Promise<PublicKey> => {
    return (await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from('MARKETPLACE'), Buffer.from('vault'), nftMint.toBuffer()],
        MARKETPLACE_PROGRAM_ID,
    ))[0]
}

export const getSellOrderPDA = async (sellerTokenAccount: PublicKey, solPrice: anchor.BN, tokenPrice: anchor.BN): Promise<PublicKey> => {
    return (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from('MARKETPLACE'),
            sellerTokenAccount.toBuffer(),
            Buffer.from(solPrice.toString()),
            Buffer.from(tokenPrice.toString())
        ],
        MARKETPLACE_PROGRAM_ID,
    ))[0]
}

export const _getAssociatedTokenAddress = async (addr: PublicKey, mint: PublicKey): Promise<PublicKey> => {
    return await getAssociatedTokenAddress(
        mint,
        addr,
    )
}

export const getBuyOfferPDA = async (marketplacePDA: PublicKey, buyer: PublicKey, nftMint: PublicKey, solPrice: anchor.BN, tokenPrice: anchor.BN): Promise<PublicKey> => {
    return (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from("MARKETPLACE"),
            marketplacePDA.toBuffer(),
            buyer.toBuffer(),
            nftMint.toBuffer(),
            Buffer.from(solPrice.toString()),
            Buffer.from(tokenPrice.toString()),
            Buffer.from("ESCROW"),
        ],
        MARKETPLACE_PROGRAM_ID,
    ))[0];
}

export const getStorePDA = async (marketplacePDA: PublicKey): Promise<[PublicKey, number]> => {
   
    return (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from("MARKETPLACE"),
            marketplacePDA.toBuffer(),
            Buffer.from("store"),
        ],
        MARKETPLACE_PROGRAM_ID,
    ));
}