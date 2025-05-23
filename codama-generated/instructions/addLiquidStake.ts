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
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { ADRENA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const ADD_LIQUID_STAKE_DISCRIMINATOR = new Uint8Array([
  255, 64, 163, 23, 209, 84, 185, 124,
]);

export function getAddLiquidStakeDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    ADD_LIQUID_STAKE_DISCRIMINATOR
  );
}

export type AddLiquidStakeInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountFundingAccount extends string | IAccountMeta<string> = string,
  TAccountRewardTokenAccount extends string | IAccountMeta<string> = string,
  TAccountLmTokenAccount extends string | IAccountMeta<string> = string,
  TAccountStakingStakedTokenVault extends
    | string
    | IAccountMeta<string> = string,
  TAccountStakingRewardTokenVault extends
    | string
    | IAccountMeta<string> = string,
  TAccountStakingLmRewardTokenVault extends
    | string
    | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountUserStaking extends string | IAccountMeta<string> = string,
  TAccountStaking extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountGenesisLock extends string | IAccountMeta<string> = string,
  TAccountLmTokenMint extends string | IAccountMeta<string> = string,
  TAccountGovernanceTokenMint extends string | IAccountMeta<string> = string,
  TAccountFeeRedistributionMint extends string | IAccountMeta<string> = string,
  TAccountGovernanceRealm extends string | IAccountMeta<string> = string,
  TAccountGovernanceRealmConfig extends string | IAccountMeta<string> = string,
  TAccountGovernanceGoverningTokenHolding extends
    | string
    | IAccountMeta<string> = string,
  TAccountGovernanceGoverningTokenOwnerRecord extends
    | string
    | IAccountMeta<string> = string,
  TAccountGovernanceProgram extends string | IAccountMeta<string> = string,
  TAccountAdrenaProgram extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
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
      TAccountFundingAccount extends string
        ? WritableAccount<TAccountFundingAccount>
        : TAccountFundingAccount,
      TAccountRewardTokenAccount extends string
        ? WritableAccount<TAccountRewardTokenAccount>
        : TAccountRewardTokenAccount,
      TAccountLmTokenAccount extends string
        ? WritableAccount<TAccountLmTokenAccount>
        : TAccountLmTokenAccount,
      TAccountStakingStakedTokenVault extends string
        ? WritableAccount<TAccountStakingStakedTokenVault>
        : TAccountStakingStakedTokenVault,
      TAccountStakingRewardTokenVault extends string
        ? WritableAccount<TAccountStakingRewardTokenVault>
        : TAccountStakingRewardTokenVault,
      TAccountStakingLmRewardTokenVault extends string
        ? WritableAccount<TAccountStakingLmRewardTokenVault>
        : TAccountStakingLmRewardTokenVault,
      TAccountTransferAuthority extends string
        ? ReadonlyAccount<TAccountTransferAuthority>
        : TAccountTransferAuthority,
      TAccountUserStaking extends string
        ? WritableAccount<TAccountUserStaking>
        : TAccountUserStaking,
      TAccountStaking extends string
        ? WritableAccount<TAccountStaking>
        : TAccountStaking,
      TAccountCortex extends string
        ? WritableAccount<TAccountCortex>
        : TAccountCortex,
      TAccountPool extends string
        ? WritableAccount<TAccountPool>
        : TAccountPool,
      TAccountGenesisLock extends string
        ? WritableAccount<TAccountGenesisLock>
        : TAccountGenesisLock,
      TAccountLmTokenMint extends string
        ? WritableAccount<TAccountLmTokenMint>
        : TAccountLmTokenMint,
      TAccountGovernanceTokenMint extends string
        ? WritableAccount<TAccountGovernanceTokenMint>
        : TAccountGovernanceTokenMint,
      TAccountFeeRedistributionMint extends string
        ? ReadonlyAccount<TAccountFeeRedistributionMint>
        : TAccountFeeRedistributionMint,
      TAccountGovernanceRealm extends string
        ? ReadonlyAccount<TAccountGovernanceRealm>
        : TAccountGovernanceRealm,
      TAccountGovernanceRealmConfig extends string
        ? ReadonlyAccount<TAccountGovernanceRealmConfig>
        : TAccountGovernanceRealmConfig,
      TAccountGovernanceGoverningTokenHolding extends string
        ? WritableAccount<TAccountGovernanceGoverningTokenHolding>
        : TAccountGovernanceGoverningTokenHolding,
      TAccountGovernanceGoverningTokenOwnerRecord extends string
        ? WritableAccount<TAccountGovernanceGoverningTokenOwnerRecord>
        : TAccountGovernanceGoverningTokenOwnerRecord,
      TAccountGovernanceProgram extends string
        ? ReadonlyAccount<TAccountGovernanceProgram>
        : TAccountGovernanceProgram,
      TAccountAdrenaProgram extends string
        ? ReadonlyAccount<TAccountAdrenaProgram>
        : TAccountAdrenaProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type AddLiquidStakeInstructionData = {
  discriminator: ReadonlyUint8Array;
  amount: bigint;
};

export type AddLiquidStakeInstructionDataArgs = { amount: number | bigint };

export function getAddLiquidStakeInstructionDataEncoder(): Encoder<AddLiquidStakeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['amount', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: ADD_LIQUID_STAKE_DISCRIMINATOR })
  );
}

export function getAddLiquidStakeInstructionDataDecoder(): Decoder<AddLiquidStakeInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['amount', getU64Decoder()],
  ]);
}

export function getAddLiquidStakeInstructionDataCodec(): Codec<
  AddLiquidStakeInstructionDataArgs,
  AddLiquidStakeInstructionData
> {
  return combineCodec(
    getAddLiquidStakeInstructionDataEncoder(),
    getAddLiquidStakeInstructionDataDecoder()
  );
}

export type AddLiquidStakeInput<
  TAccountOwner extends string = string,
  TAccountFundingAccount extends string = string,
  TAccountRewardTokenAccount extends string = string,
  TAccountLmTokenAccount extends string = string,
  TAccountStakingStakedTokenVault extends string = string,
  TAccountStakingRewardTokenVault extends string = string,
  TAccountStakingLmRewardTokenVault extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountUserStaking extends string = string,
  TAccountStaking extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountGenesisLock extends string = string,
  TAccountLmTokenMint extends string = string,
  TAccountGovernanceTokenMint extends string = string,
  TAccountFeeRedistributionMint extends string = string,
  TAccountGovernanceRealm extends string = string,
  TAccountGovernanceRealmConfig extends string = string,
  TAccountGovernanceGoverningTokenHolding extends string = string,
  TAccountGovernanceGoverningTokenOwnerRecord extends string = string,
  TAccountGovernanceProgram extends string = string,
  TAccountAdrenaProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** #1 */
  owner: TransactionSigner<TAccountOwner>;
  /** #2 */
  fundingAccount: Address<TAccountFundingAccount>;
  /** #3 */
  rewardTokenAccount: Address<TAccountRewardTokenAccount>;
  /** #4 */
  lmTokenAccount: Address<TAccountLmTokenAccount>;
  /** #5 */
  stakingStakedTokenVault: Address<TAccountStakingStakedTokenVault>;
  /** #6 */
  stakingRewardTokenVault: Address<TAccountStakingRewardTokenVault>;
  /** #7 */
  stakingLmRewardTokenVault: Address<TAccountStakingLmRewardTokenVault>;
  /** #8 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #9 */
  userStaking: Address<TAccountUserStaking>;
  /** #10 */
  staking: Address<TAccountStaking>;
  /** #11 */
  cortex: Address<TAccountCortex>;
  /** #13 */
  pool: Address<TAccountPool>;
  /** #14 */
  genesisLock: Address<TAccountGenesisLock>;
  /** #15 */
  lmTokenMint: Address<TAccountLmTokenMint>;
  /** #16 */
  governanceTokenMint: Address<TAccountGovernanceTokenMint>;
  /** #17 */
  feeRedistributionMint: Address<TAccountFeeRedistributionMint>;
  /**
   * #18
   * A realm represent one project within the governance program
   */
  governanceRealm: Address<TAccountGovernanceRealm>;
  /** #19 */
  governanceRealmConfig: Address<TAccountGovernanceRealmConfig>;
  /**
   * #20
   * Token account owned by governance program holding user's locked tokens
   */
  governanceGoverningTokenHolding: Address<TAccountGovernanceGoverningTokenHolding>;
  /**
   * #21
   * Account owned by governance storing user information
   */
  governanceGoverningTokenOwnerRecord: Address<TAccountGovernanceGoverningTokenOwnerRecord>;
  /** #22 */
  governanceProgram: Address<TAccountGovernanceProgram>;
  /** #23 */
  adrenaProgram: Address<TAccountAdrenaProgram>;
  /** #24 */
  systemProgram?: Address<TAccountSystemProgram>;
  /** #25 */
  tokenProgram?: Address<TAccountTokenProgram>;
  amount: AddLiquidStakeInstructionDataArgs['amount'];
};

export function getAddLiquidStakeInstruction<
  TAccountOwner extends string,
  TAccountFundingAccount extends string,
  TAccountRewardTokenAccount extends string,
  TAccountLmTokenAccount extends string,
  TAccountStakingStakedTokenVault extends string,
  TAccountStakingRewardTokenVault extends string,
  TAccountStakingLmRewardTokenVault extends string,
  TAccountTransferAuthority extends string,
  TAccountUserStaking extends string,
  TAccountStaking extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountGenesisLock extends string,
  TAccountLmTokenMint extends string,
  TAccountGovernanceTokenMint extends string,
  TAccountFeeRedistributionMint extends string,
  TAccountGovernanceRealm extends string,
  TAccountGovernanceRealmConfig extends string,
  TAccountGovernanceGoverningTokenHolding extends string,
  TAccountGovernanceGoverningTokenOwnerRecord extends string,
  TAccountGovernanceProgram extends string,
  TAccountAdrenaProgram extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: AddLiquidStakeInput<
    TAccountOwner,
    TAccountFundingAccount,
    TAccountRewardTokenAccount,
    TAccountLmTokenAccount,
    TAccountStakingStakedTokenVault,
    TAccountStakingRewardTokenVault,
    TAccountStakingLmRewardTokenVault,
    TAccountTransferAuthority,
    TAccountUserStaking,
    TAccountStaking,
    TAccountCortex,
    TAccountPool,
    TAccountGenesisLock,
    TAccountLmTokenMint,
    TAccountGovernanceTokenMint,
    TAccountFeeRedistributionMint,
    TAccountGovernanceRealm,
    TAccountGovernanceRealmConfig,
    TAccountGovernanceGoverningTokenHolding,
    TAccountGovernanceGoverningTokenOwnerRecord,
    TAccountGovernanceProgram,
    TAccountAdrenaProgram,
    TAccountSystemProgram,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): AddLiquidStakeInstruction<
  TProgramAddress,
  TAccountOwner,
  TAccountFundingAccount,
  TAccountRewardTokenAccount,
  TAccountLmTokenAccount,
  TAccountStakingStakedTokenVault,
  TAccountStakingRewardTokenVault,
  TAccountStakingLmRewardTokenVault,
  TAccountTransferAuthority,
  TAccountUserStaking,
  TAccountStaking,
  TAccountCortex,
  TAccountPool,
  TAccountGenesisLock,
  TAccountLmTokenMint,
  TAccountGovernanceTokenMint,
  TAccountFeeRedistributionMint,
  TAccountGovernanceRealm,
  TAccountGovernanceRealmConfig,
  TAccountGovernanceGoverningTokenHolding,
  TAccountGovernanceGoverningTokenOwnerRecord,
  TAccountGovernanceProgram,
  TAccountAdrenaProgram,
  TAccountSystemProgram,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    owner: { value: input.owner ?? null, isWritable: true },
    fundingAccount: { value: input.fundingAccount ?? null, isWritable: true },
    rewardTokenAccount: {
      value: input.rewardTokenAccount ?? null,
      isWritable: true,
    },
    lmTokenAccount: { value: input.lmTokenAccount ?? null, isWritable: true },
    stakingStakedTokenVault: {
      value: input.stakingStakedTokenVault ?? null,
      isWritable: true,
    },
    stakingRewardTokenVault: {
      value: input.stakingRewardTokenVault ?? null,
      isWritable: true,
    },
    stakingLmRewardTokenVault: {
      value: input.stakingLmRewardTokenVault ?? null,
      isWritable: true,
    },
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    userStaking: { value: input.userStaking ?? null, isWritable: true },
    staking: { value: input.staking ?? null, isWritable: true },
    cortex: { value: input.cortex ?? null, isWritable: true },
    pool: { value: input.pool ?? null, isWritable: true },
    genesisLock: { value: input.genesisLock ?? null, isWritable: true },
    lmTokenMint: { value: input.lmTokenMint ?? null, isWritable: true },
    governanceTokenMint: {
      value: input.governanceTokenMint ?? null,
      isWritable: true,
    },
    feeRedistributionMint: {
      value: input.feeRedistributionMint ?? null,
      isWritable: false,
    },
    governanceRealm: {
      value: input.governanceRealm ?? null,
      isWritable: false,
    },
    governanceRealmConfig: {
      value: input.governanceRealmConfig ?? null,
      isWritable: false,
    },
    governanceGoverningTokenHolding: {
      value: input.governanceGoverningTokenHolding ?? null,
      isWritable: true,
    },
    governanceGoverningTokenOwnerRecord: {
      value: input.governanceGoverningTokenOwnerRecord ?? null,
      isWritable: true,
    },
    governanceProgram: {
      value: input.governanceProgram ?? null,
      isWritable: false,
    },
    adrenaProgram: { value: input.adrenaProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
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
      getAccountMeta(accounts.fundingAccount),
      getAccountMeta(accounts.rewardTokenAccount),
      getAccountMeta(accounts.lmTokenAccount),
      getAccountMeta(accounts.stakingStakedTokenVault),
      getAccountMeta(accounts.stakingRewardTokenVault),
      getAccountMeta(accounts.stakingLmRewardTokenVault),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.userStaking),
      getAccountMeta(accounts.staking),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.genesisLock),
      getAccountMeta(accounts.lmTokenMint),
      getAccountMeta(accounts.governanceTokenMint),
      getAccountMeta(accounts.feeRedistributionMint),
      getAccountMeta(accounts.governanceRealm),
      getAccountMeta(accounts.governanceRealmConfig),
      getAccountMeta(accounts.governanceGoverningTokenHolding),
      getAccountMeta(accounts.governanceGoverningTokenOwnerRecord),
      getAccountMeta(accounts.governanceProgram),
      getAccountMeta(accounts.adrenaProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getAddLiquidStakeInstructionDataEncoder().encode(
      args as AddLiquidStakeInstructionDataArgs
    ),
  } as AddLiquidStakeInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountFundingAccount,
    TAccountRewardTokenAccount,
    TAccountLmTokenAccount,
    TAccountStakingStakedTokenVault,
    TAccountStakingRewardTokenVault,
    TAccountStakingLmRewardTokenVault,
    TAccountTransferAuthority,
    TAccountUserStaking,
    TAccountStaking,
    TAccountCortex,
    TAccountPool,
    TAccountGenesisLock,
    TAccountLmTokenMint,
    TAccountGovernanceTokenMint,
    TAccountFeeRedistributionMint,
    TAccountGovernanceRealm,
    TAccountGovernanceRealmConfig,
    TAccountGovernanceGoverningTokenHolding,
    TAccountGovernanceGoverningTokenOwnerRecord,
    TAccountGovernanceProgram,
    TAccountAdrenaProgram,
    TAccountSystemProgram,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedAddLiquidStakeInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    owner: TAccountMetas[0];
    /** #2 */
    fundingAccount: TAccountMetas[1];
    /** #3 */
    rewardTokenAccount: TAccountMetas[2];
    /** #4 */
    lmTokenAccount: TAccountMetas[3];
    /** #5 */
    stakingStakedTokenVault: TAccountMetas[4];
    /** #6 */
    stakingRewardTokenVault: TAccountMetas[5];
    /** #7 */
    stakingLmRewardTokenVault: TAccountMetas[6];
    /** #8 */
    transferAuthority: TAccountMetas[7];
    /** #9 */
    userStaking: TAccountMetas[8];
    /** #10 */
    staking: TAccountMetas[9];
    /** #11 */
    cortex: TAccountMetas[10];
    /** #13 */
    pool: TAccountMetas[11];
    /** #14 */
    genesisLock: TAccountMetas[12];
    /** #15 */
    lmTokenMint: TAccountMetas[13];
    /** #16 */
    governanceTokenMint: TAccountMetas[14];
    /** #17 */
    feeRedistributionMint: TAccountMetas[15];
    /**
     * #18
     * A realm represent one project within the governance program
     */

    governanceRealm: TAccountMetas[16];
    /** #19 */
    governanceRealmConfig: TAccountMetas[17];
    /**
     * #20
     * Token account owned by governance program holding user's locked tokens
     */

    governanceGoverningTokenHolding: TAccountMetas[18];
    /**
     * #21
     * Account owned by governance storing user information
     */

    governanceGoverningTokenOwnerRecord: TAccountMetas[19];
    /** #22 */
    governanceProgram: TAccountMetas[20];
    /** #23 */
    adrenaProgram: TAccountMetas[21];
    /** #24 */
    systemProgram: TAccountMetas[22];
    /** #25 */
    tokenProgram: TAccountMetas[23];
  };
  data: AddLiquidStakeInstructionData;
};

export function parseAddLiquidStakeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedAddLiquidStakeInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 24) {
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
      fundingAccount: getNextAccount(),
      rewardTokenAccount: getNextAccount(),
      lmTokenAccount: getNextAccount(),
      stakingStakedTokenVault: getNextAccount(),
      stakingRewardTokenVault: getNextAccount(),
      stakingLmRewardTokenVault: getNextAccount(),
      transferAuthority: getNextAccount(),
      userStaking: getNextAccount(),
      staking: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      genesisLock: getNextAccount(),
      lmTokenMint: getNextAccount(),
      governanceTokenMint: getNextAccount(),
      feeRedistributionMint: getNextAccount(),
      governanceRealm: getNextAccount(),
      governanceRealmConfig: getNextAccount(),
      governanceGoverningTokenHolding: getNextAccount(),
      governanceGoverningTokenOwnerRecord: getNextAccount(),
      governanceProgram: getNextAccount(),
      adrenaProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getAddLiquidStakeInstructionDataDecoder().decode(instruction.data),
  };
}
