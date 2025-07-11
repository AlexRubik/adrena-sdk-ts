/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getI32Decoder,
  getI32Encoder,
  getI64Decoder,
  getI64Encoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  type Codec,
  type Decoder,
  type Encoder,
  type ReadonlyUint8Array,
} from '@solana/kit';
import {
  getLimitedStringDecoder,
  getLimitedStringEncoder,
  type LimitedString,
  type LimitedStringArgs,
} from '.';

export type OraclePrice = {
  price: bigint;
  confidence: bigint;
  timestamp: bigint;
  exponent: number;
  chaosLabsFeedId: number;
  padding: ReadonlyUint8Array;
  name: LimitedString;
};

export type OraclePriceArgs = {
  price: number | bigint;
  confidence: number | bigint;
  timestamp: number | bigint;
  exponent: number;
  chaosLabsFeedId: number;
  padding: ReadonlyUint8Array;
  name: LimitedStringArgs;
};

export function getOraclePriceEncoder(): Encoder<OraclePriceArgs> {
  return getStructEncoder([
    ['price', getU64Encoder()],
    ['confidence', getU64Encoder()],
    ['timestamp', getI64Encoder()],
    ['exponent', getI32Encoder()],
    ['chaosLabsFeedId', getU8Encoder()],
    ['padding', fixEncoderSize(getBytesEncoder(), 3)],
    ['name', getLimitedStringEncoder()],
  ]);
}

export function getOraclePriceDecoder(): Decoder<OraclePrice> {
  return getStructDecoder([
    ['price', getU64Decoder()],
    ['confidence', getU64Decoder()],
    ['timestamp', getI64Decoder()],
    ['exponent', getI32Decoder()],
    ['chaosLabsFeedId', getU8Decoder()],
    ['padding', fixDecoderSize(getBytesDecoder(), 3)],
    ['name', getLimitedStringDecoder()],
  ]);
}

export function getOraclePriceCodec(): Codec<OraclePriceArgs, OraclePrice> {
  return combineCodec(getOraclePriceEncoder(), getOraclePriceDecoder());
}
