// Export entire directories using barrel files
export * from './helpers';
export * from './adrena-api';
export * from './clients';
export * from './instructions';
export * from './core';

// Constants and types
export * from './types';

import { runOpenMarketLongExample } from './examples/openMarketLongExample';
import { runOpenMarketShortExample } from './examples/openMarketShortExample';

// Main entry point function
export async function main() {
    // This can be empty or contain initialization logic
    console.log('Adrena SDK initialized');

}

main();
