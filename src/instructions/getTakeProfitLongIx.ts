

import { getSetTakeProfitLongInstruction, SetTakeProfitLongInput } from "../../codama-generated/instructions/setTakeProfitLong";
import { PRICE_DECIMALS } from "../helpers/constants";



export async function getTakeProfitLongIx(
    input: SetTakeProfitLongInput
) {
    // Convert to big int
    input.takeProfitLimitPrice = BigInt(Math.round(Number(input.takeProfitLimitPrice) * 10 ** PRICE_DECIMALS));

    const ix = getSetTakeProfitLongInstruction(input);

    return ix;
}