import { Address, Rpc, SolanaRpcApi } from "@solana/kit";
import { ADRENA_PROGRAM_ADDRESS, fetchPosition } from "../../codama-generated";
import { fetchPoolUtil, getCustodyByAddress } from "./utils";
import { loadCustodies } from "./utils";
import { getCustodyByMint } from "./utils";


export async function getPositionUtil(rpc: Rpc<SolanaRpcApi>, positionAddress: Address) {
    const position = await fetchPosition(rpc, positionAddress);

    const pool = await fetchPoolUtil('main-pool', ADRENA_PROGRAM_ADDRESS, rpc);
    const custodies = await loadCustodies(pool.data, rpc);
    const principalCustody = getCustodyByAddress(custodies, position.data.custody);
    const collateralCustody = getCustodyByAddress(custodies, position.data.collateralCustody);
    return {
        position,
        principalCustody,
        collateralCustody,
    };
}