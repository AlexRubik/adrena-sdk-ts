import { Account, Address, IInstruction, TransactionSigner } from "@solana/kit";
import { Rpc } from "@solana/kit";
import { PrincipalToken } from "../types";
import { SolanaRpcApi } from "@solana/kit";
import { getOpenOrIncreasePositionWithSwapShortInstruction } from "../../codama-generated/instructions/openOrIncreasePositionWithSwapShort";
import { CollateralToken } from "../types";
import { fetchPoolUtil, getCortexPda, getCustodyByMint, getTransferAuthorityAddress, loadCustodies } from "../helpers/utils";
import { findCustodyAddress } from "../helpers/utils";
import { findCustodyTokenAccountAddress } from "../helpers/utils";
import { BPS, PRICE_DECIMALS, TOKEN_ADDRESSES, PRINCIPAL_ADDRESSES, ADRENA_PROGRAM_ID, TOKEN_PROGRAM_ID, SYSTEM_PROGRAM_ID } from "../helpers/constants";
import { getPythPrice } from "../helpers/pyth";
import { findPositionAddress } from "../helpers/utils";
import { Custody } from "../../codama-generated/accounts/custody";
import { findATAAddress } from "../helpers/tokenHelpers";
import { createAssociatedTokenAccountIx } from "../helpers/tokenHelpers";
import { ADRENA_PROGRAM_ADDRESS } from "../../codama-generated/programs/adrena";

export async function getOpenShortIxs(
    owner: TransactionSigner,
    principalToken: PrincipalToken = 'JITOSOL',
    collateralToken: CollateralToken = 'USDC',
    normalCollateralAmount: number,
    normalLeverage: number,
    rpc: Rpc<SolanaRpcApi>
): Promise<{
    ixns: IInstruction[],
    owner: TransactionSigner,
    cortex: Address,
    pool: Address,
    positionAddress: Address,
    principalCustodyObj: Account<Custody>
}> {

    const ixns: IInstruction[] = [];

    const bigIntCollateralAmount = BigInt(Math.floor(normalCollateralAmount * 10 ** TOKEN_ADDRESSES[collateralToken].decimals));
    const bigIntLeverage = Math.floor(normalLeverage * BPS);

    const collateralMint = TOKEN_ADDRESSES[collateralToken].address; // token to be used as collateral
    const principalMint = PRINCIPAL_ADDRESSES[principalToken].address; // token we want to trade / open a position for

    const ataIxForPrincipal = await createAssociatedTokenAccountIx(
        owner.address, 
        owner.address, 
        principalMint, 
        rpc
    );
    if (!ataIxForPrincipal.ataExists && ataIxForPrincipal.ix) {
        ixns.push(ataIxForPrincipal.ix);
    }

    const fundingAccount = (await findATAAddress(owner.address, collateralMint))[0]; // token acc for the trader's collateral mint
    const collateralAccount = (await findATAAddress(owner.address, collateralMint))[0]; // token acc for the trader's collateral mint


    const pool = await fetchPoolUtil('main-pool', ADRENA_PROGRAM_ADDRESS, rpc);
    const poolPda = pool.address;

    const transferAuthAddress = (await getTransferAuthorityAddress())[0];
    const cortexPda = (await getCortexPda())[0];

    const custodies = await loadCustodies(pool.data, rpc);

    // receiving custody -----------------------------------------------------------------------
    const receivingCustodyAddress = (await findCustodyAddress(poolPda, collateralMint))[0];
    const receivingCustodyObj = getCustodyByMint(custodies, collateralMint);
    // throw if null
    if (!receivingCustodyObj) {
        throw new Error("No receiving custody found");
    }
    const receivingCustodyOracle = receivingCustodyObj.data.oracle;
    const receivingCustodyTokenAccount = (await findCustodyTokenAccountAddress(poolPda, collateralMint))[0];

    // principal custody -----------------------------------------------------------------------
    const principalCustodyAddress = (await findCustodyAddress(poolPda, principalMint))[0];
    const principalCustodyObj = getCustodyByMint(custodies, principalMint);

    // throw if null
    if (!principalCustodyObj) {
        throw new Error("No principal custody found");
    }
    const principalCustodyTradeOracle = principalCustodyObj.data.tradeOracle;
    const principalCustodyTokenAccount = (await findCustodyTokenAccountAddress(poolPda, principalMint))[0];

    // collateral custody -----------------------------------------------------------------------
    const collateralCustodyAddress = (await findCustodyAddress(poolPda, collateralMint))[0];
    const collateralCustodyObj = getCustodyByMint(custodies, collateralMint);

    // throw if null
    if (!collateralCustodyObj) {
        throw new Error("No collateral custody found");
    }
    const collateralCustodyOracle = collateralCustodyObj.data.oracle;
    const collateralCustodyTokenAccount = (await findCustodyTokenAccountAddress(poolPda, collateralMint))[0];

    // position -----------------------------------------------------------------------
    const positionAddress = (await findPositionAddress(poolPda, owner.address, principalCustodyAddress, "short"))[0];

    const price = await getPythPrice(principalToken === "JITOSOL" ? "SOL" : principalToken); // default is solana price

    const priceWithSlippage = price * 0.997; // 0.3% slippage

    const priceAsBigInt = BigInt(Math.floor(priceWithSlippage * 10 ** PRICE_DECIMALS));

    const openShortIx = getOpenOrIncreasePositionWithSwapShortInstruction(
        {
            owner: owner,
            payer: owner,
            fundingAccount: fundingAccount,
            collateralAccount: collateralAccount,
            receivingCustody: receivingCustodyAddress,
            receivingCustodyOracle: receivingCustodyOracle,
            receivingCustodyTokenAccount: receivingCustodyTokenAccount,
            principalCustody: principalCustodyAddress,
            principalCustodyTradeOracle: principalCustodyTradeOracle,
            principalCustodyTokenAccount: principalCustodyTokenAccount,
            collateralCustody: collateralCustodyAddress,
            collateralCustodyOracle: collateralCustodyOracle,
            collateralCustodyTokenAccount: collateralCustodyTokenAccount,
            transferAuthority: transferAuthAddress,
            cortex: cortexPda,
            pool: poolPda,
            position: positionAddress,
            systemProgram: SYSTEM_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            adrenaProgram: ADRENA_PROGRAM_ID,
            params: {
                price: priceAsBigInt,
                collateral: bigIntCollateralAmount,
                leverage: bigIntLeverage,
            }
        }
    );

    ixns.push(openShortIx);

    return {
        ixns,
        owner,
        cortex: cortexPda,
        pool: poolPda,
        positionAddress,
        principalCustodyObj
    };
}