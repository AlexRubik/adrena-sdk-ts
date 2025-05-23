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

export const CLAIM_VEST_DISCRIMINATOR = new Uint8Array([
  147, 229, 253, 84, 253, 67, 13, 178,
]);

export function getClaimVestDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(CLAIM_VEST_DISCRIMINATOR);
}

export type ClaimVestInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountCaller extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountReceivingAccount extends string | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountVestRegistry extends string | IAccountMeta<string> = string,
  TAccountVest extends string | IAccountMeta<string> = string,
  TAccountLmTokenMint extends string | IAccountMeta<string> = string,
  TAccountGovernanceTokenMint extends string | IAccountMeta<string> = string,
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
  TAccountRent extends
    | string
    | IAccountMeta<string> = 'SysvarRent111111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountCaller extends string
        ? ReadonlySignerAccount<TAccountCaller> &
            IAccountSignerMeta<TAccountCaller>
        : TAccountCaller,
      TAccountOwner extends string
        ? ReadonlyAccount<TAccountOwner>
        : TAccountOwner,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountReceivingAccount extends string
        ? WritableAccount<TAccountReceivingAccount>
        : TAccountReceivingAccount,
      TAccountTransferAuthority extends string
        ? ReadonlyAccount<TAccountTransferAuthority>
        : TAccountTransferAuthority,
      TAccountCortex extends string
        ? WritableAccount<TAccountCortex>
        : TAccountCortex,
      TAccountVestRegistry extends string
        ? WritableAccount<TAccountVestRegistry>
        : TAccountVestRegistry,
      TAccountVest extends string
        ? WritableAccount<TAccountVest>
        : TAccountVest,
      TAccountLmTokenMint extends string
        ? WritableAccount<TAccountLmTokenMint>
        : TAccountLmTokenMint,
      TAccountGovernanceTokenMint extends string
        ? WritableAccount<TAccountGovernanceTokenMint>
        : TAccountGovernanceTokenMint,
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
      TAccountRent extends string
        ? ReadonlyAccount<TAccountRent>
        : TAccountRent,
      ...TRemainingAccounts,
    ]
  >;

export type ClaimVestInstructionData = { discriminator: ReadonlyUint8Array };

export type ClaimVestInstructionDataArgs = {};

export function getClaimVestInstructionDataEncoder(): Encoder<ClaimVestInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: CLAIM_VEST_DISCRIMINATOR })
  );
}

export function getClaimVestInstructionDataDecoder(): Decoder<ClaimVestInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getClaimVestInstructionDataCodec(): Codec<
  ClaimVestInstructionDataArgs,
  ClaimVestInstructionData
> {
  return combineCodec(
    getClaimVestInstructionDataEncoder(),
    getClaimVestInstructionDataDecoder()
  );
}

export type ClaimVestInput<
  TAccountCaller extends string = string,
  TAccountOwner extends string = string,
  TAccountPayer extends string = string,
  TAccountReceivingAccount extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountVestRegistry extends string = string,
  TAccountVest extends string = string,
  TAccountLmTokenMint extends string = string,
  TAccountGovernanceTokenMint extends string = string,
  TAccountGovernanceRealm extends string = string,
  TAccountGovernanceRealmConfig extends string = string,
  TAccountGovernanceGoverningTokenHolding extends string = string,
  TAccountGovernanceGoverningTokenOwnerRecord extends string = string,
  TAccountGovernanceProgram extends string = string,
  TAccountAdrenaProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountRent extends string = string,
> = {
  /** #1 */
  caller: TransactionSigner<TAccountCaller>;
  /** #2 */
  owner: Address<TAccountOwner>;
  /** #3 */
  payer: TransactionSigner<TAccountPayer>;
  /** #4 */
  receivingAccount: Address<TAccountReceivingAccount>;
  /** #5 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #6 */
  cortex: Address<TAccountCortex>;
  /** #7 */
  vestRegistry: Address<TAccountVestRegistry>;
  /** #8 */
  vest: Address<TAccountVest>;
  /** #9 */
  lmTokenMint: Address<TAccountLmTokenMint>;
  /** #10 */
  governanceTokenMint: Address<TAccountGovernanceTokenMint>;
  /**
   * #11
   * A realm represent one project within the governance program
   */
  governanceRealm: Address<TAccountGovernanceRealm>;
  /** #12 */
  governanceRealmConfig: Address<TAccountGovernanceRealmConfig>;
  /**
   * #13
   * Token account owned by governance program holding user's locked tokens
   */
  governanceGoverningTokenHolding: Address<TAccountGovernanceGoverningTokenHolding>;
  /**
   * #14
   * Account owned by governance storing user information
   */
  governanceGoverningTokenOwnerRecord: Address<TAccountGovernanceGoverningTokenOwnerRecord>;
  /** #15 */
  governanceProgram: Address<TAccountGovernanceProgram>;
  /** #16 */
  adrenaProgram: Address<TAccountAdrenaProgram>;
  /** #17 */
  systemProgram?: Address<TAccountSystemProgram>;
  /** #18 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #19 */
  rent?: Address<TAccountRent>;
};

export function getClaimVestInstruction<
  TAccountCaller extends string,
  TAccountOwner extends string,
  TAccountPayer extends string,
  TAccountReceivingAccount extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountVestRegistry extends string,
  TAccountVest extends string,
  TAccountLmTokenMint extends string,
  TAccountGovernanceTokenMint extends string,
  TAccountGovernanceRealm extends string,
  TAccountGovernanceRealmConfig extends string,
  TAccountGovernanceGoverningTokenHolding extends string,
  TAccountGovernanceGoverningTokenOwnerRecord extends string,
  TAccountGovernanceProgram extends string,
  TAccountAdrenaProgram extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountRent extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: ClaimVestInput<
    TAccountCaller,
    TAccountOwner,
    TAccountPayer,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountVestRegistry,
    TAccountVest,
    TAccountLmTokenMint,
    TAccountGovernanceTokenMint,
    TAccountGovernanceRealm,
    TAccountGovernanceRealmConfig,
    TAccountGovernanceGoverningTokenHolding,
    TAccountGovernanceGoverningTokenOwnerRecord,
    TAccountGovernanceProgram,
    TAccountAdrenaProgram,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountRent
  >,
  config?: { programAddress?: TProgramAddress }
): ClaimVestInstruction<
  TProgramAddress,
  TAccountCaller,
  TAccountOwner,
  TAccountPayer,
  TAccountReceivingAccount,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountVestRegistry,
  TAccountVest,
  TAccountLmTokenMint,
  TAccountGovernanceTokenMint,
  TAccountGovernanceRealm,
  TAccountGovernanceRealmConfig,
  TAccountGovernanceGoverningTokenHolding,
  TAccountGovernanceGoverningTokenOwnerRecord,
  TAccountGovernanceProgram,
  TAccountAdrenaProgram,
  TAccountSystemProgram,
  TAccountTokenProgram,
  TAccountRent
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    caller: { value: input.caller ?? null, isWritable: false },
    owner: { value: input.owner ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    receivingAccount: {
      value: input.receivingAccount ?? null,
      isWritable: true,
    },
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    cortex: { value: input.cortex ?? null, isWritable: true },
    vestRegistry: { value: input.vestRegistry ?? null, isWritable: true },
    vest: { value: input.vest ?? null, isWritable: true },
    lmTokenMint: { value: input.lmTokenMint ?? null, isWritable: true },
    governanceTokenMint: {
      value: input.governanceTokenMint ?? null,
      isWritable: true,
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
      getAccountMeta(accounts.caller),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.receivingAccount),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.vestRegistry),
      getAccountMeta(accounts.vest),
      getAccountMeta(accounts.lmTokenMint),
      getAccountMeta(accounts.governanceTokenMint),
      getAccountMeta(accounts.governanceRealm),
      getAccountMeta(accounts.governanceRealmConfig),
      getAccountMeta(accounts.governanceGoverningTokenHolding),
      getAccountMeta(accounts.governanceGoverningTokenOwnerRecord),
      getAccountMeta(accounts.governanceProgram),
      getAccountMeta(accounts.adrenaProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.rent),
    ],
    programAddress,
    data: getClaimVestInstructionDataEncoder().encode({}),
  } as ClaimVestInstruction<
    TProgramAddress,
    TAccountCaller,
    TAccountOwner,
    TAccountPayer,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountVestRegistry,
    TAccountVest,
    TAccountLmTokenMint,
    TAccountGovernanceTokenMint,
    TAccountGovernanceRealm,
    TAccountGovernanceRealmConfig,
    TAccountGovernanceGoverningTokenHolding,
    TAccountGovernanceGoverningTokenOwnerRecord,
    TAccountGovernanceProgram,
    TAccountAdrenaProgram,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountRent
  >;

  return instruction;
}

export type ParsedClaimVestInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    caller: TAccountMetas[0];
    /** #2 */
    owner: TAccountMetas[1];
    /** #3 */
    payer: TAccountMetas[2];
    /** #4 */
    receivingAccount: TAccountMetas[3];
    /** #5 */
    transferAuthority: TAccountMetas[4];
    /** #6 */
    cortex: TAccountMetas[5];
    /** #7 */
    vestRegistry: TAccountMetas[6];
    /** #8 */
    vest: TAccountMetas[7];
    /** #9 */
    lmTokenMint: TAccountMetas[8];
    /** #10 */
    governanceTokenMint: TAccountMetas[9];
    /**
     * #11
     * A realm represent one project within the governance program
     */

    governanceRealm: TAccountMetas[10];
    /** #12 */
    governanceRealmConfig: TAccountMetas[11];
    /**
     * #13
     * Token account owned by governance program holding user's locked tokens
     */

    governanceGoverningTokenHolding: TAccountMetas[12];
    /**
     * #14
     * Account owned by governance storing user information
     */

    governanceGoverningTokenOwnerRecord: TAccountMetas[13];
    /** #15 */
    governanceProgram: TAccountMetas[14];
    /** #16 */
    adrenaProgram: TAccountMetas[15];
    /** #17 */
    systemProgram: TAccountMetas[16];
    /** #18 */
    tokenProgram: TAccountMetas[17];
    /** #19 */
    rent: TAccountMetas[18];
  };
  data: ClaimVestInstructionData;
};

export function parseClaimVestInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedClaimVestInstruction<TProgram, TAccountMetas> {
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
      owner: getNextAccount(),
      payer: getNextAccount(),
      receivingAccount: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      vestRegistry: getNextAccount(),
      vest: getNextAccount(),
      lmTokenMint: getNextAccount(),
      governanceTokenMint: getNextAccount(),
      governanceRealm: getNextAccount(),
      governanceRealmConfig: getNextAccount(),
      governanceGoverningTokenHolding: getNextAccount(),
      governanceGoverningTokenOwnerRecord: getNextAccount(),
      governanceProgram: getNextAccount(),
      adrenaProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      rent: getNextAccount(),
    },
    data: getClaimVestInstructionDataDecoder().decode(instruction.data),
  };
}
