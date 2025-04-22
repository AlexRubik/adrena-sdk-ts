import { openMarketLong, OpenMarketLongParams } from "../core/openMarketLong";
import { createClient as createKitClient } from "../clients/KitClient";
import { PrincipalToken, CollateralToken } from "../types";
import { BPS } from "../helpers/constants";

export async function runOpenMarketLongExample() {
    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const positionObj = {
        principalToken: "JITOSOL" as PrincipalToken, // the token we are trading
        collateralToken: "USDC" as CollateralToken, // the token we are using as collateral
        collateralAmount: 10, // the amount of collateral to use
        leverage: 3, // the leverage multiplier to use (e.g., leverage = 3 means 3x leverage)
        sizeUsd: 0, // will be calculated below
        feeBps: 14, // the fee to pay in basis points
        estimatedFeeUsd: 0, // will be calculated below
        estimatedUsdPnlAtOpen: 0, // will be calculated below
        stopLossPrice: 135.6, // the price at which to trigger a stop loss
        takeProfitPrice: 140.6, // the price at which to trigger a take profit
    };

    // Calculate derived values
    positionObj.sizeUsd = positionObj.collateralAmount * positionObj.leverage;
    positionObj.estimatedFeeUsd = positionObj.sizeUsd * positionObj.feeBps / BPS;
    positionObj.estimatedUsdPnlAtOpen = -positionObj.estimatedFeeUsd; // simplified calculation

    const params: OpenMarketLongParams = {
        principalToken: positionObj.principalToken,
        collateralToken: positionObj.collateralToken,
        collateralAmount: positionObj.collateralAmount,
        leverage: positionObj.leverage,
        stopLossPrice: positionObj.stopLossPrice, // optional
        takeProfitPrice: positionObj.takeProfitPrice, // optional
    }

    const txSignature = await openMarketLong(
        wallet, 
        rpc, 
        params
    );

    if (txSignature) {
        console.log(`\nAttempted to open a market long position with the following parameters:`, params);
        console.log(`Position stats:`, positionObj);
        console.log(`-> https://solscan.io/tx/${txSignature} <-`);
    } else {
        console.log(`Failed to open a market long position with the following parameters:`, params);
    }
}