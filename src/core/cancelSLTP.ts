import { Rpc, SolanaRpcApi, TransactionSigner } from "@solana/kit";
import { findCustodyAddress, findPositionAddress, getCortexPda, getPoolPda } from "../helpers/utils";
import { getCancelStopLossIx, getCancelTakeProfitIx } from "../instructions/getCancelSLTPIxs";
import { PrincipalToken } from "../types";
import { ADRENA_LOOKUP_TABLE_ADDRESS, PRINCIPAL_ADDRESSES } from "../helpers/constants";
import { sendTransactionWithJito } from "../helpers/jito";


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