import { AccountRole, address, Address, getAddressEncoder, getProgramDerivedAddress, Rpc, SolanaRpcApi } from "@solana/kit";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "./constants";


export function findATAAddress(
    wallet: Address,
    mint: Address,
  ) {
    const encoder = getAddressEncoder();
    const encodedWallet = encoder.encode(wallet);
    const encodedMint = encoder.encode(mint);
    const encodedTokenProgramId = encoder.encode(TOKEN_PROGRAM_ID);

    console.log('findATAAddress - Derivation details:');
    console.log('  Wallet:', wallet);
    console.log('  Mint:', mint);
    console.log('  Token Program:', TOKEN_PROGRAM_ID);
    console.log('  ATA Program:', ASSOCIATED_TOKEN_PROGRAM_ID);

    return getProgramDerivedAddress({
        programAddress: ASSOCIATED_TOKEN_PROGRAM_ID,
        seeds: [encodedWallet, encodedTokenProgramId, encodedMint],
    });
  }

export async function hasATA(ataAddress: Address, rpc: Rpc<SolanaRpcApi>) {

  try {
    const accountInfo = await rpc.getTokenAccountBalance(
      ataAddress,
      { 
          commitment: 'confirmed'
      }
      ).send()

    return (!!accountInfo && !!accountInfo.value);
  } catch (error) {
    return false;
  }
}


/**
 * Creates an instruction to initialize an Associated Token Account (ATA)
 * 
 * This function checks if the ATA already exists for the given wallet and token mint.
 * If it exists, returns an object indicating the ATA exists with a null instruction.
 * If it doesn't exist, returns an object with the instruction to create the ATA.
 * 
 * @param fundingAddress - The address that will pay for the account creation
 * @param walletAddress - The wallet address that will own the associated token account
 * @param tokenMintAddress - The mint address of the token
 * @param rpc - The RPC client used to check if the ATA already exists
 * 
 * @returns An object containing:
 *   - ataExists: boolean indicating if the ATA already exists
 *   - ix: The instruction to create the ATA (null if it already exists)
 * 
 * @example
 * ```typescript
 * const result = await createAssociatedTokenAccountIx(
 *   payer.publicKey,
 *   userWallet,
 *   usdcMint,
 *   rpcClient
 * );
 * 
 * if (!result.ataExists) {
 *   ixns.push(result.ix);
 * }
 * ```
 */
export async function createAssociatedTokenAccountIx(
  fundingAddress: Address,
  walletAddress: Address,
  tokenMintAddress: Address,
  rpc: Rpc<SolanaRpcApi>
) {
  const ATA_PROGRAM_ID = address('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
  const TOKEN_PROGRAM_ID = address('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
  const SYSTEM_PROGRAM_ID = address('11111111111111111111111111111111');
  
  const associatedAccount = await findATAAddress(walletAddress, tokenMintAddress);
  
  // Log addresses for debugging
  console.log('\n=== ATA Creation Debug Info ===');
  console.log('Funding Address (payer):', fundingAddress);
  console.log('Wallet Address (owner):', walletAddress);
  console.log('Token Mint Address:', tokenMintAddress);
  console.log('Derived ATA Address:', associatedAccount[0]);
  console.log('Token Program ID:', TOKEN_PROGRAM_ID);
  console.log('ATA Program ID:', ATA_PROGRAM_ID);
  console.log('System Program ID:', SYSTEM_PROGRAM_ID);
  console.log('================================\n');
  
  const hasAta = await hasATA(associatedAccount[0], rpc);

  if (hasAta) {
    return {
      ataExists: true,
      associatedAccount: associatedAccount[0],
      ix: null
    };
  }

  // The Associated Token Program's CreateIdempotent instruction
  // Matching the Rust implementation and on-chain order:
  // 0. source (funding_address) - writable, signer
  // 1. account (associated_account_address) - writable
  // 2. wallet (wallet_address) - readonly
  // 3. mint (token_mint_address) - readonly
  // 4. systemProgram (SYSTEM_PROGRAM_ID) - readonly
  // 5. tokenProgram (TOKEN_PROGRAM_ID) - readonly
  // Data: [1] for CreateIdempotent
  const ix = {
      programAddress: ATA_PROGRAM_ID,
      accounts: [
          { address: fundingAddress, role: AccountRole.WRITABLE_SIGNER },
          { address: associatedAccount[0], role: AccountRole.WRITABLE },
          { address: walletAddress, role: AccountRole.READONLY },
          { address: tokenMintAddress, role: AccountRole.READONLY },
          { address: SYSTEM_PROGRAM_ID, role: AccountRole.READONLY },
          { address: TOKEN_PROGRAM_ID, role: AccountRole.READONLY }
      ],
      data: new Uint8Array([1]) // 1 = CreateIdempotent instruction
  };

  return {
    ataExists: false,
    associatedAccount: associatedAccount[0],
    ix: ix
  };
}