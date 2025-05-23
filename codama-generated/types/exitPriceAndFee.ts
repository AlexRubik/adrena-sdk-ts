/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export type ExitPriceAndFee = {
  price: bigint;
  fee: bigint;
  amountOut: bigint;
  profitUsd: bigint;
  lossUsd: bigint;
};

export type ExitPriceAndFeeArgs = {
  price: number | bigint;
  fee: number | bigint;
  amountOut: number | bigint;
  profitUsd: number | bigint;
  lossUsd: number | bigint;
};

export function getExitPriceAndFeeEncoder(): Encoder<ExitPriceAndFeeArgs> {
  return getStructEncoder([
    ['price', getU64Encoder()],
    ['fee', getU64Encoder()],
    ['amountOut', getU64Encoder()],
    ['profitUsd', getU64Encoder()],
    ['lossUsd', getU64Encoder()],
  ]);
}

export function getExitPriceAndFeeDecoder(): Decoder<ExitPriceAndFee> {
  return getStructDecoder([
    ['price', getU64Decoder()],
    ['fee', getU64Decoder()],
    ['amountOut', getU64Decoder()],
    ['profitUsd', getU64Decoder()],
    ['lossUsd', getU64Decoder()],
  ]);
}

export function getExitPriceAndFeeCodec(): Codec<
  ExitPriceAndFeeArgs,
  ExitPriceAndFee
> {
  return combineCodec(getExitPriceAndFeeEncoder(), getExitPriceAndFeeDecoder());
}
