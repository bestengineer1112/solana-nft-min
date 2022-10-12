// import axios from 'axios'

import { Wallet, Provider, Program } from '@project-serum/anchor';
import * as splToken from '@solana/spl-token';
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, Keypair } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, } from "@nfteyez/sol-rayz";

import { adminWallet } from '../helpers/keypair'
import { mintPubkey } from './config'

// import { Marketplace } from './js/marketplace';
// import { TestMarketClass } from './js/marketplace_';
import { getCollectionPDA, getMarketplacePDA, getEscrowPDA } from './js/getPDAs'

import idl from './js/types/marketplace.json'
import { MARKETPLACE_PROGRAM_ID } from './js/constant'

const { Wallet, Provider, Program } = require('@project-serum/anchor');
const splToken = require('@solana/spl-token');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

const { Connection, clusterApiUrl, LAMPORTS_PER_SOL, Keypair } = require('@solana/web3.js');
const { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig } = require('@nfteyez/sol-rayz');

const { adminWallet } = require('@solana/spl-token');

const createMarketplace = async () => {
    const connection = await createConnection();

    const admin = Keypair.fromSecretKey(new Uint8Array(adminWallet));
    const anchorWallet = new Wallet(admin);

    provider = new Provider(connection, anchorWallet, {
        preflightCommitment: 'recent',
    });

    console.log(anchorWallet, "anchorWallet")

    const marketplaceMint = new splToken.Token(
        provider.connection,
        mintPubkey,
        splToken.TOKEN_PROGRAM_ID,
        admin
    );

    console.log(marketplaceMint, "marketplaceMint")

    let adminTokenAccount = await Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, marketplaceMint.publicKey, admin.publicKey);
    const adminAccountInfo = await provider.connection.getAccountInfo(adminTokenAccount)
    if (adminAccountInfo === null) {
        await marketplaceMint.createAssociatedTokenAccount(
            admin.publicKey,
        );
    } else {
        console.log("already created.")
    }

    console.log(adminTokenAccount.toBase58(), "adminTokenAccount");

    // let marketplace = new Marketplace(provider);
    // console.log(marketplace, "marketplace")
    // await marketplace.createMarketplace(admin, marketplaceMint.publicKey, 5, adminTokenAccount)


    // let aa = new TestMarketClass("jj");
    // console.log(aa, "aa")

    // await initMarketplace(admin, marketplaceMint.publicKey, 5, adminTokenAccount);
}

createMarketplace();
