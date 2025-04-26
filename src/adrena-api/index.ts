/**
 * Adrena API client for interacting with the Adrena data API
 * https://datapi.adrena.xyz/swagger/static/index.html
 */
import { ADRENA_API_BASE_URL } from './constants';
import {
  GetPositionsParams,
  PositionResponse,
  GetPoolInfoParams,
  PoolInfoResponse,
  GetCustodyInfoParams,
  CustodyInfoResponse,
  MutagenResponse,
  MutagenLeaderboardResponse,
  TraderInfoResponse,
  GetTraderProfilesParams,
  TraderProfilesResponse,
  PriceResponse,
  GetTraderVolumeParams,
  TraderVolumeResponse,
  LastTradingPricesResponse,
  ErrorResponse
} from './types';

/**
 * Adrena API client for interacting with the Adrena data API
 */
export class AdrenaApi {
  private baseUrl: string;

  /**
   * Create a new Adrena API client
   * @param baseUrl Optional custom base URL for the API
   */
  constructor(baseUrl: string = ADRENA_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Helper method to build query parameters
   * @param params Object containing query parameters
   * @returns URL-encoded query string
   */
  private buildQueryParams(params: Record<string, any>): string {
    const queryParams = new URLSearchParams();
    
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(item => queryParams.append(key, item.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    }
    
    return queryParams.toString();
  }

  /**
   * Make a GET request to the API
   * @param endpoint API endpoint
   * @param params Query parameters
   * @returns Promise with the response data
   */
  private async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const queryString = this.buildQueryParams(params);
    const url = `${this.baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json() as ErrorResponse;
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  }

  /**
   * Get positions for a user
   * @param params Parameters for the request
   * @returns Promise with position data
   */
  async getPositions(params: GetPositionsParams): Promise<PositionResponse> {
    return this.get<PositionResponse>('/position', params);
  }

  /**
   * Get pool information
   * @param params Parameters for the request
   * @returns Promise with pool info data
   */
  async getPoolInfo(params: GetPoolInfoParams = {}): Promise<PoolInfoResponse> {
    return this.get<PoolInfoResponse>('/poolinfo', params);
  }

  /**
   * Get hourly pool information
   * @param params Parameters for the request
   * @returns Promise with hourly pool info data
   */
  async getPoolInfoHourly(params: GetPoolInfoParams = {}): Promise<PoolInfoResponse> {
    return this.get<PoolInfoResponse>('/poolinfohourly', params);
  }

  /**
   * Get daily pool information
   * @param params Parameters for the request
   * @returns Promise with daily pool info data
   */
  async getPoolInfoDaily(params: GetPoolInfoParams = {}): Promise<PoolInfoResponse> {
    return this.get<PoolInfoResponse>('/poolinfodaily', params);
  }

  /**
   * Get custody information
   * @param params Parameters for the request
   * @returns Promise with custody info data
   */
  async getCustodyInfo(params: GetCustodyInfoParams = {}): Promise<CustodyInfoResponse> {
    return this.get<CustodyInfoResponse>('/custodyinfo', params);
  }

  /**
   * Get hourly custody information
   * @param params Parameters for the request
   * @returns Promise with hourly custody info data
   */
  async getCustodyInfoHourly(params: GetCustodyInfoParams = {}): Promise<CustodyInfoResponse> {
    return this.get<CustodyInfoResponse>('/custodyinfohourly', params);
  }

  /**
   * Get mutagen data for a user
   * @param userWallet User wallet address
   * @returns Promise with mutagen data
   */
  async getMutagen(userWallet: string): Promise<MutagenResponse> {
    return this.get<MutagenResponse>('/mutagen', { user_wallet: userWallet });
  }

  /**
   * Get mutagen leaderboard
   * @returns Promise with mutagen leaderboard data
   */
  async getMutagenLeaderboard(): Promise<MutagenLeaderboardResponse> {
    return this.get<MutagenLeaderboardResponse>('/mutagen-leaderboard');
  }

  /**
   * Get trader information
   * @param userWallet User wallet address
   * @returns Promise with trader info data
   */
  async getTraderInfo(userWallet: string): Promise<TraderInfoResponse> {
    return this.get<TraderInfoResponse>('/trader-info', { user_wallet: userWallet });
  }

  /**
   * Get trader profiles
   * @param params Parameters for the request
   * @returns Promise with trader profiles data
   */
  async getTraderProfiles(params: GetTraderProfilesParams = {}): Promise<TraderProfilesResponse> {
    return this.get<TraderProfilesResponse>('/trader-profiles', params);
  }

  /**
   * Get ADX and ALP price at a specific time
   * @param date Date string in ISO format
   * @returns Promise with price data
   */
  async getPrice(date: string): Promise<PriceResponse> {
    return this.get<PriceResponse>('/get-price', { date });
  }

  /**
   * Get trader volume data
   * @param params Parameters for the request
   * @returns Promise with trader volume data
   */
  async getTraderVolume(params: GetTraderVolumeParams = {}): Promise<TraderVolumeResponse> {
    return this.get<TraderVolumeResponse>('/trader-volume', params);
  }

  /**
   * Get last trading prices
   * @returns Promise with last trading prices data
   */
  async getLastTradingPrices(): Promise<LastTradingPricesResponse> {
    return this.get<LastTradingPricesResponse>('/last-trading-prices');
  }

  /**
   * Get factions data
   * @returns Promise with factions data
   */
  async getFactions(): Promise<any> {
    return this.get<any>('/factions');
  }
}

// Export a default instance
export const adrenaApi = new AdrenaApi();

// Re-export types and constants
export * from './types';
export * from './constants';
