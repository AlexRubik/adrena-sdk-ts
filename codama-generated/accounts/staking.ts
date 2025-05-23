/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  assertAccountExists,
  assertAccountsExist,
  combineCodec,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
  fixDecoderSize,
  fixEncoderSize,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getI64Decoder,
  getI64Encoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Account,
  type Address,
  type Codec,
  type Decoder,
  type EncodedAccount,
  type Encoder,
  type FetchAccountConfig,
  type FetchAccountsConfig,
  type MaybeAccount,
  type MaybeEncodedAccount,
  type ReadonlyUint8Array,
} from '@solana/kit';
import {
  getNextStakingRoundDecoder,
  getNextStakingRoundEncoder,
  getStakingRoundDecoder,
  getStakingRoundEncoder,
  type NextStakingRound,
  type NextStakingRoundArgs,
  type StakingRound,
  type StakingRoundArgs,
} from '../types';

export const STAKING_DISCRIMINATOR = new Uint8Array([
  242, 134, 183, 223, 18, 13, 184, 23,
]);

export function getStakingDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(STAKING_DISCRIMINATOR);
}

export type Staking = {
  discriminator: ReadonlyUint8Array;
  stakingType: number;
  bump: number;
  stakedTokenVaultBump: number;
  rewardTokenVaultBump: number;
  lmRewardTokenVaultBump: number;
  rewardTokenDecimals: number;
  stakedTokenDecimals: number;
  initialized: number;
  nbLockedTokens: bigint;
  nbLiquidTokens: bigint;
  stakedTokenMint: Address;
  resolvedRewardTokenAmount: bigint;
  resolvedStakedTokenAmount: bigint;
  resolvedLmRewardTokenAmount: bigint;
  resolvedLmStakedTokenAmount: bigint;
  currentStakingRound: StakingRound;
  currentStakingRoundLiquidRewardsUsd: bigint;
  padding1: ReadonlyUint8Array;
  nextStakingRound: NextStakingRound;
  padding2: ReadonlyUint8Array;
  resolvedStakingRounds: Array<StakingRound>;
  registeredResolvedStakingRoundCount: number;
  padding3: ReadonlyUint8Array;
  lmEmissionPotentiometerBps: number;
  monthsElapsedSinceInception: number;
  paddingUnsafe: ReadonlyUint8Array;
  emissionAmountPerRoundLastUpdate: bigint;
  currentMonthEmissionAmountPerRound: bigint;
};

export type StakingArgs = {
  stakingType: number;
  bump: number;
  stakedTokenVaultBump: number;
  rewardTokenVaultBump: number;
  lmRewardTokenVaultBump: number;
  rewardTokenDecimals: number;
  stakedTokenDecimals: number;
  initialized: number;
  nbLockedTokens: number | bigint;
  nbLiquidTokens: number | bigint;
  stakedTokenMint: Address;
  resolvedRewardTokenAmount: number | bigint;
  resolvedStakedTokenAmount: number | bigint;
  resolvedLmRewardTokenAmount: number | bigint;
  resolvedLmStakedTokenAmount: number | bigint;
  currentStakingRound: StakingRoundArgs;
  currentStakingRoundLiquidRewardsUsd: number | bigint;
  padding1: ReadonlyUint8Array;
  nextStakingRound: NextStakingRoundArgs;
  padding2: ReadonlyUint8Array;
  resolvedStakingRounds: Array<StakingRoundArgs>;
  registeredResolvedStakingRoundCount: number;
  padding3: ReadonlyUint8Array;
  lmEmissionPotentiometerBps: number;
  monthsElapsedSinceInception: number;
  paddingUnsafe: ReadonlyUint8Array;
  emissionAmountPerRoundLastUpdate: number | bigint;
  currentMonthEmissionAmountPerRound: number | bigint;
};

export function getStakingEncoder(): Encoder<StakingArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['stakingType', getU8Encoder()],
      ['bump', getU8Encoder()],
      ['stakedTokenVaultBump', getU8Encoder()],
      ['rewardTokenVaultBump', getU8Encoder()],
      ['lmRewardTokenVaultBump', getU8Encoder()],
      ['rewardTokenDecimals', getU8Encoder()],
      ['stakedTokenDecimals', getU8Encoder()],
      ['initialized', getU8Encoder()],
      ['nbLockedTokens', getU64Encoder()],
      ['nbLiquidTokens', getU64Encoder()],
      ['stakedTokenMint', getAddressEncoder()],
      ['resolvedRewardTokenAmount', getU64Encoder()],
      ['resolvedStakedTokenAmount', getU64Encoder()],
      ['resolvedLmRewardTokenAmount', getU64Encoder()],
      ['resolvedLmStakedTokenAmount', getU64Encoder()],
      ['currentStakingRound', getStakingRoundEncoder()],
      ['currentStakingRoundLiquidRewardsUsd', getU64Encoder()],
      ['padding1', fixEncoderSize(getBytesEncoder(), 16)],
      ['nextStakingRound', getNextStakingRoundEncoder()],
      ['padding2', fixEncoderSize(getBytesEncoder(), 8)],
      [
        'resolvedStakingRounds',
        getArrayEncoder(getStakingRoundEncoder(), { size: 32 }),
      ],
      ['registeredResolvedStakingRoundCount', getU8Encoder()],
      ['padding3', fixEncoderSize(getBytesEncoder(), 3)],
      ['lmEmissionPotentiometerBps', getU16Encoder()],
      ['monthsElapsedSinceInception', getU16Encoder()],
      ['paddingUnsafe', fixEncoderSize(getBytesEncoder(), 8)],
      ['emissionAmountPerRoundLastUpdate', getI64Encoder()],
      ['currentMonthEmissionAmountPerRound', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: STAKING_DISCRIMINATOR })
  );
}

export function getStakingDecoder(): Decoder<Staking> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['stakingType', getU8Decoder()],
    ['bump', getU8Decoder()],
    ['stakedTokenVaultBump', getU8Decoder()],
    ['rewardTokenVaultBump', getU8Decoder()],
    ['lmRewardTokenVaultBump', getU8Decoder()],
    ['rewardTokenDecimals', getU8Decoder()],
    ['stakedTokenDecimals', getU8Decoder()],
    ['initialized', getU8Decoder()],
    ['nbLockedTokens', getU64Decoder()],
    ['nbLiquidTokens', getU64Decoder()],
    ['stakedTokenMint', getAddressDecoder()],
    ['resolvedRewardTokenAmount', getU64Decoder()],
    ['resolvedStakedTokenAmount', getU64Decoder()],
    ['resolvedLmRewardTokenAmount', getU64Decoder()],
    ['resolvedLmStakedTokenAmount', getU64Decoder()],
    ['currentStakingRound', getStakingRoundDecoder()],
    ['currentStakingRoundLiquidRewardsUsd', getU64Decoder()],
    ['padding1', fixDecoderSize(getBytesDecoder(), 16)],
    ['nextStakingRound', getNextStakingRoundDecoder()],
    ['padding2', fixDecoderSize(getBytesDecoder(), 8)],
    [
      'resolvedStakingRounds',
      getArrayDecoder(getStakingRoundDecoder(), { size: 32 }),
    ],
    ['registeredResolvedStakingRoundCount', getU8Decoder()],
    ['padding3', fixDecoderSize(getBytesDecoder(), 3)],
    ['lmEmissionPotentiometerBps', getU16Decoder()],
    ['monthsElapsedSinceInception', getU16Decoder()],
    ['paddingUnsafe', fixDecoderSize(getBytesDecoder(), 8)],
    ['emissionAmountPerRoundLastUpdate', getI64Decoder()],
    ['currentMonthEmissionAmountPerRound', getU64Decoder()],
  ]);
}

export function getStakingCodec(): Codec<StakingArgs, Staking> {
  return combineCodec(getStakingEncoder(), getStakingDecoder());
}

export function decodeStaking<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<Staking, TAddress>;
export function decodeStaking<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<Staking, TAddress>;
export function decodeStaking<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<Staking, TAddress> | MaybeAccount<Staking, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getStakingDecoder()
  );
}

export async function fetchStaking<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<Staking, TAddress>> {
  const maybeAccount = await fetchMaybeStaking(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeStaking<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<Staking, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeStaking(maybeAccount);
}

export async function fetchAllStaking(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<Staking>[]> {
  const maybeAccounts = await fetchAllMaybeStaking(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeStaking(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<Staking>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeStaking(maybeAccount));
}

export function getStakingSize(): number {
  return 2304;
}
