import { IInstruction, Rpc, SolanaRpcApi, TransactionSigner } from "@solana/kit";
import { getOpenLongIxs } from "../instructions/getOpenLongIxs";
import { sendTransactionWithJito } from "../helpers/jito";
import { buildEditUserProfileIx, buildInitUserProfileIx, getBasicProfileData, hasUserProfile } from "../helpers/userProfile";
import { ADRENA_LOOKUP_TABLE_ADDRESS, DEV_PDA } from "../helpers/constants";
import { CollateralToken, PrincipalToken } from "../types";
import { getSetStopLossLongIx } from "../instructions/getStopLossLongIx";
import { getTakeProfitLongIx } from "../instructions/getTakeProfitLongIx";

export interface OpenMarketLongParams {
    wallet: TransactionSigner;
    rpc: Rpc<SolanaRpcApi>;
    principalToken: PrincipalToken;
    collateralToken: CollateralToken;
    collateralAmount: number;
    leverage: number;
    stopLossPrice?: number;
    takeProfitPrice?: number;
}

/**
 * Opens a market long position with the specified parameters
 * 
 * @param params - The parameters for opening a market long position
 * @param params.wallet - The wallet to use for the transaction
 * @param params.rpc - The RPC client to use for the transaction
 * @param params.principalToken - The token to trade (e.g., 'JITOSOL')
 * @param params.collateralToken - The token to use as collateral (e.g., 'USDC')
 * @param params.collateralAmount - The amount of collateral to use (e.g., 10, which is 10 USDC)
 * @param params.leverage - The leverage multiplier to apply (e.g., 5)
 * @param params.stopLossPrice - Optional stop loss trigger price
 * @param params.takeProfitPrice - Optional take profit limit price
 * @returns Promise resolving to the transaction signature and position address
 */
export async function openMarketLong(
    params: OpenMarketLongParams
) {
    // array that we will push instructions to
    const ixns: IInstruction[] = [];

    // check if wallet has an adrena profile
    // if not, we are going to create one with
    const hasProfile = await hasUserProfile(params.wallet.address, params.rpc);


    if (!hasProfile || !hasProfile.exists) {
        // wallet has no profile, get instruction to create one
        console.log("Adding ix for creating user profile");
        const initProfileIx = await buildInitUserProfileIx(params.wallet);
        ixns.push(initProfileIx);
    } else if (hasProfile.pda) {
        console.log("Adding ix for editing user profile");
        const profileData = await getBasicProfileData(hasProfile.pda, params.rpc);
        if (profileData.userProfile.data.referrerProfile !== DEV_PDA) {
            const editProfileIx = await buildEditUserProfileIx(params.wallet);
            ixns.push(editProfileIx);
        }
    }

    // get instructions to open a long position
    const openLongIxns = await getOpenLongIxs(
        params.wallet, 
        params.principalToken, 
        params.collateralToken, 
        params.collateralAmount, 
        params.leverage, 
        params.rpc
    );
    ixns.push(...openLongIxns.ixns);

    // Add stop loss if provided
    if (params.stopLossPrice !== undefined) {
        const setStopLossLongIx = await getSetStopLossLongIx({
            owner: params.wallet,
            cortex: openLongIxns.cortex,
            pool: openLongIxns.pool,
            position: openLongIxns.positionAddress,
            custody: openLongIxns.principalCustodyObj.address,
            stopLossLimitPrice: params.stopLossPrice,
            closePositionPrice: null
        });
        ixns.push(setStopLossLongIx);
    }

    // Add take profit if provided
    if (params.takeProfitPrice !== undefined) {
        const takeProfitLongIx = await getTakeProfitLongIx({
            owner: params.wallet,
            cortex: openLongIxns.cortex,
            pool: openLongIxns.pool,
            position: openLongIxns.positionAddress,
            custody: openLongIxns.principalCustodyObj.address,
            takeProfitLimitPrice: params.takeProfitPrice,
        });
        ixns.push(takeProfitLongIx);
    }

    // send transaction with jito
    const sendJitoResult = await sendTransactionWithJito(
        ixns,
        params.wallet,
        params.rpc,
        false,
        true,
        [ADRENA_LOOKUP_TABLE_ADDRESS]
    );

    return {
        txSignature: sendJitoResult,
        positionAddress: openLongIxns.positionAddress
    };
}

