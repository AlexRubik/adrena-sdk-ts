import { PrincipalToken } from "../types";
import { addLimitOrder } from "../core/addLimitOrder";
import { CollateralToken } from "../types";
import { createClient } from "../clients/KitClient";


export async function runLimitOrderExample() {
    const kitClient = await createClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const principalToken: PrincipalToken = "JITOSOL"; // the token we are trading
    const collateralToken: CollateralToken = "JITOSOL"; // the token used as collateral
    const collateralAmount: number = 0.071; // the amount of collateral to use
    const leverage: number = 20; // the leverage multiplier
    const side: "long" | "short" = "long"; // the side of the position
    const triggerPrice: number = 129; // the price at which the limit order will be triggered
    const limitPrice: number | null = null;
    const result = await addLimitOrder(
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

    return result;
}