import { Account, address, Address, getProgramDerivedAddress,
    getAddressEncoder,
    Rpc,
    GetAccountInfoApi,
    GetMultipleAccountsApi,
    SolanaRpcApi
 } from "@solana/kit";
import { ADRENA_PROGRAM_ADDRESS } from "../../codama-generated/programs/adrena";
import { Custody, fetchAllCustody, fetchPool, Pool } from "../../codama-generated";


export function getPoolPda(poolName: string = 'main-pool', programId: Address = ADRENA_PROGRAM_ADDRESS) {
    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("pool"), Buffer.from(poolName)],
    });
};

export async function fetchPoolUtil(
    poolName: string = 'main-pool', 
    programId: Address = ADRENA_PROGRAM_ADDRESS, 
    rpc: Rpc<GetAccountInfoApi>) {

    const poolPda = await getPoolPda(poolName, programId);
    const pool = await fetchPool(
        rpc,
        poolPda[0],
        {
            commitment: 'confirmed',
        }
    )
    return pool;
}

export async function loadCustodies(pool: Pool, rpc: Rpc<GetMultipleAccountsApi>) {

    const custodies = pool.custodies.filter(custody => custody !== (address('11111111111111111111111111111111')));

    const fetchCustodyAccsResult = await fetchAllCustody(
        rpc,
        custodies,
        {
            commitment: 'confirmed',
        }
    )

    return fetchCustodyAccsResult;

}

export function getCustodyByMint(custodies: Account<Custody>[], mint: Address) {
    // null check
    if (custodies.length === 0 || !custodies || !custodies[0] || !custodies[0].data || !custodies[0].data.mint) {
        throw new Error("No custodies found");
    }
    return custodies.find(custody => custody.data.mint === mint);
}

export function getCustodyByAddress(custodies: Account<Custody>[], address: Address) {
    // null check
    if (custodies.length === 0 || !custodies || !custodies[0] || !custodies[0].address) {
        throw new Error("No custodies found");
    }
    return custodies.find(custody => custody.address === address);
}


export function getTransferAuthorityAddress(programId: Address = ADRENA_PROGRAM_ADDRESS) {
    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("transfer_authority")],
    });
}

export function getCortexPda(programId: Address = ADRENA_PROGRAM_ADDRESS) {
    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("cortex")],
    });
}

export function findCustodyAddress(mainPool: Address, mint: Address, programId: Address = ADRENA_PROGRAM_ADDRESS) {
    
    const encoder = getAddressEncoder();

    const encodedMainPool = encoder.encode(mainPool);
    const encodedMint = encoder.encode(mint);
    
    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("custody"), encodedMainPool, encodedMint],
    });
}

export function findCustodyTokenAccountAddress(mainPool: Address, mint: Address, programId: Address = ADRENA_PROGRAM_ADDRESS) {
    const encoder = getAddressEncoder();

    const encodedMainPool = encoder.encode(mainPool);
    const encodedMint = encoder.encode(mint);

    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("custody_token_account"), encodedMainPool, encodedMint],
    });
}


  export function findPositionAddress(
    mainPool: Address,
    owner: Address,
    custody: Address,
    side: "long" | "short",
    programId: Address = ADRENA_PROGRAM_ADDRESS
  ) {
    const encoder = getAddressEncoder();
    const encodedMainPool = encoder.encode(mainPool);
    const encodedOwner = encoder.encode(owner);
    const encodedCustody = encoder.encode(custody);

    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("position"), encodedOwner, encodedMainPool, encodedCustody, Buffer.from([{
            long: 1,
            short: 2,
          }[side],
        ])],
    });
  }


export async function getLimitOrderBookPda(wallet: Address, programId: Address = ADRENA_PROGRAM_ADDRESS) {

    const mainPool = (await getPoolPda('main-pool', programId))[0];
    const encoder = getAddressEncoder();

    const encodedWallet = encoder.encode(wallet);
    const encodedMainPool = encoder.encode(mainPool);

    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("limit_order_book"), encodedWallet, encodedMainPool],
    });
}


export async function getCollateralEscrowPda(wallet: Address, collateralMint: Address, programId: Address = ADRENA_PROGRAM_ADDRESS) {
    const encoder = getAddressEncoder();

    const encodedWallet = encoder.encode(wallet);
    const encodedCollateralMint = encoder.encode(collateralMint);
    const mainPool = (await getPoolPda('main-pool', programId))[0];
    const encodedMainPool = encoder.encode(mainPool);

    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("escrow_account"), encodedWallet, encodedMainPool, encodedCollateralMint],
    });
}

export async function accountExists(account: Address, rpc: Rpc<SolanaRpcApi>) {
    const balance = await rpc.getBalance(account).send();
    return balance.value > 0;
}


export function hexStringToByteArray(hexString: string): number[] {
    // Remove '0x' prefix if present
    const cleanHex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;
  
    // Ensure the hex string is 128 characters (64 bytes)
    if (cleanHex.length !== 128) {
      throw new Error('Hex string must be 128 characters long (64 bytes)');
    }
  
    // Convert hex string to byte array
    const byteArray: number[] = [];
    for (let i = 0; i < cleanHex.length; i += 2) {
      const byte = parseInt(cleanHex.slice(i, i + 2), 16);
      if (isNaN(byte)) {
        throw new Error('Invalid hex string');
      }
      byteArray.push(byte);
    }
  
    return byteArray;
  }

  // get oracle pda
  export function getOraclePda(programId: Address = ADRENA_PROGRAM_ADDRESS) {
    return getProgramDerivedAddress({
        programAddress: programId,
        seeds: [Buffer.from("oracle")],
    });
  }
