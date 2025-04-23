import { TransactionSigner } from "@solana/kit";
import { SolanaRpcApi } from "@solana/kit";
import { Rpc } from "@solana/kit";
import { CollateralToken, PrincipalToken } from "../types";
import { getAddLimitOrderIxs } from "../instructions/getLimitOrderIxs";
import { sendTransactionWithJito } from "../helpers/jito";
import { ADRENA_LOOKUP_TABLE_ADDRESS, DEV_PDA } from "../helpers/constants";
import { hasUserProfile } from "../helpers/userProfile";
import { buildInitUserProfileIx } from "../helpers/userProfile";
import { getBasicProfileData } from "../helpers/userProfile";
import { buildEditUserProfileIx } from "../helpers/userProfile";

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

      // check if wallet has an adrena profile
    // if not, we are going to create one with
    const hasProfile = await hasUserProfile(params.wallet.address, params.rpc);


    if (!hasProfile || !hasProfile.exists) {
        // wallet has no profile, get instruction to create one
        const initProfileIx = await buildInitUserProfileIx(params.wallet);
        // prepend the init profile ix to the ixs array
        ixs.unshift(initProfileIx);
    } else if (hasProfile.pda) {
        const profileData = await getBasicProfileData(hasProfile.pda, params.rpc);
        if (profileData.userProfile.data.referrerProfile !== DEV_PDA) {
            const editProfileIx = await buildEditUserProfileIx(params.wallet);
            // prepend the edit profile ix to the ixs array
            ixs.unshift(editProfileIx);
        }
    }

  const result = await sendTransactionWithJito(
    ixs,
    params.wallet,
    params.rpc,
    false,
    true,
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