import { IInstruction } from "@solana/kit";
import { getInitLimitOrderBookInstruction } from "../../codama-generated/instructions/initLimitOrderBook";
import { accountExists, findCustodyAddress, findPositionAddress, getCollateralEscrowPda, getCortexPda, getLimitOrderBookPda, getPoolPda, getTransferAuthorityAddress } from "../helpers/utils";
import { ASSOCIATED_TOKEN_PROGRAM_ID, BPS, PRICE_DECIMALS, PRINCIPAL_ADDRESSES, TOKEN_ADDRESSES } from "../helpers/constants";
import { getAddLimitOrderInstruction } from "../../codama-generated";
import { createAssociatedTokenAccountIx, findATAAddress } from "../helpers/tokenHelpers";
import { AddLimitOrderParams } from "../core/addLimitOrder";
import { hasUserProfile } from "../helpers/userProfile";
import { buildInitUserProfileIx } from "../helpers/userProfile";

export async function getAddLimitOrderIxs(params: AddLimitOrderParams) {
    const principalMintAddress = PRINCIPAL_ADDRESSES[params.principalToken];
    const collateralMintAddress = TOKEN_ADDRESSES[params.collateralToken];
    console.log("principalMintAddress:", principalMintAddress);
    console.log("collateralMintAddress:", collateralMintAddress);

    const transferAuthority = (await getTransferAuthorityAddress())[0];
    console.log("transferAuthority:", transferAuthority);
    
    const cortex = (await getCortexPda())[0];
    console.log("cortex:", cortex);
    
    const pool = (await getPoolPda())[0];
    console.log("pool:", pool);
    
    const custody = (await findCustodyAddress(pool, principalMintAddress.address))[0];
    console.log("custody:", custody);
    
    const collateralCustody = (await findCustodyAddress(pool, collateralMintAddress.address))[0];
    console.log("collateralCustody:", collateralCustody);
    
    const limitOrderBook = (await getLimitOrderBookPda(params.wallet.address))[0];
    console.log("limitOrderBook:", limitOrderBook);
    
    const collateralEscrow = (await getCollateralEscrowPda(params.wallet.address, collateralMintAddress.address))[0];
    console.log("collateralEscrow:", collateralEscrow);
    
    const fundingAccount = (await findATAAddress(params.wallet.address, collateralMintAddress.address))[0];
    console.log("fundingAccount:", fundingAccount);
    
    const limitOrderBookPdaExists = await accountExists(limitOrderBook, params.rpc);
    console.log("limitOrderBookPdaExists:", limitOrderBookPdaExists);

    const positionAddress = (await findPositionAddress(
        pool,
        params.wallet.address,
        custody,
        params.side
    ))[0];

    const ixs: IInstruction[] = [];

    const ataIxForPrincipal = await createAssociatedTokenAccountIx(
        params.wallet.address, 
        params.wallet.address, 
        principalMintAddress.address, 
        params.rpc
    );
    if (!ataIxForPrincipal.ataExists && ataIxForPrincipal.ix) {
        console.log("Creating ATA for principal", ataIxForPrincipal);
        ixs.push(ataIxForPrincipal.ix);
    }else{
        console.log("ATA for principal already exists", ataIxForPrincipal);
    }

    const hasProfile = await hasUserProfile(params.wallet.address, params.rpc);


    if (!hasProfile || !hasProfile.exists) {
        console.log("Creating profile");
        // wallet has no profile, get instruction to create one
        const initProfileIx = await buildInitUserProfileIx(params.wallet);
        ixs.push(initProfileIx);
    }

    if (!limitOrderBookPdaExists) {
        console.log("Creating limit order book");
        ixs.push(getInitLimitOrderBookInstruction({
            owner: params.wallet,
            pool,
            limitOrderBook
        }));
    }else{
        console.log("Limit order book already exists");
    }

    const addLimitOrderIx = getAddLimitOrderInstruction({
        owner: params.wallet,
        fundingAccount,
        transferAuthority,
        cortex,
        pool,
        limitOrderBook,
        collateralEscrow,
        collateralCustodyMint: collateralMintAddress.address,
        custody: custody,
        collateralCustody: collateralCustody,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        leverage: Math.round(params.leverage * BPS),
        side: params.side === "long" ? 1 : 2,
        amount: BigInt(Math.round(params.collateralAmount * 10 ** collateralMintAddress.decimals)),
        triggerPrice: BigInt(Math.round(params.triggerPrice * 10 ** PRICE_DECIMALS)),
        limitPrice: params.limitPrice ? BigInt(Math.round(params.limitPrice * 10 ** PRICE_DECIMALS)) : null,
    })

    if (addLimitOrderIx) {
        console.log("Creating add limit order");
        ixs.push(addLimitOrderIx);
    }




    return {
        ixs: ixs,
        positionAddress: positionAddress
    };
}