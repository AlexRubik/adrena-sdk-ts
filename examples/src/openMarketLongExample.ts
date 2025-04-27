import { 
    PrincipalToken,
    CollateralToken,
} from "adrena-sdk-ts";
import { createKitClient } from "adrena-sdk-ts/clients";
import { checkTransactionConfirmed, PRINCIPAL_ADDRESSES } from "adrena-sdk-ts/helpers";
import { getPositionStatus, openMarketLong, OpenMarketLongParams } from "adrena-sdk-ts/core";
import { 
    fetchPoolUtil,
    loadCustodies,
    getCustodyByMint
} from "adrena-sdk-ts/helpers";

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
        stopLossPrice: positionObj.stopLossPrice, // optional / nullable
        takeProfitPrice: positionObj.takeProfitPrice, // optional / nullable
    }

    const openMarketLongResult = await openMarketLong(params);

    if (openMarketLongResult && openMarketLongResult.txSignature) {
        console.log(`\nAttempted to open a market long position with the following parameters:`, params);
        console.log(`Position stats:`, positionObj);
        console.log(`-> https://solscan.io/tx/${openMarketLongResult.txSignature} <-`);
        const confirmed = await checkTransactionConfirmed(openMarketLongResult.txSignature, rpc);
        if (confirmed) {

            // if tx is confirmed, get initial position status
            console.log("Transaction confirmed!");

            console.log("Getting position status...");

            const pool = await fetchPoolUtil('main-pool', undefined, rpc);
            const custodies = await loadCustodies(pool.data, rpc);
            const principalCustody = getCustodyByMint(custodies, PRINCIPAL_ADDRESSES[positionObj.principalToken].address);
            if (!principalCustody) {
                throw new Error("Principal custody not found");
            }

            console.log("Position address:", openMarketLongResult.positionAddress);

            const positionStatus = await getPositionStatus({
                wallet,
                rpc,
                principalToken: positionObj.principalToken,
                positionAddress: openMarketLongResult.positionAddress
            });

            console.log("Position status:", positionStatus);
        } else {
            console.log("Transaction not confirmed!");
        }
    } else {
        console.log(`Failed to open a market long position with the following parameters:`, params);
    }
}