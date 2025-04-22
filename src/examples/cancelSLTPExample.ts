import { createClient } from "../clients/KitClient";
import { PrincipalToken } from "../types";

import { cancelSLTP } from "../core/cancelSLTP";

export async function runCancelSLTPExample() {
    const kitClient = await createClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const principalToken: PrincipalToken = "JITOSOL"; // the token we are trading
    const side: "long" | "short" = "long"; // the side of the position
    const cancelStopLoss: boolean = true; // whether to cancel the stop loss
    const cancelTakeProfit: boolean = true; // whether to cancel the take profit

    const result = await cancelSLTP(wallet, rpc, principalToken, side, cancelStopLoss, cancelTakeProfit);
    return result;
}