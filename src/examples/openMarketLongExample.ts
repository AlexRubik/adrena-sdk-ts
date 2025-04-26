import { openMarketLong, OpenMarketLongParams } from "../core/openMarketLong";
import { createKitClient } from "../clients/KitClient";
import { PrincipalToken, CollateralToken } from "../types";
import { BPS, PRINCIPAL_ADDRESSES } from "../helpers/constants";
import { checkTransactionConfirmed } from "../helpers/txnHelpers";
import { getPositionStatus } from "../core/positionStatus";
import { findPositionAddress, getCustodyByMint } from "../helpers/utils";
import { loadCustodies } from "../helpers/utils";
import { fetchPoolUtil } from "../helpers/utils";

export async function runOpenMarketLongExample() {
    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const positionObj = {
        principalToken: "JITOSOL" as PrincipalToken, // the token we are trading
        collateralToken: "USDC" as CollateralToken, // the token we are using as collateral
        collateralAmount: 10, // the amount of collateral to use
        leverage: 2, // the leverage multiplier to use (e.g., leverage = 3 means 3x leverage)
        stopLossPrice: 135.6, // the price at which to trigger a stop loss
        takeProfitPrice: 180.6, // the price at which to trigger a take profit
    };



    const params: OpenMarketLongParams = {
        wallet,
        rpc,
        principalToken: positionObj.principalToken,
        collateralToken: positionObj.collateralToken,
        collateralAmount: positionObj.collateralAmount,
        leverage: positionObj.leverage,
        stopLossPrice: positionObj.stopLossPrice, // optional
        takeProfitPrice: positionObj.takeProfitPrice, // optional
    }

    const txSignature = await openMarketLong(
        params
    );

    if (txSignature) {
        console.log(`\nAttempted to open a market long position with the following parameters:`, params);
        console.log(`Position stats:`, positionObj);
        console.log(`-> https://solscan.io/tx/${txSignature} <-`);
        const confirmed = await checkTransactionConfirmed(txSignature, rpc);
        if (confirmed) {
            console.log("Transaction confirmed!");

            console.log("Getting position status...");

            const pool = await fetchPoolUtil('main-pool', undefined, rpc);
            const custodies = await loadCustodies(pool.data, rpc);
            const principalCustody = getCustodyByMint(custodies, PRINCIPAL_ADDRESSES[positionObj.principalToken].address);
            if (!principalCustody) {
                throw new Error("Principal custody not found");
            }

            const positionAddress = (await findPositionAddress(
                pool.address,
                wallet.address,
                principalCustody.address,
                "long"
            ))[0];

            console.log("Position address:", positionAddress);

            const positionStatus = await getPositionStatus({
                wallet,
                rpc,
                principalToken: positionObj.principalToken,
                side: "long",
                positionAddress
            });

            console.log("Position status:", positionStatus);
        } else {
            console.log("Transaction not confirmed!");
        }
    } else {
        console.log(`Failed to open a market long position with the following parameters:`, params);
    }
}