import { createKitClient } from "../clients/KitClient";
import { PrincipalToken } from "../types";

import { cancelSLTP } from "../core/cancelSLTP";
import { checkTransactionConfirmed } from "../helpers/txnHelpers";

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