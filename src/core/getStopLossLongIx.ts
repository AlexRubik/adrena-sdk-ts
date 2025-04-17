import { getSetStopLossLongInstruction, SetStopLossLongInput } from "../../codama-generated/instructions/setStopLossLong";
import { PRICE_DECIMALS } from "../helpers/constants";



export async function getSetStopLossLongIx(
    input: SetStopLossLongInput
) {

    input.stopLossLimitPrice = Math.round(Number(input.stopLossLimitPrice) * 10 ** PRICE_DECIMALS);
    const ix = getSetStopLossLongInstruction(input);

    return ix;
}
