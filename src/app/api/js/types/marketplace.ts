export type Marketplace = {
  "version": "0.1.0",
  "name": "marketplace",
  "instructions": [
    {
      "name": "createMarketplace",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mint",
          "type": "publicKey"
        },
        {
          "name": "fees",
          "type": "u16"
        },
        {
          "name": "feesDestination",
          "type": "publicKey"
        },
        {
          "name": "authority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateMarketplace",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionalFees",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "optionalFeesDestination",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "optionalAuthority",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateMarketplaceMint",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mint",
          "type": "publicKey"
        },
        {
          "name": "feesDestination",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createCollection",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "symbol",
          "type": "publicKey"
        },
        {
          "name": "requiredVerifier",
          "type": "publicKey"
        },
        {
          "name": "fee",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "ignoreFee",
          "type": "bool"
        }
      ]
    },
    {
      "name": "updateCollection",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionalFee",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "optionalSymbol",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "optionalRequiredVerifier",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "optionalIgnoreCreatorFee",
          "type": {
            "option": "bool"
          }
        }
      ]
    },
    {
      "name": "createSellOrder",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellOrder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solPrice",
          "type": "u64"
        },
        {
          "name": "tokenPrice",
          "type": "u64"
        },
        {
          "name": "quantity",
          "type": "u64"
        },
        {
          "name": "destination",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeSellOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellOrder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantityToUnlist",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addQuantityToSellOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellOrder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantityToAdd",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "buyer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPayingTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketplaceDestAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplaceAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "askQuantity",
          "type": "u64"
        },
        {
          "name": "payType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createBuyOffer",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPayingAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solPriceProposition",
          "type": "u64"
        },
        {
          "name": "tokenPriceProposition",
          "type": "u64"
        },
        {
          "name": "storeNonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "removeBuyOffer",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyerPayingAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "storeNonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "executeOffer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellOrder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplaceAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplaceDestAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerFundsDestAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "storeNonce",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "marketplace",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fees",
            "type": "u16"
          },
          {
            "name": "feesDestination",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "sellOrder",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplace",
            "type": "publicKey"
          },
          {
            "name": "solPrice",
            "type": "u64"
          },
          {
            "name": "tokenPrice",
            "type": "u64"
          },
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "destination",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "collection",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceKey",
            "type": "publicKey"
          },
          {
            "name": "symbol",
            "type": "publicKey"
          },
          {
            "name": "requiredVerifier",
            "type": "publicKey"
          },
          {
            "name": "fees",
            "type": {
              "option": "u16"
            }
          },
          {
            "name": "ignoreCreatorFee",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "buyOffer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplace",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "proposedSolPrice",
            "type": "u64"
          },
          {
            "name": "proposedTokenPrice",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "destination",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ErrorCode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ErrFeeShouldLowerOrEqualThan10000"
          },
          {
            "name": "ErrTryingToUnlistMoreThanOwned"
          },
          {
            "name": "ErrCouldNotBuyEnoughItem"
          },
          {
            "name": "ErrMetaDataMintDoesNotMatchItemMint"
          },
          {
            "name": "ErrNftNotPartOfCollection"
          },
          {
            "name": "DerivedKeyInvalid"
          },
          {
            "name": "NotInitialized"
          }
        ]
      }
    }
  ]
};

export const IDL: Marketplace = {
  "version": "0.1.0",
  "name": "marketplace",
  "instructions": [
    {
      "name": "createMarketplace",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mint",
          "type": "publicKey"
        },
        {
          "name": "fees",
          "type": "u16"
        },
        {
          "name": "feesDestination",
          "type": "publicKey"
        },
        {
          "name": "authority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateMarketplace",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionalFees",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "optionalFeesDestination",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "optionalAuthority",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateMarketplaceMint",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mint",
          "type": "publicKey"
        },
        {
          "name": "feesDestination",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createCollection",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "symbol",
          "type": "publicKey"
        },
        {
          "name": "requiredVerifier",
          "type": "publicKey"
        },
        {
          "name": "fee",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "ignoreFee",
          "type": "bool"
        }
      ]
    },
    {
      "name": "updateCollection",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionalFee",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "optionalSymbol",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "optionalRequiredVerifier",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "optionalIgnoreCreatorFee",
          "type": {
            "option": "bool"
          }
        }
      ]
    },
    {
      "name": "createSellOrder",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellOrder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solPrice",
          "type": "u64"
        },
        {
          "name": "tokenPrice",
          "type": "u64"
        },
        {
          "name": "quantity",
          "type": "u64"
        },
        {
          "name": "destination",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeSellOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellOrder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantityToUnlist",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addQuantityToSellOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellOrder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantityToAdd",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "buyer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPayingTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketplaceDestAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplaceAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "askQuantity",
          "type": "u64"
        },
        {
          "name": "payType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createBuyOffer",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPayingAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solPriceProposition",
          "type": "u64"
        },
        {
          "name": "tokenPriceProposition",
          "type": "u64"
        },
        {
          "name": "storeNonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "removeBuyOffer",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyerPayingAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "storeNonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "executeOffer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sellerNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellOrder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplace",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplaceAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketplaceDestAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "store",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerFundsDestAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "storeNonce",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "marketplace",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fees",
            "type": "u16"
          },
          {
            "name": "feesDestination",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "sellOrder",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplace",
            "type": "publicKey"
          },
          {
            "name": "solPrice",
            "type": "u64"
          },
          {
            "name": "tokenPrice",
            "type": "u64"
          },
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "destination",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "collection",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceKey",
            "type": "publicKey"
          },
          {
            "name": "symbol",
            "type": "publicKey"
          },
          {
            "name": "requiredVerifier",
            "type": "publicKey"
          },
          {
            "name": "fees",
            "type": {
              "option": "u16"
            }
          },
          {
            "name": "ignoreCreatorFee",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "buyOffer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplace",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "proposedSolPrice",
            "type": "u64"
          },
          {
            "name": "proposedTokenPrice",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "destination",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ErrorCode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ErrFeeShouldLowerOrEqualThan10000"
          },
          {
            "name": "ErrTryingToUnlistMoreThanOwned"
          },
          {
            "name": "ErrCouldNotBuyEnoughItem"
          },
          {
            "name": "ErrMetaDataMintDoesNotMatchItemMint"
          },
          {
            "name": "ErrNftNotPartOfCollection"
          },
          {
            "name": "DerivedKeyInvalid"
          },
          {
            "name": "NotInitialized"
          }
        ]
      }
    }
  ]
};
