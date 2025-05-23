/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export enum BucketName {
  CoreContributor,
  Foundation,
  Ecosystem,
}

export type BucketNameArgs = BucketName;

export function getBucketNameEncoder(): Encoder<BucketNameArgs> {
  return getEnumEncoder(BucketName);
}

export function getBucketNameDecoder(): Decoder<BucketName> {
  return getEnumDecoder(BucketName);
}

export function getBucketNameCodec(): Codec<BucketNameArgs, BucketName> {
  return combineCodec(getBucketNameEncoder(), getBucketNameDecoder());
}
