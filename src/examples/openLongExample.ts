import { IInstruction } from "@solana/kit";
import { openLongIxs } from "../core/getOpenLongIxs";
import { createClient as createKitClient } from "../clients/KitClient";
import { sendTransactionWithJito } from "../helpers/jito";
import { buildInitUserProfileIx, hasUserProfile } from "../helpers/userProfile";
import { TOKEN_ADDRESSES } from "../helpers/constants";
import { PRINCIPAL_ADDRESSES } from "../helpers/constants";
import { CollateralToken, PrincipalToken } from "../types";
import { getSetStopLossLongIx } from "../core/getStopLossLongIx";


async function main() {

    const kitClient = await createKitClient();
    const rpc = kitClient.rpc;
    const wallet = kitClient.wallet;

    // check if wallet has an adrena profile
    // if not, we are going to create one with
    const hasProfile = await hasUserProfile(wallet.address, rpc);

    const ixns: IInstruction[] = [];

    if (!hasProfile) {
        // wallet has no profile, get instruction to create one
        const initProfileIx = await buildInitUserProfileIx(wallet);
        ixns.push(initProfileIx);
    }

    // principal token is the token we want to trade / open a position for.
    // In this case, we want to open a long position for JITOSOL
    const principalToken: PrincipalToken = 'JITOSOL';
    // collateral token is the token we want to use as collateral.
    // In this case, we want to use USDC as collateral
    const collateralToken: CollateralToken = 'USDC';
    // collateral amount is the amount of collateral we want to use.
    // In this case, we want to use 10 USDC as collateral
    const collateralAmount = 10;
    // leverage is the leverage we want to use.
    // In this case, we want to use 5x leverage, so our position value will be $50 before fees
    const leverage = 5;

    // get instructions to open a long position
    const openLongIxns = await openLongIxs(
        wallet, 
        principalToken, 
        collateralToken, 
        collateralAmount, 
        leverage, 
        rpc
    );
    ixns.push(...openLongIxns.ixns);

    const normalStopLossLimitPrice = 100.5;

    const setStopLossLongIx = await getSetStopLossLongIx(
        {
            owner: wallet,
            cortex: openLongIxns.cortex,
            pool: openLongIxns.pool,
            position: openLongIxns.positionAddress,
            custody: openLongIxns.principalCustodyObj.address,
            stopLossLimitPrice: normalStopLossLimitPrice,
            closePositionPrice: null
    });
    ixns.push(setStopLossLongIx);

    // send transaction with jito
    const sendJitoResult = await sendTransactionWithJito(
        ixns,
        wallet,
        rpc,
        false,
        false
    )

    sendJitoResult ? console.log('Transaction attempted to send with Jito\n', sendJitoResult) : console.log('Transaction failed to send with Jito');

}

main();