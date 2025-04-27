import { PrincipalToken } from "adrena-sdk-ts";
import { closeLong } from "adrena-sdk-ts/core";
import { createKitClient } from "adrena-sdk-ts/clients";
import { checkTransactionConfirmed } from "adrena-sdk-ts/helpers";


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