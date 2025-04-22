// https://docs.pyth.network/benchmarks/rate-limits
// https://hermes.pyth.network/docs/#/rest/latest_price_updates
// https://www.pyth.network/developers/price-feed-ids

interface PythPrice {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
  }
  
  interface PythPriceUpdate {
    id: string;
    price: PythPrice;
    ema_price: PythPrice;
    metadata: {
      slot: number;
      proof_available_time: number;
      prev_publish_time: number;
    };
  }
  
  interface PythResponse {
    binary: {
      encoding: string;
      data: string[];
    };
    parsed: PythPriceUpdate[];
  }

  type PythPriceId = "SOL" | "WBTC" | "BTC" | "BONK";

  /**
   * Mapping of asset symbols to their corresponding Pyth price feed IDs
   * @see https://pyth.network/developers/price-feed-ids for a list of all price feed ids
   */
  export const pythPriceIds: Record<PythPriceId, string> = {
    SOL: "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
    WBTC: "0xc9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33",
    BTC: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    BONK: "0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419",
  };
  
  /**
   * Fetches the latest price for a given Pyth price feed ID
   * @param priceId The Pyth price feed ID
   * @returns The price in USD with proper decimal adjustment
   * 
   * See https://pyth.network/developers/price-feed-ids for a list of all price feed ids.
   */
  export async function getPythPrice(priceId: PythPriceId = "SOL"): Promise<number> {
    const pythPriceId = pythPriceIds[priceId];
    try {
      const url = `https://hermes.pyth.network/v2/updates/price/latest?ids[]=${pythPriceId}`;
      const response = await fetch(url, {
        headers: {
          'accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Pyth API error: ${response.status} ${response.statusText}`);
      }
  
      const data: PythResponse = await response.json();
      
      if (!data.parsed || data.parsed.length === 0) {
        throw new Error('No price data returned from Pyth');
      }
  
      const priceUpdate = data.parsed[0];
      const rawPrice = Number(priceUpdate.price.price);
      const exponent = priceUpdate.price.expo;
      
      // Adjust price according to the exponent (e.g., -8 means divide by 10^8)
      const adjustedPrice = rawPrice * Math.pow(10, exponent);
      
      return adjustedPrice;
    } catch (error) {
      console.error('Error fetching Pyth price:', error);
      throw error;
    }
  }