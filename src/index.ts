import { createKeyPairSignerFromBytes, IInstruction } from "@solana/kit";
import path from "path";
import fs from "fs";
import { openLongIxs } from "./core/getOpenLongIxs";
import { createClient as createKitClient } from "./clients/KitClient";

import { findATAAddress, hasATA } from './helpers/tokenHelpers';
import { address } from '@solana/kit';
import { JITOSOL_TOKEN_MINT, USDC_TOKEN_MINT } from "./helpers/constants";
import { sendTransactionWithJito } from "./helpers/jito";
import { buildInitUserProfileIx, hasUserProfile } from "./helpers/userProfile";

async function main() {

    const kitClient = await createKitClient();
    const rpc = kitClient.rpc;
    const wallet = kitClient.wallet;

    const config = require(path.join(process.cwd(), 'config.json'));
    const keyPairBytes = new Uint8Array(JSON.parse(fs.readFileSync(config.keypairPath, 'utf8')));

    const testAddress = address('2Cdt59MDpoDqCRCfo3tphfhXvgnVm4pDGztwC83NXnMt');

    const result = await hasUserProfile(wallet.address, rpc);
    console.log(result);

    const ixns: IInstruction[] = [];

    if (!result) {
        const initProfileIx = await buildInitUserProfileIx(wallet);
        ixns.push(initProfileIx);
    }



    const openLongIxns = await openLongIxs(wallet, 'JITOSOL', 'USDC', 10, 5, rpc);
    ixns.push(...openLongIxns.ixns);

    const sendJitoResult = await sendTransactionWithJito(
        ixns,
        wallet,
        rpc,
        false,
        true
    )

    console.log(sendJitoResult);

}

main();


