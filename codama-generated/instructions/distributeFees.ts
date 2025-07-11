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

export const DISTRIBUTE_FEES_DISCRIMINATOR = new Uint8Array([
  120, 56, 27, 7, 53, 176, 113, 186,
]);

export function getDistributeFeesDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    DISTRIBUTE_FEES_DISCRIMINATOR
  );
}

export type DistributeFeesInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountCaller extends string | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountLmStaking extends string | IAccountMeta<string> = string,
  TAccountLpStaking extends string | IAccountMeta<string> = string,
  TAccountLpTokenMint extends string | IAccountMeta<string> = string,
  TAccountLmTokenMint extends string | IAccountMeta<string> = string,
  TAccountFeeRedistributionMint extends string | IAccountMeta<string> = string,
  TAccountLmStakingRewardTokenVault extends
    | string
    | IAccountMeta<string> = string,
  TAccountLpStakingRewardTokenVault extends
    | string
    | IAccountMeta<string> = string,
  TAccountReferrerRewardTokenVault extends
    | string
    | IAccountMeta<string> = string,
  TAccountStakingRewardTokenCustody extends
    | string
    | IAccountMeta<string> = string,
  TAccountOracle extends string | IAccountMeta<string> = string,
  TAccountStakingRewardTokenCustodyTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountProtocolFeeRecipient extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountAdrenaProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountCaller extends string
        ? WritableSignerAccount<TAccountCaller> &
            IAccountSignerMeta<TAccountCaller>
        : TAccountCaller,
      TAccountTransferAuthority extends string
        ? ReadonlyAccount<TAccountTransferAuthority>
        : TAccountTransferAuthority,
      TAccountCortex extends string
        ? ReadonlyAccount<TAccountCortex>
        : TAccountCortex,
      TAccountPool extends string
        ? WritableAccount<TAccountPool>
        : TAccountPool,
      TAccountLmStaking extends string
        ? ReadonlyAccount<TAccountLmStaking>
        : TAccountLmStaking,
      TAccountLpStaking extends string
        ? WritableAccount<TAccountLpStaking>
        : TAccountLpStaking,
      TAccountLpTokenMint extends string
        ? ReadonlyAccount<TAccountLpTokenMint>
        : TAccountLpTokenMint,
      TAccountLmTokenMint extends string
        ? ReadonlyAccount<TAccountLmTokenMint>
        : TAccountLmTokenMint,
      TAccountFeeRedistributionMint extends string
        ? ReadonlyAccount<TAccountFeeRedistributionMint>
        : TAccountFeeRedistributionMint,
      TAccountLmStakingRewardTokenVault extends string
        ? WritableAccount<TAccountLmStakingRewardTokenVault>
        : TAccountLmStakingRewardTokenVault,
      TAccountLpStakingRewardTokenVault extends string
        ? WritableAccount<TAccountLpStakingRewardTokenVault>
        : TAccountLpStakingRewardTokenVault,
      TAccountReferrerRewardTokenVault extends string
        ? WritableAccount<TAccountReferrerRewardTokenVault>
        : TAccountReferrerRewardTokenVault,
      TAccountStakingRewardTokenCustody extends string
        ? WritableAccount<TAccountStakingRewardTokenCustody>
        : TAccountStakingRewardTokenCustody,
      TAccountOracle extends string
        ? WritableAccount<TAccountOracle>
        : TAccountOracle,
      TAccountStakingRewardTokenCustodyTokenAccount extends string
        ? WritableAccount<TAccountStakingRewardTokenCustodyTokenAccount>
        : TAccountStakingRewardTokenCustodyTokenAccount,
      TAccountProtocolFeeRecipient extends string
        ? WritableAccount<TAccountProtocolFeeRecipient>
        : TAccountProtocolFeeRecipient,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountAdrenaProgram extends string
        ? ReadonlyAccount<TAccountAdrenaProgram>
        : TAccountAdrenaProgram,
      ...TRemainingAccounts,
    ]
  >;

export type DistributeFeesInstructionData = {
  discriminator: ReadonlyUint8Array;
  oraclePrices: Option<ChaosLabsBatchPrices>;
};

export type DistributeFeesInstructionDataArgs = {
  oraclePrices: OptionOrNullable<ChaosLabsBatchPricesArgs>;
};

export function getDistributeFeesInstructionDataEncoder(): Encoder<DistributeFeesInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['oraclePrices', getOptionEncoder(getChaosLabsBatchPricesEncoder())],
    ]),
    (value) => ({ ...value, discriminator: DISTRIBUTE_FEES_DISCRIMINATOR })
  );
}

export function getDistributeFeesInstructionDataDecoder(): Decoder<DistributeFeesInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['oraclePrices', getOptionDecoder(getChaosLabsBatchPricesDecoder())],
  ]);
}

export function getDistributeFeesInstructionDataCodec(): Codec<
  DistributeFeesInstructionDataArgs,
  DistributeFeesInstructionData
> {
  return combineCodec(
    getDistributeFeesInstructionDataEncoder(),
    getDistributeFeesInstructionDataDecoder()
  );
}

export type DistributeFeesInput<
  TAccountCaller extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountLmStaking extends string = string,
  TAccountLpStaking extends string = string,
  TAccountLpTokenMint extends string = string,
  TAccountLmTokenMint extends string = string,
  TAccountFeeRedistributionMint extends string = string,
  TAccountLmStakingRewardTokenVault extends string = string,
  TAccountLpStakingRewardTokenVault extends string = string,
  TAccountReferrerRewardTokenVault extends string = string,
  TAccountStakingRewardTokenCustody extends string = string,
  TAccountOracle extends string = string,
  TAccountStakingRewardTokenCustodyTokenAccount extends string = string,
  TAccountProtocolFeeRecipient extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountAdrenaProgram extends string = string,
> = {
  /**
   * #1
   * Anyone can call this instruction
   */
  caller: TransactionSigner<TAccountCaller>;
  /** #2 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #3 */
  cortex: Address<TAccountCortex>;
  /** #4 */
  pool: Address<TAccountPool>;
  /** #5 */
  lmStaking: Address<TAccountLmStaking>;
  /** #6 */
  lpStaking: Address<TAccountLpStaking>;
  /** #7 */
  lpTokenMint: Address<TAccountLpTokenMint>;
  /** #8 */
  lmTokenMint: Address<TAccountLmTokenMint>;
  /** #9 */
  feeRedistributionMint: Address<TAccountFeeRedistributionMint>;
  /** #10 */
  lmStakingRewardTokenVault: Address<TAccountLmStakingRewardTokenVault>;
  /** #11 */
  lpStakingRewardTokenVault: Address<TAccountLpStakingRewardTokenVault>;
  /** #12 */
  referrerRewardTokenVault: Address<TAccountReferrerRewardTokenVault>;
  /** #13 */
  stakingRewardTokenCustody: Address<TAccountStakingRewardTokenCustody>;
  /** #14 */
  oracle: Address<TAccountOracle>;
  /** #15 */
  stakingRewardTokenCustodyTokenAccount: Address<TAccountStakingRewardTokenCustodyTokenAccount>;
  /** #16 */
  protocolFeeRecipient: Address<TAccountProtocolFeeRecipient>;
  /** #17 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #18 */
  systemProgram?: Address<TAccountSystemProgram>;
  /** #19 */
  adrenaProgram: Address<TAccountAdrenaProgram>;
  oraclePrices: DistributeFeesInstructionDataArgs['oraclePrices'];
};

export function getDistributeFeesInstruction<
  TAccountCaller extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountLmStaking extends string,
  TAccountLpStaking extends string,
  TAccountLpTokenMint extends string,
  TAccountLmTokenMint extends string,
  TAccountFeeRedistributionMint extends string,
  TAccountLmStakingRewardTokenVault extends string,
  TAccountLpStakingRewardTokenVault extends string,
  TAccountReferrerRewardTokenVault extends string,
  TAccountStakingRewardTokenCustody extends string,
  TAccountOracle extends string,
  TAccountStakingRewardTokenCustodyTokenAccount extends string,
  TAccountProtocolFeeRecipient extends string,
  TAccountTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountAdrenaProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: DistributeFeesInput<
    TAccountCaller,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountLmStaking,
    TAccountLpStaking,
    TAccountLpTokenMint,
    TAccountLmTokenMint,
    TAccountFeeRedistributionMint,
    TAccountLmStakingRewardTokenVault,
    TAccountLpStakingRewardTokenVault,
    TAccountReferrerRewardTokenVault,
    TAccountStakingRewardTokenCustody,
    TAccountOracle,
    TAccountStakingRewardTokenCustodyTokenAccount,
    TAccountProtocolFeeRecipient,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountAdrenaProgram
  >,
  config?: { programAddress?: TProgramAddress }
): DistributeFeesInstruction<
  TProgramAddress,
  TAccountCaller,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountPool,
  TAccountLmStaking,
  TAccountLpStaking,
  TAccountLpTokenMint,
  TAccountLmTokenMint,
  TAccountFeeRedistributionMint,
  TAccountLmStakingRewardTokenVault,
  TAccountLpStakingRewardTokenVault,
  TAccountReferrerRewardTokenVault,
  TAccountStakingRewardTokenCustody,
  TAccountOracle,
  TAccountStakingRewardTokenCustodyTokenAccount,
  TAccountProtocolFeeRecipient,
  TAccountTokenProgram,
  TAccountSystemProgram,
  TAccountAdrenaProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    caller: { value: input.caller ?? null, isWritable: true },
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    cortex: { value: input.cortex ?? null, isWritable: false },
    pool: { value: input.pool ?? null, isWritable: true },
    lmStaking: { value: input.lmStaking ?? null, isWritable: false },
    lpStaking: { value: input.lpStaking ?? null, isWritable: true },
    lpTokenMint: { value: input.lpTokenMint ?? null, isWritable: false },
    lmTokenMint: { value: input.lmTokenMint ?? null, isWritable: false },
    feeRedistributionMint: {
      value: input.feeRedistributionMint ?? null,
      isWritable: false,
    },
    lmStakingRewardTokenVault: {
      value: input.lmStakingRewardTokenVault ?? null,
      isWritable: true,
    },
    lpStakingRewardTokenVault: {
      value: input.lpStakingRewardTokenVault ?? null,
      isWritable: true,
    },
    referrerRewardTokenVault: {
      value: input.referrerRewardTokenVault ?? null,
      isWritable: true,
    },
    stakingRewardTokenCustody: {
      value: input.stakingRewardTokenCustody ?? null,
      isWritable: true,
    },
    oracle: { value: input.oracle ?? null, isWritable: true },
    stakingRewardTokenCustodyTokenAccount: {
      value: input.stakingRewardTokenCustodyTokenAccount ?? null,
      isWritable: true,
    },
    protocolFeeRecipient: {
      value: input.protocolFeeRecipient ?? null,
      isWritable: true,
    },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    adrenaProgram: { value: input.adrenaProgram ?? null, isWritable: false },
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
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.caller),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.lmStaking),
      getAccountMeta(accounts.lpStaking),
      getAccountMeta(accounts.lpTokenMint),
      getAccountMeta(accounts.lmTokenMint),
      getAccountMeta(accounts.feeRedistributionMint),
      getAccountMeta(accounts.lmStakingRewardTokenVault),
      getAccountMeta(accounts.lpStakingRewardTokenVault),
      getAccountMeta(accounts.referrerRewardTokenVault),
      getAccountMeta(accounts.stakingRewardTokenCustody),
      getAccountMeta(accounts.oracle),
      getAccountMeta(accounts.stakingRewardTokenCustodyTokenAccount),
      getAccountMeta(accounts.protocolFeeRecipient),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.adrenaProgram),
    ],
    programAddress,
    data: getDistributeFeesInstructionDataEncoder().encode(
      args as DistributeFeesInstructionDataArgs
    ),
  } as DistributeFeesInstruction<
    TProgramAddress,
    TAccountCaller,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountLmStaking,
    TAccountLpStaking,
    TAccountLpTokenMint,
    TAccountLmTokenMint,
    TAccountFeeRedistributionMint,
    TAccountLmStakingRewardTokenVault,
    TAccountLpStakingRewardTokenVault,
    TAccountReferrerRewardTokenVault,
    TAccountStakingRewardTokenCustody,
    TAccountOracle,
    TAccountStakingRewardTokenCustodyTokenAccount,
    TAccountProtocolFeeRecipient,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountAdrenaProgram
  >;

  return instruction;
}

export type ParsedDistributeFeesInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /**
     * #1
     * Anyone can call this instruction
     */

    caller: TAccountMetas[0];
    /** #2 */
    transferAuthority: TAccountMetas[1];
    /** #3 */
    cortex: TAccountMetas[2];
    /** #4 */
    pool: TAccountMetas[3];
    /** #5 */
    lmStaking: TAccountMetas[4];
    /** #6 */
    lpStaking: TAccountMetas[5];
    /** #7 */
    lpTokenMint: TAccountMetas[6];
    /** #8 */
    lmTokenMint: TAccountMetas[7];
    /** #9 */
    feeRedistributionMint: TAccountMetas[8];
    /** #10 */
    lmStakingRewardTokenVault: TAccountMetas[9];
    /** #11 */
    lpStakingRewardTokenVault: TAccountMetas[10];
    /** #12 */
    referrerRewardTokenVault: TAccountMetas[11];
    /** #13 */
    stakingRewardTokenCustody: TAccountMetas[12];
    /** #14 */
    oracle: TAccountMetas[13];
    /** #15 */
    stakingRewardTokenCustodyTokenAccount: TAccountMetas[14];
    /** #16 */
    protocolFeeRecipient: TAccountMetas[15];
    /** #17 */
    tokenProgram: TAccountMetas[16];
    /** #18 */
    systemProgram: TAccountMetas[17];
    /** #19 */
    adrenaProgram: TAccountMetas[18];
  };
  data: DistributeFeesInstructionData;
};

export function parseDistributeFeesInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedDistributeFeesInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 19) {
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
      caller: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      lmStaking: getNextAccount(),
      lpStaking: getNextAccount(),
      lpTokenMint: getNextAccount(),
      lmTokenMint: getNextAccount(),
      feeRedistributionMint: getNextAccount(),
      lmStakingRewardTokenVault: getNextAccount(),
      lpStakingRewardTokenVault: getNextAccount(),
      referrerRewardTokenVault: getNextAccount(),
      stakingRewardTokenCustody: getNextAccount(),
      oracle: getNextAccount(),
      stakingRewardTokenCustodyTokenAccount: getNextAccount(),
      protocolFeeRecipient: getNextAccount(),
      tokenProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      adrenaProgram: getNextAccount(),
    },
    data: getDistributeFeesInstructionDataDecoder().decode(instruction.data),
  };
}
