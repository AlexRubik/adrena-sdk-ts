// // ts-nocheck
// // ts-ignore
// import { openMarketShort, OpenMarketShortParams } from "adrena-sdk-ts/core";
// import { createKitClient } from "adrena-sdk-ts/clients";
// import { PrincipalToken, CollateralToken } from "adrena-sdk-ts";
// import { getPositionStatus } from "adrena-sdk-ts/core";
// import { 
//     getCustodyByMint, 
//     loadCustodies, 
//     fetchPoolUtil,
//     checkTransactionConfirmed,
//     PRINCIPAL_ADDRESSES
// } from "adrena-sdk-ts/helpers";

// export async function runOpenMarketShortExample() {
//     const kitClient = await createKitClient();
//     const wallet = kitClient.wallet;
//     const rpc = kitClient.rpc;

//     const positionObj = {
//         principalToken: "JITOSOL" as PrincipalToken, // the token we are trading
//         collateralToken: "USDC" as CollateralToken, // the token we are using as collateral
//         collateralAmount: 10, // the amount of collateral to use
//         leverage: 2, // the leverage multiplier to use (e.g., leverage = 3 means 3x leverage)
//         stopLossPrice: 180.6, // the price at which to trigger a stop loss (higher for shorts)
//         takeProfitPrice: 135.6, // the price at which to trigger a take profit (lower for shorts)
//     };

//     const params: OpenMarketShortParams = {
//         wallet,
//         rpc,
//         principalToken: positionObj.principalToken,
//         collateralToken: positionObj.collateralToken,
//         collateralAmount: positionObj.collateralAmount,
//         leverage: positionObj.leverage,
//         stopLossPrice: positionObj.stopLossPrice, // optional / nullable
//         takeProfitPrice: positionObj.takeProfitPrice, // optional / nullable
//     }

//     const openMarketShortResult = await openMarketShort(params);

//     if (openMarketShortResult && openMarketShortResult.txSignature) {
//         console.log(`\nAttempted to open a market short position with the following parameters:`, params);
//         console.log(`Position stats:`, positionObj);
//         console.log(`-> https://solscan.io/tx/${openMarketShortResult.txSignature} <-`);
//         const confirmed = await checkTransactionConfirmed(openMarketShortResult.txSignature, rpc);
//         if (confirmed) {

//             // if tx is confirmed, get initial position status
//             console.log("Transaction confirmed!");

//             console.log("Getting position status...");

//             const pool = await fetchPoolUtil('main-pool', undefined, rpc);
//             const custodies = await loadCustodies(pool.data, rpc);
//             const principalCustody = getCustodyByMint(custodies, PRINCIPAL_ADDRESSES[positionObj.principalToken].address);
//             if (!principalCustody) {
//                 throw new Error("Principal custody not found");
//             }

//             console.log("Position address:", openMarketShortResult.positionAddress);

//             const positionStatus = await getPositionStatus({
//                 wallet,
//                 rpc,
//                 principalToken: positionObj.principalToken,
//                 positionAddress: openMarketShortResult.positionAddress
//             });

//             console.log("Position status:", positionStatus);
//         } else {
//             console.log("Transaction not confirmed!");
//         }
//     } else {
//         console.log(`Failed to open a market short position with the following parameters:`, params);
//     }
// }
