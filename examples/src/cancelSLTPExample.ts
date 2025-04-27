import { PrincipalToken } from "adrena-sdk-ts";
import { createKitClient } from "adrena-sdk-ts/clients";
import { checkTransactionConfirmed } from "adrena-sdk-ts/helpers";
import { cancelSLTP } from "adrena-sdk-ts/core";


export async function runCancelSLTPExample() {
    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const principalToken: PrincipalToken = "JITOSOL"; // the token we are trading
    const side: "long" | "short" = "long"; // the side of the position
    const cancelStopLoss: boolean = true; // whether to cancel the stop loss
    const cancelTakeProfit: boolean = true; // whether to cancel the take profit

    // cancelSLTP will cancel the stop loss and/or take profit
    const cancelSLTPResult = await cancelSLTP(wallet, rpc, principalToken, side, cancelStopLoss, cancelTakeProfit);

    if (cancelSLTPResult.txSignature) {
        const confirmed = await checkTransactionConfirmed(cancelSLTPResult.txSignature, rpc);
        if (confirmed) {
            console.log("Transaction confirmed!");
        }
    }
}