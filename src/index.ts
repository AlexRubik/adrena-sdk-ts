import { runOpenMarketLongExample } from "./examples/openMarketLongExample";
import { getBasicProfileData } from "./helpers/userProfile";
import { createKitClient } from "./clients/KitClient";
import { hasUserProfile } from "./helpers/userProfile";
import { runLimitOrderExample } from "./examples/limitOrderExample";
import { calculateTotalInterest, getPositionUtil } from "./helpers/position";
import { address } from "@solana/kit";
import { PRICE_DECIMALS, TOKEN_ADDRESSES } from "./helpers/constants";
import { getPythPrice } from "./helpers/pyth";
import { fetchPoolUtil, findPositionAddress, getCustodyByMint, getPoolPda, loadCustodies } from "./helpers/utils";
import BN from "bn.js";
import { formatScaledValue } from "./helpers/math";
async function main() {
    await runOpenMarketLongExample();

    // await runLimitOrderExample();

}

main();


