import BN from "bn.js";

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

/**
 * Formats a scaled integer value as a decimal string
 * @param value The scaled integer value (as a bigint, BN, or string)
 * @param decimals The number of decimal places (e.g., 6 for values scaled by 10^6)
 * @returns A formatted string with the decimal point in the correct position
 */
export function formatScaledValue(value: bigint | BN | string, decimals: number): string {
    // Convert to string if it's not already
    const valueString = typeof value === 'string' ? value : value.toString();
    
    // If the string is less than 'decimals' characters, pad it with leading zeros
    const paddedString = valueString.padStart(decimals + 1, '0');
    
    // Insert decimal point 'decimals' places from the right
    const decimalIndex = paddedString.length - decimals;
    
    // Handle special case where the result would be "0."
    if (decimalIndex === 0) {
        return '0.' + paddedString;
    }
    
    // Insert the decimal point
    const formattedValue = 
        paddedString.substring(0, decimalIndex) + '.' + paddedString.substring(decimalIndex);
    
    return formattedValue;
}

/**
 * Formats a scaled integer value as a decimal number
 * @param value The scaled integer value (as a bigint, BN, or string)
 * @param decimals The number of decimal places (e.g., 6 for values scaled by 10^6)
 * @returns A number with the correct decimal value
 */
export function parseScaledValue(value: bigint | BN | string, decimals: number = 6): number {
    return parseFloat(formatScaledValue(value, decimals));
}