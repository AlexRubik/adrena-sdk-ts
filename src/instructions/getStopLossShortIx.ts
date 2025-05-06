import { getSetStopLossShortInstruction, SetStopLossShortInput } from "../../codama-generated/instructions/setStopLossShort";
import { PRICE_DECIMALS } from "../helpers/constants";



export async function getSetStopLossShortIx(
    input: SetStopLossShortInput
) {

    // Convert to big int
    input.stopLossLimitPrice = BigInt(Math.round(Number(input.stopLossLimitPrice) * 10 ** PRICE_DECIMALS));
    const ix = getSetStopLossShortInstruction(input);

    return ix;
}