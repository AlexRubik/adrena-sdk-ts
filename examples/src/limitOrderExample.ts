import { 
    PrincipalToken,
    addLimitOrder,
    CollateralToken,
    createKitClient,
    checkTransactionConfirmed
} from "adrena-sdk-ts";


export async function runLimitOrderExample() {
    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const principalToken: PrincipalToken = "JITOSOL"; // the token we are trading
    // collateralToken must be the same as principal token when LONG and must be USDC when SHORT
    const collateralToken: CollateralToken = "JITOSOL"; 
    const collateralAmount: number = 0.071; // the amount of collateral to use
    const leverage: number = 20; // the leverage multiplier
    const side: "long" | "short" = "long"; // the side of the position
    const triggerPrice: number = 130; // the price at which the limit order will be triggered
    const limitPrice: number | null = null;
    const addLimitOrderResult = await addLimitOrder(
        {
            wallet,
            rpc,
            principalToken,
            collateralToken,
            collateralAmount,
            leverage,
            side,
            triggerPrice,
            limitPrice,
        }
    );

    if (addLimitOrderResult.txSignature) {
        const isConfirmed = await checkTransactionConfirmed(
            addLimitOrderResult.txSignature,
            rpc
        );

        if (isConfirmed) {
            console.log("Transaction confirmed!");
        } else {
            console.log("Transaction not confirmed");
        }
    }

}