import { runOpenMarketLongExample } from "./examples/openMarketLongExample";
import { getBasicProfileData } from "./helpers/userProfile";
import { createClient as createKitClient } from "./clients/KitClient";
import { hasUserProfile } from "./helpers/userProfile";
async function main() {
    // await runOpenMarketLongExample();

    const client = await createKitClient();

    const hasProfile = await hasUserProfile(client.wallet.address, client.rpc);
    console.log(hasProfile);

    if (hasProfile.exists && hasProfile.pda) {
        const profileData = await getBasicProfileData(hasProfile.pda, client.rpc);
        console.log(profileData);
    } else {
        console.log("No profile found");
    }

    
}

main();


