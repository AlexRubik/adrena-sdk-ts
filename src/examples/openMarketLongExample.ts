import { openMarketLong, OpenMarketLongParams } from "../core/openMarketLong";
import { createClient as createKitClient } from "../clients/KitClient";


export async function runOpenMarketLongExample() {
    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const principalToken = "JITOSOL"; // the token we are trading
    const collateralToken = "USDC"; // the token we are using as collateral
    const collateralAmount = 10; // the amount of collateral to use
    const leverage = 3; // the leverage multiplier to use (e.g., leverage = 3 means 3x leverage)

    const stopLossPrice = 135.6; // the price at which to trigger a stop loss
    const takeProfitPrice = 140.6; // the price at which to trigger a take profit

    const params: OpenMarketLongParams = {
        principalToken,
        collateralToken,
        collateralAmount,
        leverage,
        stopLossPrice,
        takeProfitPrice
    }

    const txSignature = await openMarketLong(
        wallet, 
        rpc, 
        params
    );

    if (txSignature) {
        console.log(`\nAttempted to open a market long position with the following parameters:`, params);
        console.log(`-> https://solscan.io/tx/${txSignature} <-`);

    } else {
        console.log(`Failed to open a market long position with the following parameters:`, params);
    }
}