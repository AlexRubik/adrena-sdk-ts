// Adrena API Documentation: https://datapi.adrena.xyz/swagger/static/index.html

import { AdrenaApi, SortField, SortOrder } from "adrena-sdk-ts";


export async function getPositionsApiExample() {

    const adrenaApi = new AdrenaApi();
    const userWalletAddress = "9UkNMjAZCnrWdcQLUiF7BaRPnkYsbt2w1HX8ziD9ouAu";

    const positions = await adrenaApi.getPositions({
        user_wallet: userWalletAddress, // user's wallet address
        sort: SortOrder.DESC, // sort by entry date, most recent first
        sortField: SortField.ENTRY_DATE,
        limit: 3 // limit to 3 positions
    });

    // get 3 most recent positions
    const recentPositions = positions.data.slice(0, 3);

    console.log(recentPositions);
}

// getPositionsApiExample();

// example object in the array of positions:

// {
//     position_id: 80229,
//     user_id: 163572,
//     symbol: 'Bonk',
//     token_account_mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
//     side: 'short',
//     status: 'open',
//     pubkey: '9UkNMjAZCnrWdcQLUiF7BaRPnkYsbt2w1HX8ziD9ouAu',
//     entry_price: 0.0000187107,
//     exit_price: 0,
//     entry_size: 868.663333,
//     increase_size: 0,
//     exit_size: 0,
//     pnl: 0,
//     entry_leverage: 55.037,
//     lowest_leverage: 55.037,
//     entry_date: '2025-04-26T16:18:38.000Z',
//     exit_date: null,
//     fees: 0,
//     borrow_fees: 0,
//     exit_fees: 0,
//     last_ix: '2Pz6ytYRgrYdnMyCzwDtUvcL4ZVYXJXFWKw5daTecZfKVoXxjpExqbfx8N61qwkBPMbyx6Pzw1N17pSahLw4yKJu',
//     entry_collateral_amount: 16.999282,
//     collateral_amount: 16.999282,
//     closed_by_sl_tp: false,
//     volume: 0,
//     duration: 0,
//     pnl_volume_ratio: 0,
//     points_pnl_volume_ratio: 0,
//     points_duration: 0,
//     close_size_multiplier: 0,
//     points_mutations: 0,
//     total_points: 0,
//     created_at: '2025-04-23T16:01:50.800Z',
//     updated_at: null
//   }