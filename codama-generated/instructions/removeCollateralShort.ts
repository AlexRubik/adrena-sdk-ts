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
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
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
  type Option,
  type OptionOrNullable,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { ADRENA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getChaosLabsBatchPricesDecoder,
  getChaosLabsBatchPricesEncoder,
  type ChaosLabsBatchPrices,
  type ChaosLabsBatchPricesArgs,
} from '../types';

export const REMOVE_COLLATERAL_SHORT_DISCRIMINATOR = new Uint8Array([
  242, 74, 116, 29, 106, 148, 241, 205,
]);

export function getRemoveCollateralShortDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    REMOVE_COLLATERAL_SHORT_DISCRIMINATOR
  );
}

export type RemoveCollateralShortInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountReceivingAccount extends string | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountPosition extends string | IAccountMeta<string> = string,
  TAccountCustody extends string | IAccountMeta<string> = string,
  TAccountOracle extends string | IAccountMeta<string> = string,
  TAccountCollateralCustody extends string | IAccountMeta<string> = string,
  TAccountCollateralCustodyTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountAdrenaProgram extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountOwner extends string
        ? WritableSignerAccount<TAccountOwner> &
            IAccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountReceivingAccount extends string
        ? WritableAccount<TAccountReceivingAccount>
        : TAccountReceivingAccount,
      TAccountTransferAuthority extends string
        ? ReadonlyAccount<TAccountTransferAuthority>
        : TAccountTransferAuthority,
      TAccountCortex extends string
        ? WritableAccount<TAccountCortex>
        : TAccountCortex,
      TAccountPool extends string
        ? WritableAccount<TAccountPool>
        : TAccountPool,
      TAccountPosition extends string
        ? WritableAccount<TAccountPosition>
        : TAccountPosition,
      TAccountCustody extends string
        ? WritableAccount<TAccountCustody>
        : TAccountCustody,
      TAccountOracle extends string
        ? WritableAccount<TAccountOracle>
        : TAccountOracle,
      TAccountCollateralCustody extends string
        ? WritableAccount<TAccountCollateralCustody>
        : TAccountCollateralCustody,
      TAccountCollateralCustodyTokenAccount extends string
        ? WritableAccount<TAccountCollateralCustodyTokenAccount>
        : TAccountCollateralCustodyTokenAccount,
      TAccountAdrenaProgram extends string
        ? ReadonlyAccount<TAccountAdrenaProgram>
        : TAccountAdrenaProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type RemoveCollateralShortInstructionData = {
  discriminator: ReadonlyUint8Array;
  collateralUsd: bigint;
  oraclePrices: Option<ChaosLabsBatchPrices>;
};

export type RemoveCollateralShortInstructionDataArgs = {
  collateralUsd: number | bigint;
  oraclePrices: OptionOrNullable<ChaosLabsBatchPricesArgs>;
};

export function getRemoveCollateralShortInstructionDataEncoder(): Encoder<RemoveCollateralShortInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['collateralUsd', getU64Encoder()],
      ['oraclePrices', getOptionEncoder(getChaosLabsBatchPricesEncoder())],
    ]),
    (value) => ({
      ...value,
      discriminator: REMOVE_COLLATERAL_SHORT_DISCRIMINATOR,
    })
  );
}

export function getRemoveCollateralShortInstructionDataDecoder(): Decoder<RemoveCollateralShortInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['collateralUsd', getU64Decoder()],
    ['oraclePrices', getOptionDecoder(getChaosLabsBatchPricesDecoder())],
  ]);
}

export function getRemoveCollateralShortInstructionDataCodec(): Codec<
  RemoveCollateralShortInstructionDataArgs,
  RemoveCollateralShortInstructionData
> {
  return combineCodec(
    getRemoveCollateralShortInstructionDataEncoder(),
    getRemoveCollateralShortInstructionDataDecoder()
  );
}

export type RemoveCollateralShortInput<
  TAccountOwner extends string = string,
  TAccountReceivingAccount extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountPosition extends string = string,
  TAccountCustody extends string = string,
  TAccountOracle extends string = string,
  TAccountCollateralCustody extends string = string,
  TAccountCollateralCustodyTokenAccount extends string = string,
  TAccountAdrenaProgram extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** #1 */
  owner: TransactionSigner<TAccountOwner>;
  /** #2 */
  receivingAccount: Address<TAccountReceivingAccount>;
  /** #3 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #4 */
  cortex: Address<TAccountCortex>;
  /** #5 */
  pool: Address<TAccountPool>;
  /** #6 */
  position: Address<TAccountPosition>;
  /** #7 */
  custody: Address<TAccountCustody>;
  /** #8 */
  oracle: Address<TAccountOracle>;
  /** #9 */
  collateralCustody: Address<TAccountCollateralCustody>;
  /** #10 */
  collateralCustodyTokenAccount: Address<TAccountCollateralCustodyTokenAccount>;
  /** #11 */
  adrenaProgram: Address<TAccountAdrenaProgram>;
  /** #12 */
  tokenProgram?: Address<TAccountTokenProgram>;
  collateralUsd: RemoveCollateralShortInstructionDataArgs['collateralUsd'];
  oraclePrices: RemoveCollateralShortInstructionDataArgs['oraclePrices'];
};

export function getRemoveCollateralShortInstruction<
  TAccountOwner extends string,
  TAccountReceivingAccount extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountPosition extends string,
  TAccountCustody extends string,
  TAccountOracle extends string,
  TAccountCollateralCustody extends string,
  TAccountCollateralCustodyTokenAccount extends string,
  TAccountAdrenaProgram extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: RemoveCollateralShortInput<
    TAccountOwner,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountCustody,
    TAccountOracle,
    TAccountCollateralCustody,
    TAccountCollateralCustodyTokenAccount,
    TAccountAdrenaProgram,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): RemoveCollateralShortInstruction<
  TProgramAddress,
  TAccountOwner,
  TAccountReceivingAccount,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountPool,
  TAccountPosition,
  TAccountCustody,
  TAccountOracle,
  TAccountCollateralCustody,
  TAccountCollateralCustodyTokenAccount,
  TAccountAdrenaProgram,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    owner: { value: input.owner ?? null, isWritable: true },
    receivingAccount: {
      value: input.receivingAccount ?? null,
      isWritable: true,
    },
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    cortex: { value: input.cortex ?? null, isWritable: true },
    pool: { value: input.pool ?? null, isWritable: true },
    position: { value: input.position ?? null, isWritable: true },
    custody: { value: input.custody ?? null, isWritable: true },
    oracle: { value: input.oracle ?? null, isWritable: true },
    collateralCustody: {
      value: input.collateralCustody ?? null,
      isWritable: true,
    },
    collateralCustodyTokenAccount: {
      value: input.collateralCustodyTokenAccount ?? null,
      isWritable: true,
    },
    adrenaProgram: { value: input.adrenaProgram ?? null, isWritable: false },
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
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.receivingAccount),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.position),
      getAccountMeta(accounts.custody),
      getAccountMeta(accounts.oracle),
      getAccountMeta(accounts.collateralCustody),
      getAccountMeta(accounts.collateralCustodyTokenAccount),
      getAccountMeta(accounts.adrenaProgram),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getRemoveCollateralShortInstructionDataEncoder().encode(
      args as RemoveCollateralShortInstructionDataArgs
    ),
  } as RemoveCollateralShortInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountCustody,
    TAccountOracle,
    TAccountCollateralCustody,
    TAccountCollateralCustodyTokenAccount,
    TAccountAdrenaProgram,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedRemoveCollateralShortInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    owner: TAccountMetas[0];
    /** #2 */
    receivingAccount: TAccountMetas[1];
    /** #3 */
    transferAuthority: TAccountMetas[2];
    /** #4 */
    cortex: TAccountMetas[3];
    /** #5 */
    pool: TAccountMetas[4];
    /** #6 */
    position: TAccountMetas[5];
    /** #7 */
    custody: TAccountMetas[6];
    /** #8 */
    oracle: TAccountMetas[7];
    /** #9 */
    collateralCustody: TAccountMetas[8];
    /** #10 */
    collateralCustodyTokenAccount: TAccountMetas[9];
    /** #11 */
    adrenaProgram: TAccountMetas[10];
    /** #12 */
    tokenProgram: TAccountMetas[11];
  };
  data: RemoveCollateralShortInstructionData;
};

export function parseRemoveCollateralShortInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedRemoveCollateralShortInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 12) {
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
      owner: getNextAccount(),
      receivingAccount: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      position: getNextAccount(),
      custody: getNextAccount(),
      oracle: getNextAccount(),
      collateralCustody: getNextAccount(),
      collateralCustodyTokenAccount: getNextAccount(),
      adrenaProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getRemoveCollateralShortInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
