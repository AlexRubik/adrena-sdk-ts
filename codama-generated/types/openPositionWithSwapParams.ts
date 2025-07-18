/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  type Codec,
  type Decoder,
  type Encoder,
  type Option,
  type OptionOrNullable,
} from '@solana/kit';
import {
  getChaosLabsBatchPricesDecoder,
  getChaosLabsBatchPricesEncoder,
  type ChaosLabsBatchPrices,
  type ChaosLabsBatchPricesArgs,
} from '.';

export type OpenPositionWithSwapParams = {
  price: bigint;
  collateral: bigint;
  leverage: number;
  oraclePrices: Option<ChaosLabsBatchPrices>;
};

export type OpenPositionWithSwapParamsArgs = {
  price: number | bigint;
  collateral: number | bigint;
  leverage: number;
  oraclePrices: OptionOrNullable<ChaosLabsBatchPricesArgs>;
};

export function getOpenPositionWithSwapParamsEncoder(): Encoder<OpenPositionWithSwapParamsArgs> {
  return getStructEncoder([
    ['price', getU64Encoder()],
    ['collateral', getU64Encoder()],
    ['leverage', getU32Encoder()],
    ['oraclePrices', getOptionEncoder(getChaosLabsBatchPricesEncoder())],
  ]);
}

export function getOpenPositionWithSwapParamsDecoder(): Decoder<OpenPositionWithSwapParams> {
  return getStructDecoder([
    ['price', getU64Decoder()],
    ['collateral', getU64Decoder()],
    ['leverage', getU32Decoder()],
    ['oraclePrices', getOptionDecoder(getChaosLabsBatchPricesDecoder())],
  ]);
}

export function getOpenPositionWithSwapParamsCodec(): Codec<
  OpenPositionWithSwapParamsArgs,
  OpenPositionWithSwapParams
> {
  return combineCodec(
    getOpenPositionWithSwapParamsEncoder(),
    getOpenPositionWithSwapParamsDecoder()
  );
}
