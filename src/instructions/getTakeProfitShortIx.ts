
import { getSetTakeProfitShortInstruction, SetTakeProfitShortInput } from "../../codama-generated/instructions/setTakeProfitShort";
import { PRICE_DECIMALS } from "../helpers/constants";



export async function getTakeProfitShortIx(
    input: SetTakeProfitShortInput
) {
    // Convert to big int
    input.takeProfitLimitPrice = BigInt(Math.round(Number(input.takeProfitLimitPrice) * 10 ** PRICE_DECIMALS));

    const ix = getSetTakeProfitShortInstruction(input);

    return ix;
}