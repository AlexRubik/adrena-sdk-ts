import { createKitClient } from "../clients/KitClient";
import { getPositionStatus } from "../core/positionStatus";
import { PRINCIPAL_ADDRESSES } from "../helpers/constants";
import { fetchPoolUtil, findPositionAddress, getCustodyByMint } from "../helpers/utils";
import { loadCustodies } from "../helpers/utils";
import { CollateralToken, PrincipalToken } from "../types";
import { runCloseLongExample } from "./closeLongExample";


export async function runPositionStatusExample(
    principalToken: PrincipalToken = "JITOSOL",

    side: "long" | "short" = "long",

) {

    await runCloseLongExample();


    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    const pool = await fetchPoolUtil('main-pool', undefined, rpc);
    const custodies = await loadCustodies(pool.data, rpc);

    

    const principalCustody = getCustodyByMint(custodies, PRINCIPAL_ADDRESSES[principalToken].address);
    const collateralToken: CollateralToken = "USDC"; // the token we are using as collateral

    if (!principalCustody) {
        throw new Error("Principal custody not found");
    }

    const positionAddress = (await findPositionAddress(
        pool.address,
        wallet.address,
        principalCustody.address,
        side
    ))[0];

    const positionStatus = await getPositionStatus({
        wallet,
        rpc,
        principalToken,
        side,
        positionAddress
    });

    console.log("Position status:", positionStatus);
}

runPositionStatusExample();