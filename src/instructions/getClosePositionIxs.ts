import { IInstruction, Rpc, SolanaRpcApi, TransactionSigner } from "@solana/kit";
import { ADRENA_PROGRAM_ADDRESS, getClosePositionLongInstruction, getClosePositionShortInstruction } from "../../codama-generated";
import { fetchPoolUtil, findCustodyTokenAccountAddress, findPositionAddress, getCortexPda, getCustodyByMint, getPoolPda, getTransferAuthorityAddress, loadCustodies } from "../helpers/utils";
import { CollateralToken, PrincipalToken } from "../types";
import { DEV_PDA, PRICE_DECIMALS, PRINCIPAL_ADDRESSES } from "../helpers/constants";
import { createAssociatedTokenAccountIx } from "../helpers/tokenHelpers";
import { getPositionUtil } from "../helpers/position";
import { getPythPrice } from "../helpers/pyth";

export type ClosePositionLongParams = {
    wallet: TransactionSigner,
    rpc: Rpc<SolanaRpcApi>,
    principalToken: PrincipalToken,
    price?: number
}

export type ClosePositionShortParams = {
    wallet: TransactionSigner,
    rpc: Rpc<SolanaRpcApi>,
    principalToken: PrincipalToken,
    collateralToken: CollateralToken,
    price?: number
}


export async function getClosePositionLongIxs(params: ClosePositionLongParams) {

    const ixs: IInstruction[] = [];

    const principalTokenMint = PRINCIPAL_ADDRESSES[params.principalToken];
    const ataIxForPrincipal = await createAssociatedTokenAccountIx(
        params.wallet.address, 
        params.wallet.address, 
        principalTokenMint.address, 
        params.rpc
    );
    if (!ataIxForPrincipal.ataExists && ataIxForPrincipal.ix) {
        ixs.push(ataIxForPrincipal.ix);
    }

    const pool = await fetchPoolUtil('main-pool', ADRENA_PROGRAM_ADDRESS, params.rpc);
    const custodies = await loadCustodies(pool.data, params.rpc);
    const principalCustody = getCustodyByMint(custodies, principalTokenMint.address);
    if (!principalCustody) {
        throw new Error("No custody found");
    }

    const principalCustodyOracle = principalCustody.data.oracle;
    const principalCustodyTradeOracle = principalCustody.data.tradeOracle;
    const principalCustodyTokenAccount = (await findCustodyTokenAccountAddress(pool.address, principalTokenMint.address))[0];

    const cortexPda = (await getCortexPda())[0];
    const transferAuthAddress = (await getTransferAuthorityAddress())[0];
    const poolPda = pool.address;
    const positionAddress = (await findPositionAddress(
        poolPda,
        params.wallet.address,
        principalCustody.address,
        "long"
    ))[0];

    let priceId = params.principalToken as any;
    if (priceId === "JITOSOL") {
        priceId = "SOL";
    } else if (priceId === "WBTC") {
        priceId = "BTC";
    }

    // price with slippage, so for a long, if current price is 100, and you want to account for slippage of 1%, 
    // then make close price 99
    const closePrice = params.price ? params.price : await getPythPrice(priceId);

    const closeIx = getClosePositionLongInstruction(
        {
            caller: params.wallet,
            owner: params.wallet.address,
            cortex: cortexPda,
            transferAuthority: transferAuthAddress,
            position: positionAddress,
            pool: poolPda,
            custody: principalCustody.address,
            custodyOracle: principalCustodyOracle,
            custodyTradeOracle: principalCustodyTradeOracle,
            custodyTokenAccount: principalCustodyTokenAccount,
            receivingAccount: ataIxForPrincipal.associatedAccount,
            adrenaProgram: ADRENA_PROGRAM_ADDRESS,
            price: closePrice ? BigInt(Math.round(closePrice * 10 ** PRICE_DECIMALS)) : null,
            referrerProfile: DEV_PDA,

            
        }
    )

    ixs.push(closeIx);

    return {
        ixs: ixs,
        positionAddress: positionAddress
    };
}

export async function getClosePositionShortIxs(params: ClosePositionShortParams) {

    const ixs: IInstruction[] = [];

    const collateralTokenMint = PRINCIPAL_ADDRESSES[params.collateralToken];
    const principalTokenMint = PRINCIPAL_ADDRESSES[params.principalToken];
    const ataIxForPrincipal = await createAssociatedTokenAccountIx(
        params.wallet.address, 
        params.wallet.address, 
        collateralTokenMint.address, 
        params.rpc
    );
    if (!ataIxForPrincipal.ataExists && ataIxForPrincipal.ix) {
        ixs.push(ataIxForPrincipal.ix);
    }

    const pool = await fetchPoolUtil('main-pool', ADRENA_PROGRAM_ADDRESS, params.rpc);
    const custodies = await loadCustodies(pool.data, params.rpc);
    const principalCustody = getCustodyByMint(custodies, principalTokenMint.address);
    if (!principalCustody) {
        throw new Error("No custody found");
    }
    const principalCustodyTradeOracle = principalCustody.data.tradeOracle;

    const collateralCustody = getCustodyByMint(custodies, collateralTokenMint.address);
    if (!collateralCustody) {
        throw new Error("No custody found");
    }

    const collateralCustodyOracle = collateralCustody.data.oracle;
    const collateralCustodyTokenAccount = (await findCustodyTokenAccountAddress(pool.address, collateralTokenMint.address))[0];

    const cortexPda = (await getCortexPda())[0];
    const transferAuthAddress = (await getTransferAuthorityAddress())[0];
    const poolPda = pool.address;
    const positionAddress = (await findPositionAddress(
        poolPda,
        params.wallet.address,
        principalCustody.address,
        "short"
    ))[0];

    let priceId = params.principalToken as any;
    if (priceId === "JITOSOL") {
        priceId = "SOL";
    } else if (priceId === "WBTC") {
        priceId = "BTC";
    }

    const closePrice = params.price ? params.price : await getPythPrice(priceId);
    
    const closeIx = getClosePositionShortInstruction(
        {
            caller: params.wallet,
            owner: params.wallet.address,
            cortex: cortexPda,
            transferAuthority: transferAuthAddress,
            position: positionAddress,
            pool: poolPda,
            collateralCustody: collateralCustody.address,
            collateralCustodyOracle: collateralCustodyOracle,
            collateralCustodyTokenAccount: collateralCustodyTokenAccount,
            custody: principalCustody.address,
            custodyTradeOracle: principalCustodyTradeOracle,
            receivingAccount: ataIxForPrincipal.associatedAccount,
            adrenaProgram: ADRENA_PROGRAM_ADDRESS,
            price: closePrice ? BigInt(Math.round(closePrice * 10 ** PRICE_DECIMALS)) : null,
            referrerProfile: DEV_PDA,

            
        }
    )

    ixs.push(closeIx);

    return {
        ixs: ixs,
        positionAddress: positionAddress
    };
}