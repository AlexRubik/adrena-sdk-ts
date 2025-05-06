import { createKitClient } from "../clients/KitClient";
import { closeShort } from "../core/closeShort";
import { checkTransactionConfirmed } from "../helpers/txnHelpers";
import { CollateralToken, PrincipalToken } from "../types";

export async function runCloseShortExample() {
    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const principalToken: PrincipalToken = "JITOSOL";
    const collateralToken: CollateralToken = "USDC";
    const closeShortResult = await closeShort({
        wallet,
        rpc,
        principalToken,
        collateralToken,
    });

    if (closeShortResult.txSignature) {
        console.log(`\nAttempted to close a short position for ${principalToken}`);
        console.log(`-> https://solscan.io/tx/${closeShortResult.txSignature} <-`);
        
        const isConfirmed = await checkTransactionConfirmed(
            closeShortResult.txSignature,
            rpc
        );

        if (isConfirmed) {
            console.log("Transaction confirmed!");
        } else {
            console.log("Transaction not confirmed");
        }
    } else {
        console.log(`Failed to close short position for ${principalToken}`);
    }
}
