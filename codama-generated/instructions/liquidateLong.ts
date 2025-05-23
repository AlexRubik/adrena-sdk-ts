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
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { ADRENA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const LIQUIDATE_LONG_DISCRIMINATOR = new Uint8Array([
  132, 118, 230, 137, 241, 193, 136, 93,
]);

export function getLiquidateLongDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    LIQUIDATE_LONG_DISCRIMINATOR
  );
}

export type LiquidateLongInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountSigner extends string | IAccountMeta<string> = string,
  TAccountReceivingAccount extends string | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountPosition extends string | IAccountMeta<string> = string,
  TAccountCustody extends string | IAccountMeta<string> = string,
  TAccountCustodyOracle extends string | IAccountMeta<string> = string,
  TAccountCustodyTradeOracle extends string | IAccountMeta<string> = string,
  TAccountCustodyTokenAccount extends string | IAccountMeta<string> = string,
  TAccountUserProfile extends string | IAccountMeta<string> = string,
  TAccountReferrerProfile extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountAdrenaProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountSigner extends string
        ? WritableSignerAccount<TAccountSigner> &
            IAccountSignerMeta<TAccountSigner>
        : TAccountSigner,
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
      TAccountCustodyOracle extends string
        ? ReadonlyAccount<TAccountCustodyOracle>
        : TAccountCustodyOracle,
      TAccountCustodyTradeOracle extends string
        ? ReadonlyAccount<TAccountCustodyTradeOracle>
        : TAccountCustodyTradeOracle,
      TAccountCustodyTokenAccount extends string
        ? WritableAccount<TAccountCustodyTokenAccount>
        : TAccountCustodyTokenAccount,
      TAccountUserProfile extends string
        ? WritableAccount<TAccountUserProfile>
        : TAccountUserProfile,
      TAccountReferrerProfile extends string
        ? WritableAccount<TAccountReferrerProfile>
        : TAccountReferrerProfile,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountAdrenaProgram extends string
        ? ReadonlyAccount<TAccountAdrenaProgram>
        : TAccountAdrenaProgram,
      ...TRemainingAccounts,
    ]
  >;

export type LiquidateLongInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type LiquidateLongInstructionDataArgs = {};

export function getLiquidateLongInstructionDataEncoder(): Encoder<LiquidateLongInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: LIQUIDATE_LONG_DISCRIMINATOR })
  );
}

export function getLiquidateLongInstructionDataDecoder(): Decoder<LiquidateLongInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getLiquidateLongInstructionDataCodec(): Codec<
  LiquidateLongInstructionDataArgs,
  LiquidateLongInstructionData
> {
  return combineCodec(
    getLiquidateLongInstructionDataEncoder(),
    getLiquidateLongInstructionDataDecoder()
  );
}

export type LiquidateLongInput<
  TAccountSigner extends string = string,
  TAccountReceivingAccount extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountPosition extends string = string,
  TAccountCustody extends string = string,
  TAccountCustodyOracle extends string = string,
  TAccountCustodyTradeOracle extends string = string,
  TAccountCustodyTokenAccount extends string = string,
  TAccountUserProfile extends string = string,
  TAccountReferrerProfile extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountAdrenaProgram extends string = string,
> = {
  /** #1 */
  signer: TransactionSigner<TAccountSigner>;
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
  custodyOracle: Address<TAccountCustodyOracle>;
  /** #9 */
  custodyTradeOracle: Address<TAccountCustodyTradeOracle>;
  /** #10 */
  custodyTokenAccount: Address<TAccountCustodyTokenAccount>;
  /** #11 */
  userProfile?: Address<TAccountUserProfile>;
  /** #12 */
  referrerProfile?: Address<TAccountReferrerProfile>;
  /** #13 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #14 */
  adrenaProgram: Address<TAccountAdrenaProgram>;
};

export function getLiquidateLongInstruction<
  TAccountSigner extends string,
  TAccountReceivingAccount extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountPosition extends string,
  TAccountCustody extends string,
  TAccountCustodyOracle extends string,
  TAccountCustodyTradeOracle extends string,
  TAccountCustodyTokenAccount extends string,
  TAccountUserProfile extends string,
  TAccountReferrerProfile extends string,
  TAccountTokenProgram extends string,
  TAccountAdrenaProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: LiquidateLongInput<
    TAccountSigner,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountCustody,
    TAccountCustodyOracle,
    TAccountCustodyTradeOracle,
    TAccountCustodyTokenAccount,
    TAccountUserProfile,
    TAccountReferrerProfile,
    TAccountTokenProgram,
    TAccountAdrenaProgram
  >,
  config?: { programAddress?: TProgramAddress }
): LiquidateLongInstruction<
  TProgramAddress,
  TAccountSigner,
  TAccountReceivingAccount,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountPool,
  TAccountPosition,
  TAccountCustody,
  TAccountCustodyOracle,
  TAccountCustodyTradeOracle,
  TAccountCustodyTokenAccount,
  TAccountUserProfile,
  TAccountReferrerProfile,
  TAccountTokenProgram,
  TAccountAdrenaProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    signer: { value: input.signer ?? null, isWritable: true },
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
    custodyOracle: { value: input.custodyOracle ?? null, isWritable: false },
    custodyTradeOracle: {
      value: input.custodyTradeOracle ?? null,
      isWritable: false,
    },
    custodyTokenAccount: {
      value: input.custodyTokenAccount ?? null,
      isWritable: true,
    },
    userProfile: { value: input.userProfile ?? null, isWritable: true },
    referrerProfile: { value: input.referrerProfile ?? null, isWritable: true },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    adrenaProgram: { value: input.adrenaProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.signer),
      getAccountMeta(accounts.receivingAccount),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.position),
      getAccountMeta(accounts.custody),
      getAccountMeta(accounts.custodyOracle),
      getAccountMeta(accounts.custodyTradeOracle),
      getAccountMeta(accounts.custodyTokenAccount),
      getAccountMeta(accounts.userProfile),
      getAccountMeta(accounts.referrerProfile),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.adrenaProgram),
    ],
    programAddress,
    data: getLiquidateLongInstructionDataEncoder().encode({}),
  } as LiquidateLongInstruction<
    TProgramAddress,
    TAccountSigner,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountCustody,
    TAccountCustodyOracle,
    TAccountCustodyTradeOracle,
    TAccountCustodyTokenAccount,
    TAccountUserProfile,
    TAccountReferrerProfile,
    TAccountTokenProgram,
    TAccountAdrenaProgram
  >;

  return instruction;
}

export type ParsedLiquidateLongInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    signer: TAccountMetas[0];
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
    custodyOracle: TAccountMetas[7];
    /** #9 */
    custodyTradeOracle: TAccountMetas[8];
    /** #10 */
    custodyTokenAccount: TAccountMetas[9];
    /** #11 */
    userProfile?: TAccountMetas[10] | undefined;
    /** #12 */
    referrerProfile?: TAccountMetas[11] | undefined;
    /** #13 */
    tokenProgram: TAccountMetas[12];
    /** #14 */
    adrenaProgram: TAccountMetas[13];
  };
  data: LiquidateLongInstructionData;
};

export function parseLiquidateLongInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedLiquidateLongInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 14) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  const getNextOptionalAccount = () => {
    const accountMeta = getNextAccount();
    return accountMeta.address === ADRENA_PROGRAM_ADDRESS
      ? undefined
      : accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      signer: getNextAccount(),
      receivingAccount: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      position: getNextAccount(),
      custody: getNextAccount(),
      custodyOracle: getNextAccount(),
      custodyTradeOracle: getNextAccount(),
      custodyTokenAccount: getNextAccount(),
      userProfile: getNextOptionalAccount(),
      referrerProfile: getNextOptionalAccount(),
      tokenProgram: getNextAccount(),
      adrenaProgram: getNextAccount(),
    },
    data: getLiquidateLongInstructionDataDecoder().decode(instruction.data),
  };
}
