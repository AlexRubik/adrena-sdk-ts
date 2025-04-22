import { CancelStopLossInput, getCancelStopLossInstruction } from "../../codama-generated/instructions/cancelStopLoss";
import { CancelTakeProfitInput } from "../../codama-generated/instructions/cancelTakeProfit";
import { getCancelTakeProfitInstruction } from "../../codama-generated/instructions/cancelTakeProfit";

export async function getCancelStopLossIx(
    input: CancelStopLossInput
) {
    const ix = getCancelStopLossInstruction(input);
    return ix;
}

export async function getCancelTakeProfitIx(
    input: CancelTakeProfitInput
) {
    const ix = getCancelTakeProfitInstruction(input);
    return ix;
}