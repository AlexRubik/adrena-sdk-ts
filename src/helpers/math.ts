/**
 * Applies slippage to a value
 * @param amount The base amount as a bigint
 * @param percentage The slippage percentage (e.g., -2 for -2%, 5 for 5%)
 * @returns The amount adjusted for slippage
 */
export function applySlippage(amount: bigint, percentage: number): bigint {
    // Determine if we're applying negative or positive slippage
    const isNegative = percentage < 0;
    
    // Convert percentage to absolute value and scale for precision
    // Multiply by 10_000 to handle up to 4 decimal places
    const percentageScaled = BigInt(Math.abs(Math.round(percentage * 10_000)));
    
    // Calculate the delta (amount to adjust)
    // We divide by 10_000 * 100 to convert back from scaled percentage
    const delta = (amount * percentageScaled) / BigInt(10_000 * 100);
    
    // Apply the adjustment based on whether it's negative or positive slippage
    return isNegative ? amount - delta : amount + delta;
  }