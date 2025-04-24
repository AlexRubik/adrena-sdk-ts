import { runOpenMarketLongExample } from "./examples/openMarketLongExample";
import { getBasicProfileData } from "./helpers/userProfile";
import { createClient as createKitClient } from "./clients/KitClient";
import { hasUserProfile } from "./helpers/userProfile";
import { runLimitOrderExample } from "./examples/limitOrderExample";
import { getPositionUtil } from "./helpers/position";
import { address } from "@solana/kit";
import { PRICE_DECIMALS, TOKEN_ADDRESSES } from "./helpers/constants";
import { getPythPrice } from "./helpers/pyth";
import { fetchPoolUtil, findPositionAddress, getCustodyByMint, getPoolPda, loadCustodies } from "./helpers/utils";
async function main() {
    // await runOpenMarketLongExample();

    // await runLimitOrderExample();

    const client = await createKitClient();

    const pool = await fetchPoolUtil('main-pool', undefined, client.rpc);
    const custodies = await loadCustodies(pool.data, client.rpc);

    const custody = getCustodyByMint(
        custodies,
        TOKEN_ADDRESSES['WBTC'].address
    );

    if (!custody) {
        throw new Error('Custody not found');
    }

    const testUserWalletAddress = address('2Cdt59MDpoDqCRCfo3tphfhXvgnVm4pDGztwC83NXnMt');

    const testPos = await findPositionAddress(
        pool.address,
        testUserWalletAddress,
        custody.address,
        "short"
    )

    const position = await getPositionUtil(client.rpc, testPos[0]);

    // updateTime: 1745422833n
    const updateTimeUnixSeconds = Number(position.position.data.updateTime);
    const openTimeUnixSeconds = Number(position.position.data.openTime);
    const dateTimeOpen = new Date(openTimeUnixSeconds * 1000);
    const updateTime = new Date(updateTimeUnixSeconds * 1000);

    console.log(`Open Time: ${dateTimeOpen.toUTCString()}`);
    console.log(`Update Time: ${updateTime.toUTCString()}`);

    // how long ago was the position updated?
    const now = new Date();
    console.log(`Now: ${now.toUTCString()}`);
    const timeSinceUpdate = now.getTime() - updateTime.getTime();
    const timeSinceUpdateSeconds = timeSinceUpdate / 1000;
    // human readable time of time ago in hours and minutes
    const timeSinceUpdateHours = Math.floor(timeSinceUpdateSeconds / 3600);


    const normalizedPrice = Number(position.position.data.price) / 10 ** PRICE_DECIMALS;
    const normalizedExitFee = Number(position.position.data.exitFeeUsd) / 10 ** 6;
    const normalizedUnrealizedInterestUsd = Number(position.position.data.unrealizedInterestUsd) / 10 ** 6;
    const normalizedSizeUsd = Number(position.position.data.sizeUsd) / 10 ** 6;
    const assetAmount = normalizedSizeUsd / normalizedPrice;

    const pythPrice = await getPythPrice("BTC");
    const preFeePnl = (normalizedSizeUsd - assetAmount * pythPrice);

    const pnl = preFeePnl - normalizedExitFee - normalizedUnrealizedInterestUsd * timeSinceUpdateHours;



    console.log(position.position.data);
    console.log(`Entry Price: ${normalizedPrice}`);
    console.log(`Pyth Price: ${pythPrice}`);
    console.log(`Size: $${normalizedSizeUsd}`);
    console.log(`Exit Fee: $${normalizedExitFee}`);
    console.log(`Unrealized Interest: $${normalizedUnrealizedInterestUsd * timeSinceUpdateHours}`);
    console.log(`Asset Amount: ${assetAmount}`);
    console.log(`Pre-Fee Pnl: $${preFeePnl}`);
    console.log(`Pnl: $${pnl}`);
    console.log(`\nPrincipal Custody Mint: ${position.principalCustody?.data.mint}`);
    console.log(`Collateral Custody Mint: ${position.collateralCustody?.data.mint}`);
}

main();


