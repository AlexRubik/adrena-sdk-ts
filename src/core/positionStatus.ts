import { Address, Rpc, SolanaRpcApi, TransactionSigner } from "@solana/kit";
import { PRICE_DECIMALS } from "../helpers/constants";
import { getPythPrice } from "../helpers/pyth";
import { formatScaledValue } from "../helpers/math";
import { calculateTotalInterest, getPositionUtil } from "../helpers/position";
import { PrincipalToken } from "../types";


export type GetPositionStatusParams = {
    wallet: TransactionSigner;
    rpc: Rpc<SolanaRpcApi>;
    principalToken: PrincipalToken;
    // collateralToken: CollateralToken;
    // pool: Account<Pool, string>;
    // custodies: Account<Custody, string>[];
    positionAddress: Address<string>;
}

export async function getPositionStatus(params: GetPositionStatusParams) {


    const position = await getPositionUtil(params.rpc, params.positionAddress);
    const sideInt = position.position.data.side;
    const side = sideInt === 1 ? 'long' : 'short';

    // updateTime: 1745422833n
    const updateTimeUnixSeconds = Number(position.position.data.updateTime);
    const openTimeUnixSeconds = Number(position.position.data.openTime);
    const dateTimeOpen = new Date(openTimeUnixSeconds * 1000);
    const updateTime = new Date(updateTimeUnixSeconds * 1000);


    const normalizedPrice = Number(position.position.data.price) / 10 ** PRICE_DECIMALS;
    const normalizedExitFee = Number(position.position.data.exitFeeUsd) / 10 ** 6;
    //const normalizedUnrealizedInterestUsd = Number(position.position.data.unrealizedInterestUsd) / 10 ** 6;
    const normalizedSizeUsd = Number(position.position.data.sizeUsd) / 10 ** 6;
    const assetAmount = normalizedSizeUsd / normalizedPrice;

    let priceId = params.principalToken as any;
    if (priceId === "JITOSOL") {
        priceId = "SOL";
    } else if (priceId === "WBTC") {
        priceId = "BTC";
    }

    const pythPrice = await getPythPrice(priceId);
    
    // Calculate PnL based on position side
    let preFeePnl;
    if (side === 'long') {
        // For longs, use absolute value of (entry size - current value)
        preFeePnl = Math.abs(normalizedSizeUsd - assetAmount * pythPrice);
    } else {
        // For shorts, keep the calculation as is
        preFeePnl = (normalizedSizeUsd - assetAmount * pythPrice);
    }
    
    const totalInterest = calculateTotalInterest(position.position, position.collateralCustody);

    const formattedInterest = formatScaledValue(totalInterest, position.collateralCustody.data.decimals);

    const pnl = preFeePnl - normalizedExitFee - Number(formattedInterest);

    return {
        positionData: position.position.data,
        entryPrice: normalizedPrice,
        pythPrice,
        sizeUsd: normalizedSizeUsd,
        totalInterest: formattedInterest,
        exitFee: normalizedExitFee,
        assetAmount,
        preFeePnl,
        pnl,
        principalCustodyMint: position.principalCustody?.data.mint,
        collateralCustodyMint: position.collateralCustody?.data.mint,
        openTime: dateTimeOpen,
        updateTime
    };
}


