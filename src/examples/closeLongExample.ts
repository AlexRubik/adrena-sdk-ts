import { createKitClient } from "../clients/KitClient";
import { closeLong } from "../core/closeLong";
import { getPositionStatus } from "../core/positionStatus";
import { checkTransactionConfirmed } from "../helpers/txnHelpers";
import { PrincipalToken } from "../types";


export async function runCloseLongExample() {

    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const principalToken: PrincipalToken = "JITOSOL";

    const closeLongResult = await closeLong({
        wallet,
        rpc,
        principalToken,
    });


    if (closeLongResult.txSignature) {
        const isConfirmed = await checkTransactionConfirmed(
            closeLongResult.txSignature,
            rpc
        );

        if (isConfirmed) {
            console.log("Transaction confirmed!");

        } else {
            console.log("Transaction not confirmed");
        }
    }

}