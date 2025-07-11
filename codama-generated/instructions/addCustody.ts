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
  getArrayDecoder,
  getArrayEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
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
import {
  getBorrowRateParamsDecoder,
  getBorrowRateParamsEncoder,
  getFeesDecoder,
  getFeesEncoder,
  getLimitedStringDecoder,
  getLimitedStringEncoder,
  getPricingParamsDecoder,
  getPricingParamsEncoder,
  getTokenRatiosDecoder,
  getTokenRatiosEncoder,
  type BorrowRateParams,
  type BorrowRateParamsArgs,
  type Fees,
  type FeesArgs,
  type LimitedString,
  type LimitedStringArgs,
  type PricingParams,
  type PricingParamsArgs,
  type TokenRatios,
  type TokenRatiosArgs,
} from '../types';

export const ADD_CUSTODY_DISCRIMINATOR = new Uint8Array([
  247, 254, 126, 17, 26, 6, 215, 117,
]);

export function getAddCustodyDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(ADD_CUSTODY_DISCRIMINATOR);
}

export type AddCustodyInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountCustody extends string | IAccountMeta<string> = string,
  TAccountCustodyTokenAccount extends string | IAccountMeta<string> = string,
  TAccountOracle extends string | IAccountMeta<string> = string,
  TAccountCustodyTokenMint extends string | IAccountMeta<string> = string,
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
      TAccountPool extends string
        ? WritableAccount<TAccountPool>
        : TAccountPool,
      TAccountCustody extends string
        ? WritableAccount<TAccountCustody>
        : TAccountCustody,
      TAccountCustodyTokenAccount extends string
        ? WritableAccount<TAccountCustodyTokenAccount>
        : TAccountCustodyTokenAccount,
      TAccountOracle extends string
        ? WritableAccount<TAccountOracle>
        : TAccountOracle,
      TAccountCustodyTokenMint extends string
        ? ReadonlyAccount<TAccountCustodyTokenMint>
        : TAccountCustodyTokenMint,
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

export type AddCustodyInstructionData = {
  discriminator: ReadonlyUint8Array;
  isStable: boolean;
  pricing: PricingParams;
  allowSwap: boolean;
  allowTrade: boolean;
  fees: Fees;
  borrowRate: BorrowRateParams;
  ratios: Array<TokenRatios>;
  oracle: LimitedString;
  tradeOracle: LimitedString;
};

export type AddCustodyInstructionDataArgs = {
  isStable: boolean;
  pricing: PricingParamsArgs;
  allowSwap: boolean;
  allowTrade: boolean;
  fees: FeesArgs;
  borrowRate: BorrowRateParamsArgs;
  ratios: Array<TokenRatiosArgs>;
  oracle: LimitedStringArgs;
  tradeOracle: LimitedStringArgs;
};

export function getAddCustodyInstructionDataEncoder(): Encoder<AddCustodyInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['isStable', getBooleanEncoder()],
      ['pricing', getPricingParamsEncoder()],
      ['allowSwap', getBooleanEncoder()],
      ['allowTrade', getBooleanEncoder()],
      ['fees', getFeesEncoder()],
      ['borrowRate', getBorrowRateParamsEncoder()],
      ['ratios', getArrayEncoder(getTokenRatiosEncoder(), { size: 8 })],
      ['oracle', getLimitedStringEncoder()],
      ['tradeOracle', getLimitedStringEncoder()],
    ]),
    (value) => ({ ...value, discriminator: ADD_CUSTODY_DISCRIMINATOR })
  );
}

export function getAddCustodyInstructionDataDecoder(): Decoder<AddCustodyInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['isStable', getBooleanDecoder()],
    ['pricing', getPricingParamsDecoder()],
    ['allowSwap', getBooleanDecoder()],
    ['allowTrade', getBooleanDecoder()],
    ['fees', getFeesDecoder()],
    ['borrowRate', getBorrowRateParamsDecoder()],
    ['ratios', getArrayDecoder(getTokenRatiosDecoder(), { size: 8 })],
    ['oracle', getLimitedStringDecoder()],
    ['tradeOracle', getLimitedStringDecoder()],
  ]);
}

export function getAddCustodyInstructionDataCodec(): Codec<
  AddCustodyInstructionDataArgs,
  AddCustodyInstructionData
> {
  return combineCodec(
    getAddCustodyInstructionDataEncoder(),
    getAddCustodyInstructionDataDecoder()
  );
}

export type AddCustodyInput<
  TAccountAdmin extends string = string,
  TAccountPayer extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountCustody extends string = string,
  TAccountCustodyTokenAccount extends string = string,
  TAccountOracle extends string = string,
  TAccountCustodyTokenMint extends string = string,
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
  pool: Address<TAccountPool>;
  /** #6 */
  custody: Address<TAccountCustody>;
  /** #7 */
  custodyTokenAccount: Address<TAccountCustodyTokenAccount>;
  /** #8 */
  oracle: Address<TAccountOracle>;
  /** #9 */
  custodyTokenMint: Address<TAccountCustodyTokenMint>;
  /** #10 */
  systemProgram?: Address<TAccountSystemProgram>;
  /** #11 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #12 */
  rent?: Address<TAccountRent>;
  isStable: AddCustodyInstructionDataArgs['isStable'];
  pricing: AddCustodyInstructionDataArgs['pricing'];
  allowSwap: AddCustodyInstructionDataArgs['allowSwap'];
  allowTrade: AddCustodyInstructionDataArgs['allowTrade'];
  fees: AddCustodyInstructionDataArgs['fees'];
  borrowRate: AddCustodyInstructionDataArgs['borrowRate'];
  ratios: AddCustodyInstructionDataArgs['ratios'];
  oracleArg: AddCustodyInstructionDataArgs['oracle'];
  tradeOracle: AddCustodyInstructionDataArgs['tradeOracle'];
};

export function getAddCustodyInstruction<
  TAccountAdmin extends string,
  TAccountPayer extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountCustody extends string,
  TAccountCustodyTokenAccount extends string,
  TAccountOracle extends string,
  TAccountCustodyTokenMint extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountRent extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: AddCustodyInput<
    TAccountAdmin,
    TAccountPayer,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountCustody,
    TAccountCustodyTokenAccount,
    TAccountOracle,
    TAccountCustodyTokenMint,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountRent
  >,
  config?: { programAddress?: TProgramAddress }
): AddCustodyInstruction<
  TProgramAddress,
  TAccountAdmin,
  TAccountPayer,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountPool,
  TAccountCustody,
  TAccountCustodyTokenAccount,
  TAccountOracle,
  TAccountCustodyTokenMint,
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
    pool: { value: input.pool ?? null, isWritable: true },
    custody: { value: input.custody ?? null, isWritable: true },
    custodyTokenAccount: {
      value: input.custodyTokenAccount ?? null,
      isWritable: true,
    },
    oracle: { value: input.oracle ?? null, isWritable: true },
    custodyTokenMint: {
      value: input.custodyTokenMint ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    rent: { value: input.rent ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input, oracle: input.oracleArg };

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
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.custody),
      getAccountMeta(accounts.custodyTokenAccount),
      getAccountMeta(accounts.oracle),
      getAccountMeta(accounts.custodyTokenMint),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.rent),
    ],
    programAddress,
    data: getAddCustodyInstructionDataEncoder().encode(
      args as AddCustodyInstructionDataArgs
    ),
  } as AddCustodyInstruction<
    TProgramAddress,
    TAccountAdmin,
    TAccountPayer,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountCustody,
    TAccountCustodyTokenAccount,
    TAccountOracle,
    TAccountCustodyTokenMint,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountRent
  >;

  return instruction;
}

export type ParsedAddCustodyInstruction<
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
    pool: TAccountMetas[4];
    /** #6 */
    custody: TAccountMetas[5];
    /** #7 */
    custodyTokenAccount: TAccountMetas[6];
    /** #8 */
    oracle: TAccountMetas[7];
    /** #9 */
    custodyTokenMint: TAccountMetas[8];
    /** #10 */
    systemProgram: TAccountMetas[9];
    /** #11 */
    tokenProgram: TAccountMetas[10];
    /** #12 */
    rent: TAccountMetas[11];
  };
  data: AddCustodyInstructionData;
};

export function parseAddCustodyInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedAddCustodyInstruction<TProgram, TAccountMetas> {
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
      admin: getNextAccount(),
      payer: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      custody: getNextAccount(),
      custodyTokenAccount: getNextAccount(),
      oracle: getNextAccount(),
      custodyTokenMint: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      rent: getNextAccount(),
    },
    data: getAddCustodyInstructionDataDecoder().decode(instruction.data),
  };
}
