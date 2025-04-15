import { Address, address, IInstruction, Rpc, SolanaRpcApi, TransactionSigner } from '@solana/kit';
import { 
    getOpenOrIncreasePositionWithSwapLongInstruction,
    OpenOrIncreasePositionWithSwapLongInstruction
} from '../../codama-generated/instructions/openOrIncreasePositionWithSwapLong';
import { ADRENA_PROGRAM_ID, BPS, JITOSOL_TOKEN_MINT, PRICE_DECIMALS, SYSTEM_PROGRAM_ID, TOKEN_ADDRESSES, TOKEN_PROGRAM_ID, USDC_TOKEN_MINT } from '../helpers/constants';
import { fetchPoolUtil, findCustodyAddress, findCustodyTokenAccountAddress, findPositionAddress, getCortexPda, getCustodyByMint, getTransferAuthorityAddress, loadCustodies } from '../helpers/utils';
import { createAssociatedTokenAccountIx, findATAAddress } from '../helpers/tokenHelpers';
import { applySlippage } from '../helpers/math';
import { getPythPrice } from '../helpers/pyth';

export async function openSolLong(
    owner: TransactionSigner,
    collateralToken: keyof typeof TOKEN_ADDRESSES = 'USDC',
    normalCollateralAmount: number, // how we normally percieve
    normalLeverage: number,
    rpc: Rpc<SolanaRpcApi>
) {

    const ixns: IInstruction[] = [];

    const bigIntCollateralAmount = BigInt(Math.floor(normalCollateralAmount * 10 ** TOKEN_ADDRESSES[collateralToken].decimals));
    const bigIntLeverage = Math.floor(normalLeverage * BPS);

    const collateralMint = TOKEN_ADDRESSES[collateralToken].address; // token to be used as collateral
    const principalMint = JITOSOL_TOKEN_MINT; // token we want to trade / open a position for

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
    const collateralAccount = (await findATAAddress(owner.address, principalMint))[0]; // token acc for the trader's principal mint


    const pool = await fetchPoolUtil('main-pool');
    const poolPda = pool.address;

    const transferAuthAddress = (await getTransferAuthorityAddress())[0];
    const cortexPda = (await getCortexPda())[0];

    const custodies = await loadCustodies(pool.data);

    // receiving custody -----------------------------------------------------------------------
    const receivingCustodyAddress = (await findCustodyAddress(poolPda, collateralMint))[0];
    const receivingCustodyObj = getCustodyByMint(custodies, collateralMint)//.data.oracle;
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
    const principalCustodyOracle = principalCustodyObj.data.oracle;
    const principalCustodyTradeOracle = principalCustodyObj.data.tradeOracle;
    const principalCustodyTokenAccount = (await findCustodyTokenAccountAddress(poolPda, principalMint))[0];

    // position -----------------------------------------------------------------------
    const positionAddress = (await findPositionAddress(poolPda, owner.address, principalCustodyAddress, "long"))[0];

    const price = await getPythPrice();

    const priceWithSlippage = price * 1.003; // 0.3% slippage

    const priceAsBigInt = BigInt(Math.floor(priceWithSlippage * 10 ** PRICE_DECIMALS));
    

    const openLongIx = getOpenOrIncreasePositionWithSwapLongInstruction(
        {
            owner: owner,
            payer: owner,
            fundingAccount: fundingAccount,
            collateralAccount: collateralAccount,
            receivingCustody: receivingCustodyAddress,
            receivingCustodyOracle: receivingCustodyOracle,
            receivingCustodyTokenAccount: receivingCustodyTokenAccount,
            principalCustody: principalCustodyAddress,
            principalCustodyOracle: principalCustodyOracle,
            principalCustodyTradeOracle: principalCustodyTradeOracle,
            principalCustodyTokenAccount: principalCustodyTokenAccount,
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
        });

    ixns.push(openLongIx);

        return ixns;


}

