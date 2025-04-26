import { Address, createSolanaRpc, getComputeUnitEstimateForTransactionMessageFactory, Signature, SolanaRpcApi } from "@solana/kit";

import { 
    GetMultipleAccountsApi,
    Rpc,
    fetchJsonParsedAccounts,
    AddressesByLookupTableAddress
} from "@solana/kit";

interface FetchedAddressLookup {
    address: string;
    data: {
        addresses: Address[];
    };
}

export async function fetchLookupTables(
    lookupTableAddresses: Address[],
    rpc: Rpc<GetMultipleAccountsApi>,
): Promise<AddressesByLookupTableAddress> {
    if (lookupTableAddresses.length === 0) {
        return {};
    }

    const fetchedLookupTables = await fetchJsonParsedAccounts<FetchedAddressLookup[]>(
        rpc,
        lookupTableAddresses,
    );

    return fetchedLookupTables.reduce<AddressesByLookupTableAddress>((acc, lookup: any) => {
        // console.log("Lookup table addresses:", lookup.data.addresses);
        return {
            ...acc,
            [lookup.address]: lookup.data.addresses,
        };
    }, {});
}

export async function getCUEst(
    transactionMessage: any,
    rpc: Rpc<SolanaRpcApi>,
    // @ts-ignore
    defaultUnits: number = 220000
) {
    try {
        const getComputeUnitEstimateForTransactionMessage = getComputeUnitEstimateForTransactionMessageFactory({
            rpc: rpc
        });

        let computeUnitsEstimate = await getComputeUnitEstimateForTransactionMessage(transactionMessage) + 20_000;
        computeUnitsEstimate = (computeUnitsEstimate < 1000) ? 1000 : Math.ceil(computeUnitsEstimate * 1);

        console.log("Compute units estimate:", computeUnitsEstimate);
        
        return computeUnitsEstimate;
    } catch (error: any) {
        console.error('Error getting compute unit estimate:');
        console.error('Error code:', error?.context?.__code);
        console.error('Units consumed:', error?.context?.unitsConsumed);
        
        if (error?.cause?.InstructionError) {
            const [instructionIndex, errorDetails] = error.cause.InstructionError;
            console.error('Failed at instruction:', instructionIndex);
            // Convert BigInts to strings before JSON stringify
            const serializedDetails = JSON.stringify(errorDetails, (_, value) =>
                typeof value === 'bigint' ? value.toString() : value
            , 2);
            console.error('Error details:', serializedDetails);
        }

        // Convert BigInts to strings in full error object
        const serializedError = JSON.stringify(error, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        , 2);
        console.error('Full error object:', serializedError);
        
        throw error;
    }
}

/**
 * Waits for a transaction to be confirmed
 * @param signature Transaction signature to check
 * @param rpc RPC connection to use
 * @param maxAttempts Maximum number of attempts (default 14)
 * @param intervalSeconds Time between attempts in seconds (default 5)
 * @returns True if confirmed, false if max attempts reached
 */
export async function checkTransactionConfirmed(
    signature: Signature,
    rpc: Rpc<SolanaRpcApi>,
    maxAttempts: number = 6,
    intervalSeconds: number = 5
): Promise<boolean> {
    let attempts = 0;
    const UNIVERSAL_RPC = 'https://api.mainnet-beta.solana.com';

    while (attempts < maxAttempts) {
        try {
            // Use universal RPC on 7th attempt
            const currentRpc = attempts === 6 ? 
                createSolanaRpc(UNIVERSAL_RPC) : 
                rpc;

            const statuses = await currentRpc.getSignatureStatuses([signature]).send();
            console.log(`Transaction status (attempt ${attempts + 1}/${maxAttempts}${attempts === 6 ? ' using universal RPC' : ''}):`, statuses.value);
            
            if (statuses.value[0]?.confirmationStatus === 'confirmed' || statuses.value[0]?.confirmationStatus === 'finalized') {
                return true;
            }
        } catch (error) {
            console.error(`Error checking status (attempt ${attempts + 1}/${maxAttempts}):`, error);
        }

        attempts++;
        if (attempts < maxAttempts) {
            console.log(`Waiting ${intervalSeconds} seconds before next check...`);
            await new Promise(resolve => setTimeout(resolve, intervalSeconds * 1000));
        }
    }

    console.log(`Transaction not confirmed after ${maxAttempts} attempts`);
    return false;
}