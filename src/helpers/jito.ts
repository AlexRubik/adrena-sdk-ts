import { getTransferSolInstruction } from "@solana-program/system";
import { getSetComputeUnitLimitInstruction } from "@solana-program/compute-budget";
import { 
    address,  
    appendTransactionMessageInstructions, 
    compressTransactionMessageUsingAddressLookupTables, 
    createTransactionMessage, 
    getBase64EncodedWireTransaction, 
    getSignatureFromTransaction, 
    IInstruction, 
    pipe, 
    Rpc, 
    setTransactionMessageFeePayer, 
    setTransactionMessageFeePayerSigner, 
    setTransactionMessageLifetimeUsingBlockhash, 
    signTransactionMessageWithSigners, 
    SolanaRpcApi, 
    TransactionSigner
} from "@solana/kit";
import { fetchLookupTables, getCUEst } from "./txnHelpers";

const DEBUG = false;

type JitoTipData = {
  time: string;
  landed_tips_25th_percentile: number;
  landed_tips_50th_percentile: number;
  landed_tips_75th_percentile: number;
  landed_tips_95th_percentile: number;
  landed_tips_99th_percentile: number;
  ema_landed_tips_50th_percentile: number;
}

const tipAccounts = [
    "3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT",
    "96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5",
    "ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt",
    "ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49",
    "HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe",
    "DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh",
    "DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL",
    "Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY"
]

export async function getJitoTipData(): Promise<JitoTipData> {
  const response = await fetch('https://bundles.jito.wtf/api/v1/bundles/tip_floor');
  const data = await response.json();
  return data[0];
}

type JitoBundleResponse = {
  jsonrpc: "2.0";
  result: string;  // Bundle ID
  id: 1;
}

export async function sendJitoBundle(base64Transactions: string[]): Promise<string> {
  try {
    const response = await fetch('https://mainnet.block-engine.jito.wtf:443/api/v1/bundles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'sendBundle',
        params: [
          base64Transactions,
          {
            encoding: 'base64'
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as JitoBundleResponse;
    return data.result;  // Returns the bundle ID
  } catch (error) {
    console.error('Error sending Jito bundle:', error);
    throw error;
  }
}

// get jito tip instruction

export async function getJitoTipIxn(
  fromKeypair: TransactionSigner,
  maxTipSol: number = 0.002,
  overrideTipSol?: number  // Optional override in SOL
): Promise<IInstruction> {
  const LAMPORTS_PER_SOL = 1_000_000_000;
  let lamports: bigint;

  // If override is provided, use it directly
  if (typeof overrideTipSol === 'number') {
    lamports = BigInt(Math.floor(overrideTipSol * LAMPORTS_PER_SOL));
    console.log(`Using override tip amount: ${overrideTipSol} SOL (${lamports} lamports)`);
  } else {
    // Existing logic for dynamic tip calculation
    lamports = BigInt(Math.floor(0.0001 * LAMPORTS_PER_SOL));
    
    try {
      const tipData = await getJitoTipData();
      lamports = BigInt(Math.floor(tipData.landed_tips_75th_percentile * LAMPORTS_PER_SOL));
      console.log('75th percentile tip:', tipData.landed_tips_75th_percentile);
      
      if (lamports > BigInt(Math.floor(maxTipSol * LAMPORTS_PER_SOL))) {
        console.log(`Using ${maxTipSol} SOL as default`);
        lamports = BigInt(Math.floor(maxTipSol * LAMPORTS_PER_SOL));
      }
    } catch (error) {
      console.error('Error getting Jito tip data:', error);
      console.log(`Using ${maxTipSol} SOL as default`);
      lamports = BigInt(Math.floor(maxTipSol * LAMPORTS_PER_SOL));
    }
  }

  // get destination address from tipAccounts
  const destinationAddress = tipAccounts[Math.floor(Math.random() * tipAccounts.length)];

  const instruction = getTransferSolInstruction({
    amount: lamports,
    destination: address(destinationAddress),
    source: fromKeypair,
  });

  return instruction;
}

// @ts-ignore
export async function sendTransactionWithJito(
    instructions: IInstruction[],
    wallet: TransactionSigner,
    rpc: Rpc<SolanaRpcApi>,
    desparate: boolean = false,
    send: boolean = true,
    lutAddresses?: string[]
) {
    const blockhash = await rpc.getLatestBlockhash().send();


    console.log("Wallet address:", wallet.address);

    const desprateTip = desparate ? 0.005 : undefined;

    // Get Jito tip instruction
    const jitoTipIxn = await getJitoTipIxn(wallet, desprateTip, desprateTip);

    const transactionMessage = pipe(
        createTransactionMessage({ version: 0 }),
        tx => setTransactionMessageFeePayer(wallet.address, tx),
        tx => setTransactionMessageLifetimeUsingBlockhash(blockhash.value, tx),
        // Add Jito tip first, then other instructions
        tx => appendTransactionMessageInstructions([jitoTipIxn, ...instructions], tx),
        tx => setTransactionMessageFeePayerSigner(wallet, tx)
    );
    console.log("Transaction message created");

    const computeUnitsEstimate = send ? await getCUEst(transactionMessage, rpc) : 500000;
    console.log("Setting compute units to ", computeUnitsEstimate);

    // Only add compute unit limit, no price instruction
    let finalTransactionMessage = appendTransactionMessageInstructions(
        [getSetComputeUnitLimitInstruction({ units: computeUnitsEstimate })],
        transactionMessage,
    );

    // Add lookup tables if provided
    if (lutAddresses) {
        const lutAccounts = await fetchLookupTables(lutAddresses.map(address), rpc);
        DEBUG ? console.log("LUT accounts:", lutAccounts) : null;
        finalTransactionMessage = compressTransactionMessageUsingAddressLookupTables(
            finalTransactionMessage,
            lutAccounts
        );
    }

    const signedTxn = await signTransactionMessageWithSigners(finalTransactionMessage);
    const base64Txn = getBase64EncodedWireTransaction(signedTxn);

    console.log(`Base64 transaction:\n${base64Txn}\n`);

    console.log(`Paste this long base64 string into this transaction inspector to simulate/analyze the transaction:`);
    console.log('https://explorer.solana.com/tx/inspector');

    const signature = getSignatureFromTransaction(signedTxn);
    

    if (send) {

        try {
            console.log("Sending transaction as Jito bundle");
            const bundleId = await sendJitoBundle([base64Txn]);
            console.log("Jito Bundle ID:", bundleId);
            console.log("Signature:", signature);
            return signature;
        } catch (e) {
            console.error('Error sending Jito bundle:', e);
            throw e;
        }

    }


}