import { 
    createKitClient,
    getPositionStatus,
    PRINCIPAL_ADDRESSES,
    fetchPoolUtil,
    findPositionAddress,
    getCustodyByMint,
    loadCustodies,
    PrincipalToken,
} from "adrena-sdk-ts";
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
    //const collateralToken: CollateralToken = "USDC"; // the token we are using as collateral

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
        positionAddress
    });

    console.log("Position status:", positionStatus);
}
