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
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { ADRENA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const INIT_FOUR_VESTING_DISCRIMINATOR = new Uint8Array([
  3, 142, 244, 213, 166, 217, 186, 48,
]);

export function getInitFourVestingDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    INIT_FOUR_VESTING_DISCRIMINATOR
  );
}

export type InitFourVestingInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountVestRegistry extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountRent extends
    | string
    | IAccountMeta<string> = 'SysvarRent111111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountTransferAuthority extends string
        ? ReadonlyAccount<TAccountTransferAuthority>
        : TAccountTransferAuthority,
      TAccountCortex extends string
        ? WritableAccount<TAccountCortex>
        : TAccountCortex,
      TAccountVestRegistry extends string
        ? WritableAccount<TAccountVestRegistry>
        : TAccountVestRegistry,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountRent extends string
        ? ReadonlyAccount<TAccountRent>
        : TAccountRent,
      ...TRemainingAccounts,
    ]
  >;

export type InitFourVestingInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type InitFourVestingInstructionDataArgs = {};

export function getInitFourVestingInstructionDataEncoder(): Encoder<InitFourVestingInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: INIT_FOUR_VESTING_DISCRIMINATOR })
  );
}

export function getInitFourVestingInstructionDataDecoder(): Decoder<InitFourVestingInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getInitFourVestingInstructionDataCodec(): Codec<
  InitFourVestingInstructionDataArgs,
  InitFourVestingInstructionData
> {
  return combineCodec(
    getInitFourVestingInstructionDataEncoder(),
    getInitFourVestingInstructionDataDecoder()
  );
}

export type InitFourVestingInput<
  TAccountAdmin extends string = string,
  TAccountPayer extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountVestRegistry extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountRent extends string = string,
> = {
  /** #1 */
  admin: TransactionSigner<TAccountAdmin>;
  /** #2 */
  payer: TransactionSigner<TAccountPayer>;
  /** #3 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #4 */
  cortex: Address<TAccountCortex>;
  /** #5 */
  vestRegistry: Address<TAccountVestRegistry>;
  /** #6 */
  systemProgram?: Address<TAccountSystemProgram>;
  /** #7 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #8 */
  rent?: Address<TAccountRent>;
};

export function getInitFourVestingInstruction<
  TAccountAdmin extends string,
  TAccountPayer extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountVestRegistry extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountRent extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: InitFourVestingInput<
    TAccountAdmin,
    TAccountPayer,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountVestRegistry,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountRent
  >,
  config?: { programAddress?: TProgramAddress }
): InitFourVestingInstruction<
  TProgramAddress,
  TAccountAdmin,
  TAccountPayer,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountVestRegistry,
  TAccountSystemProgram,
  TAccountTokenProgram,
  TAccountRent
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    admin: { value: input.admin ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    cortex: { value: input.cortex ?? null, isWritable: true },
    vestRegistry: { value: input.vestRegistry ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    rent: { value: input.rent ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.rent.value) {
    accounts.rent.value =
      'SysvarRent111111111111111111111111111111111' as Address<'SysvarRent111111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.vestRegistry),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.rent),
    ],
    programAddress,
    data: getInitFourVestingInstructionDataEncoder().encode({}),
  } as InitFourVestingInstruction<
    TProgramAddress,
    TAccountAdmin,
    TAccountPayer,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountVestRegistry,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountRent
  >;

  return instruction;
}

export type ParsedInitFourVestingInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    admin: TAccountMetas[0];
    /** #2 */
    payer: TAccountMetas[1];
    /** #3 */
    transferAuthority: TAccountMetas[2];
    /** #4 */
    cortex: TAccountMetas[3];
    /** #5 */
    vestRegistry: TAccountMetas[4];
    /** #6 */
    systemProgram: TAccountMetas[5];
    /** #7 */
    tokenProgram: TAccountMetas[6];
    /** #8 */
    rent: TAccountMetas[7];
  };
  data: InitFourVestingInstructionData;
};

export function parseInitFourVestingInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitFourVestingInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 8) {
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
      payer: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      vestRegistry: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      rent: getNextAccount(),
    },
    data: getInitFourVestingInstructionDataDecoder().decode(instruction.data),
  };
}
