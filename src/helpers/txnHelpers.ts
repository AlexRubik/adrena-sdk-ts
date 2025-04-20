import { Address, getComputeUnitEstimateForTransactionMessageFactory, SolanaRpcApi } from "@solana/kit";

import { 
    GetMultipleAccountsApi,
    Rpc,
    fetchJsonParsedAccounts,
    AddressesByLookupTableAddress,
    IAccountLookupMeta
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