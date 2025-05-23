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
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
} from '@solana/kit';
import { ADRENA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const GET_LP_TOKEN_PRICE_DISCRIMINATOR = new Uint8Array([
  71, 172, 21, 25, 176, 168, 60, 10,
]);

export function getGetLpTokenPriceDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    GET_LP_TOKEN_PRICE_DISCRIMINATOR
  );
}

export type GetLpTokenPriceInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountLpTokenMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountCortex extends string
        ? ReadonlyAccount<TAccountCortex>
        : TAccountCortex,
      TAccountPool extends string
        ? ReadonlyAccount<TAccountPool>
        : TAccountPool,
      TAccountLpTokenMint extends string
        ? ReadonlyAccount<TAccountLpTokenMint>
        : TAccountLpTokenMint,
      ...TRemainingAccounts,
    ]
  >;

export type GetLpTokenPriceInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type GetLpTokenPriceInstructionDataArgs = {};

export function getGetLpTokenPriceInstructionDataEncoder(): Encoder<GetLpTokenPriceInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: GET_LP_TOKEN_PRICE_DISCRIMINATOR })
  );
}

export function getGetLpTokenPriceInstructionDataDecoder(): Decoder<GetLpTokenPriceInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getGetLpTokenPriceInstructionDataCodec(): Codec<
  GetLpTokenPriceInstructionDataArgs,
  GetLpTokenPriceInstructionData
> {
  return combineCodec(
    getGetLpTokenPriceInstructionDataEncoder(),
    getGetLpTokenPriceInstructionDataDecoder()
  );
}

export type GetLpTokenPriceInput<
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountLpTokenMint extends string = string,
> = {
  /** #1 */
  cortex: Address<TAccountCortex>;
  /** #2 */
  pool: Address<TAccountPool>;
  /** #3 */
  lpTokenMint: Address<TAccountLpTokenMint>;
};

export function getGetLpTokenPriceInstruction<
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountLpTokenMint extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: GetLpTokenPriceInput<
    TAccountCortex,
    TAccountPool,
    TAccountLpTokenMint
  >,
  config?: { programAddress?: TProgramAddress }
): GetLpTokenPriceInstruction<
  TProgramAddress,
  TAccountCortex,
  TAccountPool,
  TAccountLpTokenMint
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    cortex: { value: input.cortex ?? null, isWritable: false },
    pool: { value: input.pool ?? null, isWritable: false },
    lpTokenMint: { value: input.lpTokenMint ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.lpTokenMint),
    ],
    programAddress,
    data: getGetLpTokenPriceInstructionDataEncoder().encode({}),
  } as GetLpTokenPriceInstruction<
    TProgramAddress,
    TAccountCortex,
    TAccountPool,
    TAccountLpTokenMint
  >;

  return instruction;
}

export type ParsedGetLpTokenPriceInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    cortex: TAccountMetas[0];
    /** #2 */
    pool: TAccountMetas[1];
    /** #3 */
    lpTokenMint: TAccountMetas[2];
  };
  data: GetLpTokenPriceInstructionData;
};

export function parseGetLpTokenPriceInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedGetLpTokenPriceInstruction<TProgram, TAccountMetas> {
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
      cortex: getNextAccount(),
      pool: getNextAccount(),
      lpTokenMint: getNextAccount(),
    },
    data: getGetLpTokenPriceInstructionDataDecoder().decode(instruction.data),
  };
}
