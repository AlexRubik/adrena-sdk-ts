import { createKitClient } from "../clients/KitClient";
import { closeLong } from "../core/closeLong";
import { getPositionStatus } from "../core/positionStatus";
import { checkTransactionConfirmed } from "../helpers/txnHelpers";


export async function runCloseLongExample() {

    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const closeLongResult = await closeLong({
        wallet,
        rpc,
        principalToken: "JITOSOL",
    });


    if (closeLongResult) {
        const isConfirmed = await checkTransactionConfirmed(
            closeLongResult,
            rpc
        );

        if (isConfirmed) {
            console.log("Transaction confirmed!");

        } else {
            console.log("Transaction not confirmed");
        }
    }

}