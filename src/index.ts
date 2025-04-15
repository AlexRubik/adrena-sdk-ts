import { createKeyPairSignerFromBytes, IInstruction } from "@solana/kit";
import path from "path";
import fs from "fs";
import { openSolLong } from "./examples/openLong";
import { createClient } from "./helpers/KitClient";

import { findATAAddress, hasATA } from './helpers/tokenHelpers';
import { address } from '@solana/kit';
import { JITOSOL_TOKEN_MINT, USDC_TOKEN_MINT } from "./helpers/constants";
import { sendTransactionWithJito } from "./helpers/jito";
import { buildInitUserProfileIx, hasUserProfile } from "./helpers/userProfile";

async function main() {

    const kitClient = createClient();
    const rpc = kitClient.rpc;

    const config = require(path.join(process.cwd(), 'config.json'));
    const keyPairBytes = new Uint8Array(JSON.parse(fs.readFileSync(config.keypairPath, 'utf8')));
    const wallet = await createKeyPairSignerFromBytes(keyPairBytes);

    const testAddress = address('2Cdt59MDpoDqCRCfo3tphfhXvgnVm4pDGztwC83NXnMt');

    const result = await hasUserProfile(wallet.address, rpc);
    console.log(result);

    const ixns: IInstruction[] = [];

    if (!result) {
        const initProfileIx = await buildInitUserProfileIx(wallet);
        ixns.push(initProfileIx);
    }



    const openLongIxns = await openSolLong(wallet, 'USDC', 10, 10, rpc);
    ixns.push(...openLongIxns);

    const sendJitoResult = await sendTransactionWithJito(
        ixns,
        wallet,
        rpc,
        false,
        false
    )

    console.log(sendJitoResult);

}

main();


