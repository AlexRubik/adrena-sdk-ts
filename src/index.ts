import { runOpenMarketLongExample } from "./examples/openMarketLongExample";
import { getBasicProfileData } from "./helpers/userProfile";
import { createClient as createKitClient } from "./clients/KitClient";
import { hasUserProfile } from "./helpers/userProfile";
import { runLimitOrderExample } from "./examples/limitOrderExample";
async function main() {
    // await runOpenMarketLongExample();

    await runLimitOrderExample();

    
}

main();


