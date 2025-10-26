import { 
    Address, 
    IInstruction, 
    Rpc, 
    SolanaRpcApi, 
    TransactionSigner,
    getAddressEncoder,
    getProgramDerivedAddress,
    AccountRole,
    address
} from '@solana/kit';
import { getAddLiquidityInstruction } from '../../codama-generated/instructions/addLiquidity';
import { ADRENA_PROGRAM_ADDRESS } from '../../codama-generated/programs/adrena';
import { 
    ADRENA_PROGRAM_ID, 
    TOKEN_PROGRAM_ID,
    DEFAULT_MINT
} from '../helpers/constants';
import { 
    fetchPoolUtil, 
    findCustodyAddress, 
    findCustodyTokenAccountAddress, 
    getCortexPda, 
    getOraclePda, 
    getPoolPda, 
    getTransferAuthorityAddress 
} from '../helpers/utils';
import { createAssociatedTokenAccountIx, findATAAddress } from '../helpers/tokenHelpers';
import { ChaosLabsPricesExtended } from '../types';
import DataApiClient from '../clients/DataApiClient';

/**
 * Gets the LP token mint PDA
 * Matches: PublicKey.findProgramAddressSync(
 *   [Buffer.from('lp_token_mint'), this.mainPool.pubkey.toBuffer()],
 *   AdrenaClient.programId
 * )
 */
function getLpTokenMintPda(poolPda: Address, programId: Address = ADRENA_PROGRAM_ADDRESS) {
    const encoder = getAddressEncoder();
    const encodedPoolPda = encoder.encode(poolPda);
    
    console.log('getLpTokenMintPda - Derivation:');
    console.log('  Pool PDA:', poolPda);
    console.log('  Program ID:', programId);
    
    const result = getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("lp_token_mint"), encodedPoolPda],
    });
    
    return result;
}

/**
 * Gets the staking PDA for a given staked token mint
 */
function getStakingPda(stakedTokenMint: Address, programId: Address = ADRENA_PROGRAM_ADDRESS) {
    const encoder = getAddressEncoder();
    const encodedStakedTokenMint = encoder.encode(stakedTokenMint);
    
    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("staking"), encodedStakedTokenMint],
    });
}

/**
 * Creates an add liquidity instruction
 * 
 * @param owner - The wallet that will add liquidity (signer)
 * @param mint - The token mint address to add as liquidity
 * @param amountIn - Amount of tokens to add (in token's base units)
 * @param minLpAmountOut - Minimum LP tokens expected (in base units)
 * @param rpc - RPC client for checking account existence
 * 
 * @returns An object containing:
 *   - ixns: Array of instructions (includes ATA creation if needed)
 *   - owner: The transaction signer
 *   - lpTokenMint: The LP token mint address
 * 
 * @example
 * ```typescript
 * const { ixns, owner, lpTokenMint } = await getAddLiqIx(
 *   walletSigner,
 *   usdcMint,
 *   1000000n, // 1 USDC (6 decimals)
 *   950000n,  // minimum 0.95 LP tokens
 *   rpcClient
 * );
 * ```
 */
export async function getAddLiqIx(
    owner: TransactionSigner,
    mint: Address,
    amountIn: bigint,
    minLpAmountOut: bigint,
    rpc: Rpc<SolanaRpcApi>
): Promise<{
    ixns: IInstruction[],
    owner: TransactionSigner,
    lpTokenMint: Address,
}> {
    const ixns: IInstruction[] = [];

    // Get pool
    const pool = await fetchPoolUtil('main-pool', ADRENA_PROGRAM_ADDRESS, rpc);
    const poolPda = pool.address;

    // Get custody addresses
    const custodyAddress = (await findCustodyAddress(poolPda, mint))[0];
    const custodyTokenAccount = (await findCustodyTokenAccountAddress(poolPda, mint))[0];

    // Get funding account (user's token account for the mint)
    const fundingAccount = (await findATAAddress(owner.address, mint))[0];

    // Get LP token mint PDA
    const lpTokenMint = (await getLpTokenMintPda(poolPda))[0];
    console.log('Derived LP Token Mint:', lpTokenMint);

    // Check if user has LP token account, create if not
    const lpTokenAccountIx = await createAssociatedTokenAccountIx(
        owner.address,
        owner.address,
        lpTokenMint,
        rpc
    );

    if (!lpTokenAccountIx.ataExists && lpTokenAccountIx.ix) {
        console.log("Adding instruction to create LP token account");
        ixns.push(lpTokenAccountIx.ix);
    }

    const lpTokenAccount = lpTokenAccountIx.associatedAccount;

    // Get staking PDA for LP token
    const lpStaking = (await getStakingPda(lpTokenMint))[0];

    // Get other required PDAs
    const transferAuthority = (await getTransferAuthorityAddress())[0];
    const cortexPda = (await getCortexPda())[0];
    const oraclePda = (await getOraclePda())[0];

    // Get oracle prices from data API
    const oraclePrices: ChaosLabsPricesExtended | null =
        await DataApiClient.getChaosLabsPrices();

    // Create add liquidity instruction
    const addLiquidityIx = getAddLiquidityInstruction({
        owner: owner,
        fundingAccount: fundingAccount,
        lpTokenAccount: lpTokenAccount,
        transferAuthority: transferAuthority,
        lpStaking: lpStaking,
        cortex: cortexPda,
        pool: poolPda,
        custody: custodyAddress,
        oracle: oraclePda,
        custodyTokenAccount: custodyTokenAccount,
        lpTokenMint: lpTokenMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        adrenaProgram: ADRENA_PROGRAM_ID,
        amountIn: amountIn,
        minLpAmountOut: minLpAmountOut,
        oraclePrices: oraclePrices ? {
            prices: oraclePrices.prices.map(price => ({
                feedId: price.feedId,
                price: price.price.toNumber(),
                timestamp: price.timestamp.toNumber()
            })),
            signature: new Uint8Array(oraclePrices.signatureByteArray),
            recoveryId: oraclePrices.recoveryId
        } : null
    });

    // Add remaining accounts (custodies) as per AdrenaClient.prepareCustodiesForRemainingAccounts()
    // Filter out default custodies (PublicKey.default / 11111111111111111111111111111111)
    const custodiesAddresses = pool.data.custodies.filter(
        (custody) => custody !== DEFAULT_MINT
    );
    
    console.log(`Adding ${custodiesAddresses.length} custody remaining accounts`);
    
    // Append custody accounts as remaining accounts (readonly, not signers)
    const remainingAccounts = custodiesAddresses.map((custody) => ({
        address: custody,
        role: AccountRole.READONLY
    })) as typeof addLiquidityIx.accounts;
    
    // Append remaining accounts to the instruction
    addLiquidityIx.accounts.push(...remainingAccounts as any);

    ixns.push(addLiquidityIx);

    return {
        ixns,
        owner,
        lpTokenMint,
    };
}

