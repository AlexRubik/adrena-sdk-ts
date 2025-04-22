import { TransactionSigner } from "@solana/kit";
import { SolanaRpcApi } from "@solana/kit";
import { Rpc } from "@solana/kit";
import { CollateralToken, PrincipalToken } from "../types";
import { getAddLimitOrderIxs } from "../instructions/getLimitOrderIxs";
import { sendTransactionWithJito } from "../helpers/jito";
import { ADRENA_LOOKUP_TABLE_ADDRESS } from "../helpers/constants";

/**
 * Parameters for creating a limit order
 */
export interface AddLimitOrderParams {
  /** The wallet that will own the position */
  wallet: TransactionSigner;
  
  /** The RPC client for Solana interactions */
  rpc: Rpc<SolanaRpcApi>;
  
  /** The token being traded (e.g., 'JITOSOL') */
  principalToken: PrincipalToken;
  
  /** The token used as collateral (e.g., 'USDC') */
  collateralToken: CollateralToken;
  
  /** The amount of collateral to use (e.g., 10 for 10 USDC if your collateral token is USDC) */
  collateralAmount: number;
  
  /** The leverage multiplier */
  leverage: number;
  
  /** Whether this is a long or short position */
  side: "long" | "short";
  
  /** The price at which the order will trigger */
  triggerPrice: number;
  
  /** Optional limit price for the order (null for market orders after trigger) */
  limitPrice: number | null;
}

export async function addLimitOrder(params: AddLimitOrderParams) {
  const ixs = await getAddLimitOrderIxs(params);

  const result = await sendTransactionWithJito(
    ixs,
    params.wallet,
    params.rpc,
    false,
    false,
    [ADRENA_LOOKUP_TABLE_ADDRESS]
  )

  if (result) {
    console.log(`\nAttempted to add a limit order with the following parameters:`, params);
    console.log(`-> https://solscan.io/tx/${result} <-`);
  } else {
    console.log(`Failed to add a limit order with the following parameters:`, params);
  }

  return result;
}