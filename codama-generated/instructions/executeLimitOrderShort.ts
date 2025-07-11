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

export const EXECUTE_LIMIT_ORDER_SHORT_DISCRIMINATOR = new Uint8Array([
  160, 217, 227, 39, 232, 61, 21, 253,
]);

export function getExecuteLimitOrderShortDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    EXECUTE_LIMIT_ORDER_SHORT_DISCRIMINATOR
  );
}

export type ExecuteLimitOrderShortInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountCaller extends string | IAccountMeta<string> = string,
  TAccountCollateralEscrow extends string | IAccountMeta<string> = string,
  TAccountCustody extends string | IAccountMeta<string> = string,
  TAccountOracle extends string | IAccountMeta<string> = string,
  TAccountCollateralCustody extends string | IAccountMeta<string> = string,
  TAccountCollateralCustodyTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountPosition extends string | IAccountMeta<string> = string,
  TAccountLimitOrderBook extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountAdrenaProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountOwner extends string
        ? WritableAccount<TAccountOwner>
        : TAccountOwner,
      TAccountCaller extends string
        ? WritableSignerAccount<TAccountCaller> &
            IAccountSignerMeta<TAccountCaller>
        : TAccountCaller,
      TAccountCollateralEscrow extends string
        ? WritableAccount<TAccountCollateralEscrow>
        : TAccountCollateralEscrow,
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
      TAccountLimitOrderBook extends string
        ? WritableAccount<TAccountLimitOrderBook>
        : TAccountLimitOrderBook,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountAdrenaProgram extends string
        ? ReadonlyAccount<TAccountAdrenaProgram>
        : TAccountAdrenaProgram,
      ...TRemainingAccounts,
    ]
  >;

export type ExecuteLimitOrderShortInstructionData = {
  discriminator: ReadonlyUint8Array;
  id: bigint;
  oraclePrices: Option<ChaosLabsBatchPrices>;
};

export type ExecuteLimitOrderShortInstructionDataArgs = {
  id: number | bigint;
  oraclePrices: OptionOrNullable<ChaosLabsBatchPricesArgs>;
};

export function getExecuteLimitOrderShortInstructionDataEncoder(): Encoder<ExecuteLimitOrderShortInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['id', getU64Encoder()],
      ['oraclePrices', getOptionEncoder(getChaosLabsBatchPricesEncoder())],
    ]),
    (value) => ({
      ...value,
      discriminator: EXECUTE_LIMIT_ORDER_SHORT_DISCRIMINATOR,
    })
  );
}

export function getExecuteLimitOrderShortInstructionDataDecoder(): Decoder<ExecuteLimitOrderShortInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['id', getU64Decoder()],
    ['oraclePrices', getOptionDecoder(getChaosLabsBatchPricesDecoder())],
  ]);
}

export function getExecuteLimitOrderShortInstructionDataCodec(): Codec<
  ExecuteLimitOrderShortInstructionDataArgs,
  ExecuteLimitOrderShortInstructionData
> {
  return combineCodec(
    getExecuteLimitOrderShortInstructionDataEncoder(),
    getExecuteLimitOrderShortInstructionDataDecoder()
  );
}

export type ExecuteLimitOrderShortInput<
  TAccountOwner extends string = string,
  TAccountCaller extends string = string,
  TAccountCollateralEscrow extends string = string,
  TAccountCustody extends string = string,
  TAccountOracle extends string = string,
  TAccountCollateralCustody extends string = string,
  TAccountCollateralCustodyTokenAccount extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountPosition extends string = string,
  TAccountLimitOrderBook extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountAdrenaProgram extends string = string,
> = {
  /** #1 */
  owner: Address<TAccountOwner>;
  /** #2 */
  caller: TransactionSigner<TAccountCaller>;
  /** #3 */
  collateralEscrow: Address<TAccountCollateralEscrow>;
  /** #4 */
  custody: Address<TAccountCustody>;
  /** #5 */
  oracle: Address<TAccountOracle>;
  /** #6 */
  collateralCustody: Address<TAccountCollateralCustody>;
  /** #7 */
  collateralCustodyTokenAccount: Address<TAccountCollateralCustodyTokenAccount>;
  /** #8 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #9 */
  cortex: Address<TAccountCortex>;
  /** #10 */
  pool: Address<TAccountPool>;
  /** #11 */
  position: Address<TAccountPosition>;
  /** #12 */
  limitOrderBook: Address<TAccountLimitOrderBook>;
  /** #13 */
  systemProgram?: Address<TAccountSystemProgram>;
  /** #14 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #15 */
  adrenaProgram: Address<TAccountAdrenaProgram>;
  id: ExecuteLimitOrderShortInstructionDataArgs['id'];
  oraclePrices: ExecuteLimitOrderShortInstructionDataArgs['oraclePrices'];
};

export function getExecuteLimitOrderShortInstruction<
  TAccountOwner extends string,
  TAccountCaller extends string,
  TAccountCollateralEscrow extends string,
  TAccountCustody extends string,
  TAccountOracle extends string,
  TAccountCollateralCustody extends string,
  TAccountCollateralCustodyTokenAccount extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountPosition extends string,
  TAccountLimitOrderBook extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountAdrenaProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: ExecuteLimitOrderShortInput<
    TAccountOwner,
    TAccountCaller,
    TAccountCollateralEscrow,
    TAccountCustody,
    TAccountOracle,
    TAccountCollateralCustody,
    TAccountCollateralCustodyTokenAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountLimitOrderBook,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAdrenaProgram
  >,
  config?: { programAddress?: TProgramAddress }
): ExecuteLimitOrderShortInstruction<
  TProgramAddress,
  TAccountOwner,
  TAccountCaller,
  TAccountCollateralEscrow,
  TAccountCustody,
  TAccountOracle,
  TAccountCollateralCustody,
  TAccountCollateralCustodyTokenAccount,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountPool,
  TAccountPosition,
  TAccountLimitOrderBook,
  TAccountSystemProgram,
  TAccountTokenProgram,
  TAccountAdrenaProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    owner: { value: input.owner ?? null, isWritable: true },
    caller: { value: input.caller ?? null, isWritable: true },
    collateralEscrow: {
      value: input.collateralEscrow ?? null,
      isWritable: true,
    },
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
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    cortex: { value: input.cortex ?? null, isWritable: true },
    pool: { value: input.pool ?? null, isWritable: true },
    position: { value: input.position ?? null, isWritable: true },
    limitOrderBook: { value: input.limitOrderBook ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    adrenaProgram: { value: input.adrenaProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.caller),
      getAccountMeta(accounts.collateralEscrow),
      getAccountMeta(accounts.custody),
      getAccountMeta(accounts.oracle),
      getAccountMeta(accounts.collateralCustody),
      getAccountMeta(accounts.collateralCustodyTokenAccount),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.position),
      getAccountMeta(accounts.limitOrderBook),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.adrenaProgram),
    ],
    programAddress,
    data: getExecuteLimitOrderShortInstructionDataEncoder().encode(
      args as ExecuteLimitOrderShortInstructionDataArgs
    ),
  } as ExecuteLimitOrderShortInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountCaller,
    TAccountCollateralEscrow,
    TAccountCustody,
    TAccountOracle,
    TAccountCollateralCustody,
    TAccountCollateralCustodyTokenAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountLimitOrderBook,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAdrenaProgram
  >;

  return instruction;
}

export type ParsedExecuteLimitOrderShortInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    owner: TAccountMetas[0];
    /** #2 */
    caller: TAccountMetas[1];
    /** #3 */
    collateralEscrow: TAccountMetas[2];
    /** #4 */
    custody: TAccountMetas[3];
    /** #5 */
    oracle: TAccountMetas[4];
    /** #6 */
    collateralCustody: TAccountMetas[5];
    /** #7 */
    collateralCustodyTokenAccount: TAccountMetas[6];
    /** #8 */
    transferAuthority: TAccountMetas[7];
    /** #9 */
    cortex: TAccountMetas[8];
    /** #10 */
    pool: TAccountMetas[9];
    /** #11 */
    position: TAccountMetas[10];
    /** #12 */
    limitOrderBook: TAccountMetas[11];
    /** #13 */
    systemProgram: TAccountMetas[12];
    /** #14 */
    tokenProgram: TAccountMetas[13];
    /** #15 */
    adrenaProgram: TAccountMetas[14];
  };
  data: ExecuteLimitOrderShortInstructionData;
};

export function parseExecuteLimitOrderShortInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedExecuteLimitOrderShortInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 15) {
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
      caller: getNextAccount(),
      collateralEscrow: getNextAccount(),
      custody: getNextAccount(),
      oracle: getNextAccount(),
      collateralCustody: getNextAccount(),
      collateralCustodyTokenAccount: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      position: getNextAccount(),
      limitOrderBook: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      adrenaProgram: getNextAccount(),
    },
    data: getExecuteLimitOrderShortInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
