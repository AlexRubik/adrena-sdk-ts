import { createKitClient } from "../clients/KitClient";
import { getAddLiqIx } from "../instructions/getAddLiqIx";
import { TOKEN_ADDRESSES, ADRENA_LOOKUP_TABLE_ADDRESS } from "../helpers/constants";
import { sendTransactionWithJito } from "../helpers/jito";
import { checkTransactionConfirmed } from "../helpers/txnHelpers";

/**
 * Example: Add liquidity to Adrena pool with 5 USDC
 * 
 * This example demonstrates how to:
 * 1. Get the add liquidity instruction
 * 2. Send the transaction using Jito
 * 3. Confirm the transaction
 */
export async function runAddLiquidityExample() {
    console.log("=== Add Liquidity Example ===\n");
    
    // Initialize client
    const kitClient = await createKitClient();
    const wallet = kitClient.wallet;
    const rpc = kitClient.rpc;

    console.log(`Wallet: ${wallet.address}`);
    console.log(`Adding 5 USDC to the liquidity pool...\n`);

    // USDC mint address
    const usdcMint = TOKEN_ADDRESSES['USDC'].address;
    
    // 5 USDC with 6 decimals = 5,000,000
    const amountIn = 5_000_000n;
    

    // TODO: Apply proper slippage
    const minLpAmountOut = 0n;

    console.log(`Amount In: 5 USDC (${amountIn} base units)`);
    console.log(`Min LP Amount Out: ${minLpAmountOut} base units\n`);

    try {
        // Get add liquidity instructions
        console.log("Fetching add liquidity instructions...");
        const { ixns, lpTokenMint } = await getAddLiqIx(
            wallet,
            usdcMint,
            amountIn,
            minLpAmountOut,
            rpc
        );

        console.log(`Number of instructions: ${ixns.length}`);
        console.log(`LP Token Mint: ${lpTokenMint}\n`);

        // Send transaction with Jito
        console.log("Sending transaction...");
        const signature = await sendTransactionWithJito(
            ixns,
            wallet,
            rpc,
            false, // not desperate (normal tip)
            false,  // send = true
            [ADRENA_LOOKUP_TABLE_ADDRESS] // lookup table addresses
        );

        if (signature) {
            console.log(`\n✓ Transaction sent successfully!`);
            console.log(`Transaction signature: ${signature}`);
            console.log(`View on Solscan: https://solscan.io/tx/${signature}\n`);

            // Wait for confirmation
            console.log("Waiting for transaction confirmation...");
            const confirmed = await checkTransactionConfirmed(signature, rpc, 10, 5);

            if (confirmed) {
                console.log("\n✓ Transaction confirmed!");
                console.log("Successfully added 5 USDC to the liquidity pool.");
                console.log("You should now have ALP tokens in your wallet!");
            } else {
                console.log("\n⚠ Transaction not confirmed after maximum attempts.");
                console.log("Please check the transaction status manually:");
                console.log(`https://solscan.io/tx/${signature}`);
            }
        } else {
            console.log("\n✗ Failed to send transaction");
        }
    } catch (error) {
        console.error("\n✗ Error adding liquidity:");
        console.error(error);
        
        // Provide helpful error messages
        if (error instanceof Error) {
            if (error.message.includes('insufficient funds')) {
                console.error("\nTip: Make sure you have enough USDC in your wallet (5 USDC + some SOL for fees)");
            } else if (error.message.includes('slippage')) {
                console.error("\nTip: Try increasing the slippage tolerance");
            }
        }
    }
}

// Run if executed directly
if (require.main === module) {
    runAddLiquidityExample()
        .then(() => {
            console.log("\n=== Example completed ===");
            process.exit(0);
        })
        .catch((error) => {
            console.error("Fatal error:", error);
            process.exit(1);
        });
}

