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
  
  /**
   * Fetches the latest price for a given Pyth price feed ID
   * @param priceId The Pyth price feed ID
   * @returns The price in USD with proper decimal adjustment
   */
  export async function getPythPrice(priceId: string = "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d"): Promise<number> {
    try {
      const url = `https://hermes.pyth.network/v2/updates/price/latest?ids[]=${priceId}`;
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