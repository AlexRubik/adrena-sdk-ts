import BN from 'bn.js';

import {
    ChaosLabsPricesExtended,
    ChaosLabsPricesResponse,
} from '../types';
import { hexStringToByteArray } from '../helpers/utils';


// Useful to call Data API endpoints easily
export default class DataApiClient {
    // public static DATAPI_URL = "http://localhost:8080";
    public static DATAPI_URL = 'https://datapi.adrena.xyz';


    public static async getChaosLabsPrices(): Promise<ChaosLabsPricesExtended | null> {
        try {
            const response = await fetch(
                `${DataApiClient.DATAPI_URL}/last-trading-prices`,
            );

            if (!response.ok) {
                console.log('Api trading prices cannot be fetched');
                return null;
            }

            const apiBody = await response.json();

            const apiData: ChaosLabsPricesResponse | undefined = apiBody.data;

            if (typeof apiData === 'undefined' || !apiData)
                return null;

            return {
                latestDate: apiData.latest_date,
                latestTimestamp: apiData.latest_timestamp,
                prices: apiData.prices.map((price) => ({
                    symbol: price.symbol,
                    feedId: price.feed_id,
                    price: new BN(price.price),
                    timestamp: new BN(price.timestamp),
                    exponent: price.exponent,
                })),
                signature: apiData.signature,
                signatureByteArray: hexStringToByteArray(apiData.signature),
                recoveryId: apiData.recovery_id,
            };
        } catch (e) {
            console.error('Error fetching trader Info:', e);
            return null;
        }
    }
}
