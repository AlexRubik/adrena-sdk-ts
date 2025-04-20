import { Address, address } from "@solana/kit";

export const USDC_TOKEN_MINT = address("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
export const JITOSOL_TOKEN_MINT = address("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn");
export const NATIVE_MINT = address("So11111111111111111111111111111111111111112");
export const DEFAULT_MINT = address("11111111111111111111111111111111");

export const ASSOCIATED_TOKEN_PROGRAM_ID = address('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
export const TOKEN_PROGRAM_ID = address('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
export const SYSTEM_PROGRAM_ID = address('11111111111111111111111111111111');
export const ADRENA_PROGRAM_ID = address('13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet');
export const ADRENA_LOOKUP_TABLE_ADDRESS = address('4PZaPEXPzMLuBSKgZUvpzLi3zGXJ1pSz6NTKrtoXUd4q');

export const RATE_DECIMALS = 9;
export const PRICE_DECIMALS = 10;
export const USD_DECIMALS = 6;
export const LP_DECIMALS = 6;
export const SOL_DECIMALS = 9;
export const BPS = 10_000;

export const TOKEN_ADDRESSES: Record<string, {
    address: Address,
    decimals: number,
}> = {
    'USDC': {
        address: address('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        decimals: 6,
    },
    'SOL': {
        address: address('So11111111111111111111111111111111111111112'),
        decimals: 9,
    },
    'BONK': {
        address: address('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
        decimals: 5,
    },
    'JITOSOL': {
        address: address('J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn'),
        decimals: 9,
    },
    'WBTC': {
        address: address('3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh'),
        decimals: 8,
    },
  };

  export const PRINCIPAL_ADDRESSES: Record<string, {
    address: Address,
    decimals: number,
}> = {

    'BONK': {
        address: address('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
        decimals: 5,
    },
    'JITOSOL': {
        address: address('J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn'),
        decimals: 9,
    },
    'WBTC': {
        address: address('3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh'),
        decimals: 8,
    },
  };


export const tokensInfo: {
    [tokenPubkey: string]: {
      name: string;
      color: string;
      symbol: string;
      coingeckoId: string;
      decimals: number;
      pythPriceUpdateV2: Address;
      displayAmountDecimalsPrecision: number;
      displayPriceDecimalsPrecision: number;
    };
  } = {
    EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
      name: "USD Coin",
      color: "#2775ca",
      symbol: "USDC",
      coingeckoId: "usd-coin",
      decimals: 6,
      displayAmountDecimalsPrecision: 2,
      displayPriceDecimalsPrecision: 4,
      pythPriceUpdateV2: address(
        "Dpw1EAVrSB1ibxiDQyTAW6Zip3J4Btk2x4SgApQCeFbX",
      ),
    },
    DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: {
      name: "BONK",
      color: "#dfaf92",
      symbol: "BONK",
      coingeckoId: "bonk",
      decimals: 5,
      displayAmountDecimalsPrecision: 0,
      displayPriceDecimalsPrecision: 8,
      pythPriceUpdateV2: address(
        "DBE3N8uNjhKPRHfANdwGvCZghWXyLPdqdSbEW2XFwBiX",
      ),
    },
    "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh": {
      name: "Wrapped Bitcoin",
      color: "#f7931a",
      symbol: "WBTC",
      coingeckoId: "wrapped-btc-wormhole",
      decimals: 8,
      displayAmountDecimalsPrecision: 6,
      displayPriceDecimalsPrecision: 2,
      pythPriceUpdateV2: address(
        "9gNX5vguzarZZPjTnE1hWze3s6UsZ7dsU3UnAmKPnMHG",
      ),
    },
    [DEFAULT_MINT]: {
      // There is no token for BTC
      name: "Bitcoin",
      color: "#f7931a",
      symbol: "BTC",
      coingeckoId: "bitcoin",
      decimals: 8,
      displayAmountDecimalsPrecision: 6,
      displayPriceDecimalsPrecision: 2,
      pythPriceUpdateV2: address(
        "4cSM2e6rvbGQUFiJbqytoVMi5GgghSMr8LwVrT9VPSPo",
      ),
    },
    J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn: {
      name: "Jito Staked SOL",
      color: "#84CC90",
      symbol: "JITOSOL",
      coingeckoId: "solana",
      decimals: 9,
      displayAmountDecimalsPrecision: 4,
      displayPriceDecimalsPrecision: 2,
      pythPriceUpdateV2: address(
        "AxaxyeDT8JnWERSaTKvFXvPKkEdxnamKSqpWbsSjYg1g",
      ),
    },
    [NATIVE_MINT]: {
      name: "SOL",
      color: "#84CC90",
      symbol: "SOL",
      coingeckoId: "solana",
      decimals: 9,
      displayAmountDecimalsPrecision: 4,
      displayPriceDecimalsPrecision: 2,
      pythPriceUpdateV2: address(
        "7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE",
      ),
    },
  };
