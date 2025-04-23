import { Rpc, SolanaRpcApi, TransactionSigner } from "@solana/kit";
import { findCustodyAddress, findPositionAddress, getCortexPda, getPoolPda } from "../helpers/utils";
import { getCancelStopLossIx, getCancelTakeProfitIx } from "../instructions/getCancelSLTPIxs";
import { PrincipalToken } from "../types";
import { ADRENA_LOOKUP_TABLE_ADDRESS, DEV_PDA, PRINCIPAL_ADDRESSES } from "../helpers/constants";
import { sendTransactionWithJito } from "../helpers/jito";
import { hasUserProfile } from "../helpers/userProfile";
import { buildInitUserProfileIx } from "../helpers/userProfile";
import { getBasicProfileData } from "../helpers/userProfile";
import { buildEditUserProfileIx } from "../helpers/userProfile";


// cancel stop loss and/or take profit limit triggers
export async function cancelSLTP(
    wallet: TransactionSigner,
    rpc: Rpc<SolanaRpcApi>,
    principalToken: PrincipalToken,
    side: "long" | "short",
    cancelStopLoss: boolean,
    cancelTakeProfit: boolean,
) {

    if (!cancelStopLoss && !cancelTakeProfit) {
        throw new Error("One of the cancelStopLoss or cancelTakeProfit flags must be true");
    }

    const ixns = [];

    const principalTokenAddress = PRINCIPAL_ADDRESSES[principalToken].address;
    const cortex = (await getCortexPda())[0];
    const pool = (await getPoolPda())[0];
    const custody = (await findCustodyAddress(pool, principalTokenAddress))[0];
    const position = (await findPositionAddress(pool, custody, principalTokenAddress, side))[0];


    // check if wallet has an adrena profile
    // if not, we are going to create one with
    const hasProfile = await hasUserProfile(wallet.address, rpc);


    if (!hasProfile || !hasProfile.exists) {
        // wallet has no profile, get instruction to create one
        const initProfileIx = await buildInitUserProfileIx(wallet);
        ixns.push(initProfileIx);
    } else {
        const profileData = await getBasicProfileData(wallet.address, rpc);
        if (profileData.userProfile.data.referrerProfile !== DEV_PDA) {
            const editProfileIx = await buildEditUserProfileIx(wallet);
            ixns.push(editProfileIx);
        }
    }


    if (cancelStopLoss) {
        const cancelStopLossIx = await getCancelStopLossIx({
            owner: wallet,
            cortex,
            pool,
            custody,
            position,
        });
        ixns.push(cancelStopLossIx);
    }
    if (cancelTakeProfit) {
        const cancelTakeProfitIx = await getCancelTakeProfitIx({
            owner: wallet,
            cortex,
            pool,
            custody,
            position,
        });
        ixns.push(cancelTakeProfitIx);
    }

    if (ixns.length > 0) {
        const sendJitoResult = await sendTransactionWithJito(
            ixns,
            wallet,
            rpc,
            false,
            true,
            [ADRENA_LOOKUP_TABLE_ADDRESS]
        );
        return sendJitoResult;
    } else {
        throw new Error("Bug somewhere, no ixns to send");
    }
}