import { Account, Address, Rpc, SolanaRpcApi } from "@solana/kit";
import { ADRENA_PROGRAM_ADDRESS, Custody, fetchPosition, Position } from "../../codama-generated";
import { fetchPoolUtil, getCustodyByAddress } from "./utils";
import { loadCustodies } from "./utils";
import { getCustodyByMint } from "./utils";
import BN from 'bn.js';

export async function getPositionUtil(rpc: Rpc<SolanaRpcApi>, positionAddress: Address) {
    const position = await fetchPosition(rpc, positionAddress);

    const pool = await fetchPoolUtil('main-pool', ADRENA_PROGRAM_ADDRESS, rpc);
    const custodies = await loadCustodies(pool.data, rpc);
    const principalCustody = getCustodyByAddress(custodies, position.data.custody);
    const collateralCustody = getCustodyByAddress(custodies, position.data.collateralCustody);

    if (!principalCustody) {
        throw new Error("Principal custody not found");
    }

    if (!collateralCustody) {
        throw new Error("Collateral custody not found");
    }

    return {
        position,
        principalCustody,
        collateralCustody,
    };
}

/**
 * Calculates the total interest for a position using BN.js for accurate big number calculations
 * @param position The position object
 * @param collateralCustody The collateral custody object
 * @returns The total interest in USD (as a BN object, scaled by 10^6)
 */
export function calculateTotalInterest(position: Account<Position>, collateralCustody: Account<Custody>) {
    const currentTime = new BN(Math.floor(Date.now() / 1000));
    
    // Handle 128-bit integers with high and low parts
    const POW_2_64 = new BN(2).pow(new BN(64));
    
    // Calculate cumulative interest for the custody
    const cumulativeInterestLow = new BN(collateralCustody.data.borrowRateState.cumulativeInterest.low.toString());
    const cumulativeInterestHigh = new BN(collateralCustody.data.borrowRateState.cumulativeInterest.high.toString());
    let cumulativeInterest = cumulativeInterestLow.add(cumulativeInterestHigh.mul(POW_2_64));
    
    // Check if we need to update the cumulative interest based on time elapsed
    const lastUpdate = new BN(collateralCustody.data.borrowRateState.lastUpdate.toString());
    if (currentTime.gt(lastUpdate)) {
        const timeDiff = currentTime.sub(lastUpdate);
        const currentRate = new BN(collateralCustody.data.borrowRateState.currentRate.toString());
        const newCumulativeInterest = timeDiff.mul(currentRate).div(new BN(3600));
        
        cumulativeInterest = cumulativeInterest.add(newCumulativeInterest);
    }
    
    // Calculate the cumulative interest snapshot from the position
    const cumulativeInterestSnapshotLow = new BN(position.data.cumulativeInterestSnapshot.low.toString());
    const cumulativeInterestSnapshotHigh = new BN(position.data.cumulativeInterestSnapshot.high.toString());
    const cumulativeInterestSnapshot = cumulativeInterestSnapshotLow.add(
        cumulativeInterestSnapshotHigh.mul(POW_2_64)
    );
    
    // Calculate position borrow fee
    const positionInterest = cumulativeInterest.gt(cumulativeInterestSnapshot) 
        ? cumulativeInterest.sub(cumulativeInterestSnapshot) 
        : new BN(0);
    
    // Calculate total interest in USD
    const borrowSizeUsd = new BN(position.data.borrowSizeUsd.toString());
    const totalInterestUsd = positionInterest.mul(borrowSizeUsd).div(new BN(1000000000));
    
    // Add unrealized interest
    const unrealizedInterestUsd = new BN(position.data.unrealizedInterestUsd.toString());
    return totalInterestUsd.add(unrealizedInterestUsd);
}

/**
 * Wrapper function that returns the total interest as a number for easier display
 * @param position The position object
 * @param collateralCustody The collateral custody object
 * @returns The total interest in USD as a number (scaled by 10^6)
 */
export function calculateTotalInterestAsNumber(position: Account<Position>, collateralCustody: Account<Custody>) {
    const bnResult = calculateTotalInterest(position, collateralCustody);
    return Number(bnResult.toString());
}