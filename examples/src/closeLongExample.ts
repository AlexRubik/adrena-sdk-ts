import { 
    createKitClient,
    PrincipalToken,
    closeLong,
    checkTransactionConfirmed
} from "adrena-sdk-ts";


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