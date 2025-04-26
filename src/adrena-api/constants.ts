/**
 * Constants for the Adrena API
 */

export const ADRENA_API_BASE_URL = 'https://datapi.adrena.xyz';

export enum PositionSide {
  LONG = 'long',
  SHORT = 'short',
}

export enum PositionStatus {
  OPEN = 'open',
  CLOSE = 'close',
  LIQUIDATE = 'liquidate',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortField {
  ENTRY_DATE = 'entry_date',
  EXIT_DATE = 'exit_date',
  POSITION_ID = 'position_id',
}

export enum TraderProfileOrderColumn {
  PNL = 'pnl',
  VOLUME = 'volume',
  FEES = 'fees',
}

export enum PnlStatus {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  ALL = 'all',
}
