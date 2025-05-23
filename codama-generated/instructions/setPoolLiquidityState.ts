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
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/kit';
import { ADRENA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const SET_POOL_LIQUIDITY_STATE_DISCRIMINATOR = new Uint8Array([
  154, 229, 163, 5, 137, 121, 175, 86,
]);

export function getSetPoolLiquidityStateDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    SET_POOL_LIQUIDITY_STATE_DISCRIMINATOR
  );
}

export type SetPoolLiquidityStateInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountCortex extends string
        ? WritableAccount<TAccountCortex>
        : TAccountCortex,
      TAccountPool extends string
        ? WritableAccount<TAccountPool>
        : TAccountPool,
      ...TRemainingAccounts,
    ]
  >;

export type SetPoolLiquidityStateInstructionData = {
  discriminator: ReadonlyUint8Array;
  liquidityState: number;
};

export type SetPoolLiquidityStateInstructionDataArgs = {
  liquidityState: number;
};

export function getSetPoolLiquidityStateInstructionDataEncoder(): Encoder<SetPoolLiquidityStateInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['liquidityState', getU8Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: SET_POOL_LIQUIDITY_STATE_DISCRIMINATOR,
    })
  );
}

export function getSetPoolLiquidityStateInstructionDataDecoder(): Decoder<SetPoolLiquidityStateInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['liquidityState', getU8Decoder()],
  ]);
}

export function getSetPoolLiquidityStateInstructionDataCodec(): Codec<
  SetPoolLiquidityStateInstructionDataArgs,
  SetPoolLiquidityStateInstructionData
> {
  return combineCodec(
    getSetPoolLiquidityStateInstructionDataEncoder(),
    getSetPoolLiquidityStateInstructionDataDecoder()
  );
}

export type SetPoolLiquidityStateInput<
  TAccountAdmin extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
> = {
  /** #1 */
  admin: TransactionSigner<TAccountAdmin>;
  /** #2 */
  cortex: Address<TAccountCortex>;
  /** #3 */
  pool: Address<TAccountPool>;
  liquidityState: SetPoolLiquidityStateInstructionDataArgs['liquidityState'];
};

export function getSetPoolLiquidityStateInstruction<
  TAccountAdmin extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: SetPoolLiquidityStateInput<
    TAccountAdmin,
    TAccountCortex,
    TAccountPool
  >,
  config?: { programAddress?: TProgramAddress }
): SetPoolLiquidityStateInstruction<
  TProgramAddress,
  TAccountAdmin,
  TAccountCortex,
  TAccountPool
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    admin: { value: input.admin ?? null, isWritable: false },
    cortex: { value: input.cortex ?? null, isWritable: true },
    pool: { value: input.pool ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
    ],
    programAddress,
    data: getSetPoolLiquidityStateInstructionDataEncoder().encode(
      args as SetPoolLiquidityStateInstructionDataArgs
    ),
  } as SetPoolLiquidityStateInstruction<
    TProgramAddress,
    TAccountAdmin,
    TAccountCortex,
    TAccountPool
  >;

  return instruction;
}

export type ParsedSetPoolLiquidityStateInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    admin: TAccountMetas[0];
    /** #2 */
    cortex: TAccountMetas[1];
    /** #3 */
    pool: TAccountMetas[2];
  };
  data: SetPoolLiquidityStateInstructionData;
};

export function parseSetPoolLiquidityStateInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetPoolLiquidityStateInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      admin: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
    },
    data: getSetPoolLiquidityStateInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
