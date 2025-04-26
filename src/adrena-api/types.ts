import { PositionSide, PositionStatus, SortOrder, SortField, TraderProfileOrderColumn, PnlStatus } from './constants';

/**
 * Position data returned by the API
 */
export interface Position {
  position_id: number;
  user_id: number;
  symbol: string;
  token_account_mint: string;
  side: PositionSide;
  status: PositionStatus;
  pubkey: string;
  entry_price: number | null;
  exit_price: number | null;
  entry_size: number | null;
  increase_size: number | null;
  exit_size: number | null;
  pnl: number | null;
  entry_leverage: number;
  lowest_leverage: number;
  entry_date: string;
  exit_date: string | null;
  fees: number | null;
  borrow_fees: number | null;
  exit_fees: number | null;
  last_ix: string | null;
  entry_collateral_amount: number | null;
  collateral_amount: number | null;
  closed_by_sl_tp: boolean;
  volume: number | null;
  duration: number | null;
  pnl_volume_ratio: number | null;
  points_pnl_volume_ratio: number | null;
  points_duration: number | null;
  close_size_multiplier: number | null;
  points_mutations: number | null;
  total_points: number | null;
  created_at: string;
  updated_at: string | null;
}

/**
 * Response for position API
 */
export interface PositionResponse {
  success: boolean;
  data: Position[];
}

/**
 * Parameters for fetching positions
 */
export interface GetPositionsParams {
  user_wallet: string;
  position_id?: number;
  side?: PositionSide;
  status?: PositionStatus[];
  entry_date?: string;
  sort?: SortOrder;
  sortField?: SortField;
  limit?: number;
}

/**
 * Pool info data structure
 */
export interface PoolInfoData {
  snapshot_timestamp: string[];
  startDate: string;
  endDate: string;
  pool_snapshot_info_id?: number[];
  agg_pool_snapshot_info_hourly_id?: number[];
  agg_pool_snapshot_info_daily_id?: number[];
  aum_usd?: number[];
  lp_token_price?: number[];
  cumulative_referrer_fee_usd?: number[];
  short_pnl?: number[];
  long_pnl?: number[];
  open_interest_long_usd?: number[];
  open_interest_short_usd?: number[];
  cumulative_profit_usd?: number[];
  cumulative_loss_usd?: number[];
  cumulative_swap_fee_usd?: number[];
  cumulative_liquidity_fee_usd?: number[];
  cumulative_close_position_fee_usd?: number[];
  cumulative_liquidation_fee_usd?: number[];
  cumulative_borrow_fee_usd?: number[];
  cumulative_trading_volume_usd?: number[];
  lp_apr_rolling_seven_day?: number[];
  lm_apr_rolling_seven_day?: number[];
}

/**
 * Pool info response
 */
export interface PoolInfoResponse {
  success: boolean;
  data: PoolInfoData;
}

/**
 * Parameters for fetching pool info
 */
export interface GetPoolInfoParams {
  aum_usd?: boolean;
  lp_token_price?: boolean;
  cumulative_referrer_fee_usd?: boolean;
  short_pnl?: boolean;
  long_pnl?: boolean;
  open_interest_long_usd?: boolean;
  open_interest_short_usd?: boolean;
  cumulative_profit_usd?: boolean;
  cumulative_loss_usd?: boolean;
  cumulative_swap_fee_usd?: boolean;
  cumulative_liquidity_fee_usd?: boolean;
  cumulative_close_position_fee_usd?: boolean;
  cumulative_liquidation_fee_usd?: boolean;
  cumulative_borrow_fee_usd?: boolean;
  cumulative_trading_volume_usd?: boolean;
  lp_apr_rolling_seven_day?: boolean;
  lm_apr_rolling_seven_day?: boolean;
  start_date?: string;
  end_date?: string;
  sort?: SortOrder;
  limit?: number;
}

/**
 * Custody info data structure
 */
export interface CustodyInfoData {
  snapshot_timestamp: string[];
  startDate: string;
  endDate: string;
  page: number;
  offset: number;
  limit: number;
  total_count: number;
  next_page: number;
  previous_page: number;
  custody_snapshot_info_id?: Record<string, string[]>;
  agg_custody_snapshot_info_hourly_id?: Record<string, string[]>;
  assets_value_usd?: Record<string, string[]>;
  borrow_rate?: Record<string, string[]>;
  owned?: Record<string, string[]>;
  locked?: Record<string, string[]>;
  price?: Record<string, string[]>;
  price_confidence?: Record<string, string[]>;
  trade_price?: Record<string, string[]>;
  trade_price_confidence?: Record<string, string[]>;
  short_pnl?: Record<string, string[]>;
  long_pnl?: Record<string, string[]>;
  open_interest_long_usd?: Record<string, string[]>;
  open_interest_short_usd?: Record<string, string[]>;
  cumulative_profit_usd?: Record<string, string[]>;
  cumulative_loss_usd?: Record<string, string[]>;
  cumulative_swap_fee_usd?: Record<string, string[]>;
  cumulative_liquidity_fee_usd?: Record<string, string[]>;
  cumulative_close_position_fee_usd?: Record<string, string[]>;
  cumulative_liquidation_fee_usd?: Record<string, string[]>;
  cumulative_borrow_fee_usd?: Record<string, string[]>;
  cumulative_trading_volume_usd?: Record<string, string[]>;
}

/**
 * Custody info response
 */
export interface CustodyInfoResponse {
  success: boolean;
  data: CustodyInfoData;
}

/**
 * Parameters for fetching custody info
 */
export interface GetCustodyInfoParams {
  custody?: string[];
  assets_value_usd?: boolean;
  borrow_rate?: boolean;
  owned?: boolean;
  locked?: boolean;
  price?: boolean;
  price_confidence?: boolean;
  trade_price?: boolean;
  trade_price_confidence?: boolean;
  short_pnl?: boolean;
  long_pnl?: boolean;
  open_interest_long_usd?: boolean;
  open_interest_short_usd?: boolean;
  cumulative_profit_usd?: boolean;
  cumulative_loss_usd?: boolean;
  cumulative_swap_fee_usd?: boolean;
  cumulative_liquidity_fee_usd?: boolean;
  cumulative_close_position_fee_usd?: boolean;
  cumulative_liquidation_fee_usd?: boolean;
  cumulative_borrow_fee_usd?: boolean;
  cumulative_trading_volume_usd?: boolean;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
}

/**
 * Mutagen data structure
 */
export interface MutagenData {
  user_wallet: string;
  total_points_trading: number;
  total_points_mutations: number;
  total_points_streaks: number;
  total_points_quests: number;
  total_total_points: number;
  total_volume: number;
  total_pnl: number;
  total_borrow_fees: number;
  total_close_fees: number;
  total_fees: number;
  seasons: {
    season_name: string;
    points_trading: number;
    points_mutations: number;
    points_streaks: number;
    points_quests: number;
    total_points: number;
    volume: number;
    pnl: number;
    borrow_fees: number;
    close_fees: number;
    fees: number;
  }[];
}

/**
 * Mutagen response
 */
export interface MutagenResponse {
  success: boolean;
  data: MutagenData;
}

/**
 * Mutagen leaderboard entry
 */
export interface MutagenLeaderboardEntry {
  rank: number;
  user_wallet: string;
  points_trading: number;
  points_mutations: number;
  points_streaks: number;
  points_quests: number;
  total_points: number;
  total_volume: number;
  total_pnl: number;
  total_borrow_fees: number;
  total_close_fees: number;
  total_fees: number;
}

/**
 * Mutagen leaderboard response
 */
export interface MutagenLeaderboardResponse {
  success: boolean;
  data: MutagenLeaderboardEntry[];
}

/**
 * Trader info data structure
 */
export interface TraderInfoData {
  user_pubkey: string;
  total_pnl: number;
  total_fees: number;
  total_borrow_fees: number;
  total_exit_fees: number;
  total_volume: number;
  total_number_positions: number;
  total_number_positions_open: number;
  total_number_positions_closed: number;
  total_number_positions_liquidated: number;
  win_rate_percentage: number;
  largest_winning_trade: number;
  largest_losing_trade: number;
  best_trading_performance: number;
  worst_trading_performance: number;
  avg_win_pnl: number;
  avg_loss_pnl: number;
  avg_volume: number;
  avg_pnl: number;
  avg_fees: number;
  avg_borrow_fees: number;
  avg_trading_performance: number;
  avg_entry_leverage: number;
  avg_entry_size: number;
  avg_exit_size: number;
  avg_entry_collateral_amount: number;
  avg_holding_time: number;
}

/**
 * Trader info response
 */
export interface TraderInfoResponse {
  success: boolean;
  data: TraderInfoData;
}

/**
 * Trader profile data
 */
export interface TraderProfile {
  user_pubkey: string;
  pnl: number;
  volume: number;
  fees: number;
}

/**
 * Trader profiles response
 */
export interface TraderProfilesResponse {
  success: boolean;
  data: {
    traders: TraderProfile[];
  };
}

/**
 * Parameters for fetching trader profiles
 */
export interface GetTraderProfilesParams {
  order_column?: TraderProfileOrderColumn;
  pnl_status?: PnlStatus;
  sort?: SortOrder;
  limit?: number;
}

/**
 * Price data structure
 */
export interface PriceData {
  adx: {
    price: string;
    price_timestamp: string;
  };
  alp: {
    price: string;
    price_timestamp: string;
  };
}

/**
 * Price response
 */
export interface PriceResponse {
  success: boolean;
  data: PriceData;
}

/**
 * Trader volume data
 */
export interface TraderVolumeData {
  traders: {
    user_pubkey: string;
    total_volume: number;
    total_pnl: number;
  }[];
  start_date: string;
  end_date: string;
}

/**
 * Trader volume response
 */
export interface TraderVolumeResponse {
  success: boolean;
  data: TraderVolumeData;
}

/**
 * Parameters for fetching trader volume
 */
export interface GetTraderVolumeParams {
  start_date?: string;
  end_date?: string;
}

/**
 * Last trading prices data
 */
export interface LastTradingPricesData {
  latest_timestamp: string;
  solusd_price: string;
  jitosolusd_price: string;
  btcusd_price: string;
  wbtcusd_price: string;
  bonkusd_price: string;
  usdcusd_price: string;
  solusd_price_ts: string;
  jitosolusd_price_ts: string;
  btcusd_price_ts: string;
  wbtcusd_price_ts: string;
  bonkusd_price_ts: string;
  usdcusd_price_ts: string;
  signature: string;
  recovery_id: number;
}

/**
 * Last trading prices response
 */
export interface LastTradingPricesResponse {
  success: boolean;
  data: LastTradingPricesData;
}

/**
 * Error response
 */
export interface ErrorResponse {
  error: string;
}
