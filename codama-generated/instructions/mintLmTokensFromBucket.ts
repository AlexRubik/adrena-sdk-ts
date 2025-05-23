/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
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
} from '@solana/kit';
import { ADRENA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const MINT_LM_TOKENS_FROM_BUCKET_DISCRIMINATOR = new Uint8Array([
  7, 255, 166, 0, 86, 35, 197, 106,
]);

export function getMintLmTokensFromBucketDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    MINT_LM_TOKENS_FROM_BUCKET_DISCRIMINATOR
  );
}

export type MintLmTokensFromBucketInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountReceivingAccount extends string | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountLmTokenMint extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountReceivingAccount extends string
        ? WritableAccount<TAccountReceivingAccount>
        : TAccountReceivingAccount,
      TAccountTransferAuthority extends string
        ? ReadonlyAccount<TAccountTransferAuthority>
        : TAccountTransferAuthority,
      TAccountCortex extends string
        ? WritableAccount<TAccountCortex>
        : TAccountCortex,
      TAccountLmTokenMint extends string
        ? WritableAccount<TAccountLmTokenMint>
        : TAccountLmTokenMint,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type MintLmTokensFromBucketInstructionData = {
  discriminator: ReadonlyUint8Array;
  bucketName: number;
  amount: bigint;
  reason: string;
};

export type MintLmTokensFromBucketInstructionDataArgs = {
  bucketName: number;
  amount: number | bigint;
  reason: string;
};

export function getMintLmTokensFromBucketInstructionDataEncoder(): Encoder<MintLmTokensFromBucketInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['bucketName', getU8Encoder()],
      ['amount', getU64Encoder()],
      ['reason', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ]),
    (value) => ({
      ...value,
      discriminator: MINT_LM_TOKENS_FROM_BUCKET_DISCRIMINATOR,
    })
  );
}

export function getMintLmTokensFromBucketInstructionDataDecoder(): Decoder<MintLmTokensFromBucketInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['bucketName', getU8Decoder()],
    ['amount', getU64Decoder()],
    ['reason', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
  ]);
}

export function getMintLmTokensFromBucketInstructionDataCodec(): Codec<
  MintLmTokensFromBucketInstructionDataArgs,
  MintLmTokensFromBucketInstructionData
> {
  return combineCodec(
    getMintLmTokensFromBucketInstructionDataEncoder(),
    getMintLmTokensFromBucketInstructionDataDecoder()
  );
}

export type MintLmTokensFromBucketInput<
  TAccountAdmin extends string = string,
  TAccountReceivingAccount extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountLmTokenMint extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** #1 */
  admin: TransactionSigner<TAccountAdmin>;
  /** #2 */
  receivingAccount: Address<TAccountReceivingAccount>;
  /** #3 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #4 */
  cortex: Address<TAccountCortex>;
  /** #5 */
  lmTokenMint: Address<TAccountLmTokenMint>;
  /** #6 */
  tokenProgram?: Address<TAccountTokenProgram>;
  bucketName: MintLmTokensFromBucketInstructionDataArgs['bucketName'];
  amount: MintLmTokensFromBucketInstructionDataArgs['amount'];
  reason: MintLmTokensFromBucketInstructionDataArgs['reason'];
};

export function getMintLmTokensFromBucketInstruction<
  TAccountAdmin extends string,
  TAccountReceivingAccount extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountLmTokenMint extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: MintLmTokensFromBucketInput<
    TAccountAdmin,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountLmTokenMint,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): MintLmTokensFromBucketInstruction<
  TProgramAddress,
  TAccountAdmin,
  TAccountReceivingAccount,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountLmTokenMint,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    admin: { value: input.admin ?? null, isWritable: false },
    receivingAccount: {
      value: input.receivingAccount ?? null,
      isWritable: true,
    },
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    cortex: { value: input.cortex ?? null, isWritable: true },
    lmTokenMint: { value: input.lmTokenMint ?? null, isWritable: true },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.receivingAccount),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.lmTokenMint),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getMintLmTokensFromBucketInstructionDataEncoder().encode(
      args as MintLmTokensFromBucketInstructionDataArgs
    ),
  } as MintLmTokensFromBucketInstruction<
    TProgramAddress,
    TAccountAdmin,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountLmTokenMint,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedMintLmTokensFromBucketInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    admin: TAccountMetas[0];
    /** #2 */
    receivingAccount: TAccountMetas[1];
    /** #3 */
    transferAuthority: TAccountMetas[2];
    /** #4 */
    cortex: TAccountMetas[3];
    /** #5 */
    lmTokenMint: TAccountMetas[4];
    /** #6 */
    tokenProgram: TAccountMetas[5];
  };
  data: MintLmTokensFromBucketInstructionData;
};

export function parseMintLmTokensFromBucketInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedMintLmTokensFromBucketInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
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
      receivingAccount: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      lmTokenMint: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getMintLmTokensFromBucketInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
