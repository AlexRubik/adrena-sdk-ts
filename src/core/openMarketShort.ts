import { IInstruction, Rpc, SolanaRpcApi, TransactionSigner } from "@solana/kit";
import { getOpenShortIxs } from "../instructions/getOpenShortIxs";
import { sendTransactionWithJito } from "../helpers/jito";
import { buildEditUserProfileIx, buildInitUserProfileIx, getBasicProfileData, hasUserProfile } from "../helpers/userProfile";
import { ADRENA_LOOKUP_TABLE_ADDRESS, DEV_PDA } from "../helpers/constants";
import { CollateralToken, PrincipalToken } from "../types";
import { getSetStopLossShortIx } from "../instructions/getStopLossShortIx";
import { getTakeProfitShortIx } from "../instructions/getTakeProfitShortIx";

export interface OpenMarketShortParams {
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
 * Opens a market short position with the specified parameters
 * 
 * @param params - The parameters for opening a market short position
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
export async function openMarketShort(
    params: OpenMarketShortParams
) {
    // array that we will push instructions to
    const ixns: IInstruction[] = [];

    // check if wallet has an adrena profile
    // if not, we are going to create one with
    const hasProfile = await hasUserProfile(params.wallet.address, params.rpc);

    if (!hasProfile || !hasProfile.exists) {
        // wallet has no profile, get instruction to create one
        const initProfileIx = await buildInitUserProfileIx(params.wallet);
        ixns.push(initProfileIx);
    } else if (hasProfile.pda) {
        const profileData = await getBasicProfileData(hasProfile.pda, params.rpc);
        if (profileData.userProfile.data.referrerProfile !== DEV_PDA) {
            const editProfileIx = await buildEditUserProfileIx(params.wallet);
            ixns.push(editProfileIx);
        }
    }

    // get instructions to open a short position
    const openShortIxns = await getOpenShortIxs(
        params.wallet, 
        params.principalToken, 
        params.collateralToken, 
        params.collateralAmount, 
        params.leverage, 
        params.rpc
    );
    ixns.push(...openShortIxns.ixns);

    // Add stop loss if provided
    if (params.stopLossPrice !== undefined) {
        const setStopLossShortIx = await getSetStopLossShortIx({
            owner: params.wallet,
            cortex: openShortIxns.cortex,
            pool: openShortIxns.pool,
            position: openShortIxns.positionAddress,
            custody: openShortIxns.principalCustodyObj.address,
            stopLossLimitPrice: params.stopLossPrice,
            closePositionPrice: null
        });
        ixns.push(setStopLossShortIx);
    }

    // Add take profit if provided
    if (params.takeProfitPrice !== undefined) {
        const takeProfitShortIx = await getTakeProfitShortIx({
            owner: params.wallet,
            cortex: openShortIxns.cortex,
            pool: openShortIxns.pool,
            position: openShortIxns.positionAddress,
            custody: openShortIxns.principalCustodyObj.address,
            takeProfitLimitPrice: params.takeProfitPrice,
        });
        ixns.push(takeProfitShortIx);
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
        positionAddress: openShortIxns.positionAddress
    };
}
