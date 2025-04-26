import { ADRENA_LOOKUP_TABLE_ADDRESS } from "../helpers/constants";
import { sendTransactionWithJito } from "../helpers/jito";
import { ClosePositionShortParams, getClosePositionShortIxs } from "../instructions/getClosePositionIxs";


export async function closeShort(params: ClosePositionShortParams) {
    const closeShortIxs = await getClosePositionShortIxs(params);

    const result = await sendTransactionWithJito(
        closeShortIxs,
        params.wallet,
        params.rpc,
        true,
        true,
        [ADRENA_LOOKUP_TABLE_ADDRESS]
    )

    return result;

}