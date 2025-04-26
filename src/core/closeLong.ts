import { ADRENA_LOOKUP_TABLE_ADDRESS } from "../helpers/constants";
import { sendTransactionWithJito } from "../helpers/jito";
import { ClosePositionLongParams, getClosePositionLongIxs } from "../instructions/getClosePositionIxs";


export async function closeLong(params: ClosePositionLongParams) {

    const closeLongIxs = await getClosePositionLongIxs(params);

    const txSignature = await sendTransactionWithJito(
        closeLongIxs.ixs,
        params.wallet,
        params.rpc,
        true,
        true,
        [ADRENA_LOOKUP_TABLE_ADDRESS]
    )

    return {
        txSignature: txSignature,
        positionAddress: closeLongIxs.positionAddress
    };

}