import BN from "bn.js";

export type PrincipalToken = 'JITOSOL' | 'WBTC' | 'BONK';
export type CollateralToken = 'USDC' | 'JITOSOL' | 'BONK' | 'WBTC';

export type ChaosLabsPricesResponse = {
    latest_date: Date;
    latest_timestamp: number;
    prices: {
      symbol: string;
      feed_id: number;
      price: number;
      timestamp: number;
      exponent: number;
    }[];
    signature: string;
    recovery_id: number;
  };
  
  export type ChaosLabsPricesExtended = {
    latestDate: Date;
    latestTimestamp: number;
    prices: {
      symbol: string;
      feedId: number;
      price: BN;
      timestamp: BN;
      exponent: number;
    }[];
    signature: string;
    signatureByteArray: number[];
    recoveryId: number;
  };
