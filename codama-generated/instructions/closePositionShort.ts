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

export const CLOSE_POSITION_SHORT_DISCRIMINATOR = new Uint8Array([
  158, 216, 38, 16, 140, 37, 15, 131,
]);

export function getClosePositionShortDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    CLOSE_POSITION_SHORT_DISCRIMINATOR
  );
}

export type ClosePositionShortInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountCaller extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountReceivingAccount extends string | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountPosition extends string | IAccountMeta<string> = string,
  TAccountCustody extends string | IAccountMeta<string> = string,
  TAccountCustodyTradeOracle extends string | IAccountMeta<string> = string,
  TAccountCollateralCustody extends string | IAccountMeta<string> = string,
  TAccountCollateralCustodyOracle extends
    | string
    | IAccountMeta<string> = string,
  TAccountCollateralCustodyTokenAccount extends
    | string
    | IAccountMeta<string> = string,
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
      TAccountCaller extends string
        ? WritableSignerAccount<TAccountCaller> &
            IAccountSignerMeta<TAccountCaller>
        : TAccountCaller,
      TAccountOwner extends string
        ? WritableAccount<TAccountOwner>
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
      TAccountCustodyTradeOracle extends string
        ? ReadonlyAccount<TAccountCustodyTradeOracle>
        : TAccountCustodyTradeOracle,
      TAccountCollateralCustody extends string
        ? WritableAccount<TAccountCollateralCustody>
        : TAccountCollateralCustody,
      TAccountCollateralCustodyOracle extends string
        ? ReadonlyAccount<TAccountCollateralCustodyOracle>
        : TAccountCollateralCustodyOracle,
      TAccountCollateralCustodyTokenAccount extends string
        ? WritableAccount<TAccountCollateralCustodyTokenAccount>
        : TAccountCollateralCustodyTokenAccount,
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

export type ClosePositionShortInstructionData = {
  discriminator: ReadonlyUint8Array;
  price: Option<bigint>;
};

export type ClosePositionShortInstructionDataArgs = {
  price: OptionOrNullable<number | bigint>;
};

export function getClosePositionShortInstructionDataEncoder(): Encoder<ClosePositionShortInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['price', getOptionEncoder(getU64Encoder())],
    ]),
    (value) => ({ ...value, discriminator: CLOSE_POSITION_SHORT_DISCRIMINATOR })
  );
}

export function getClosePositionShortInstructionDataDecoder(): Decoder<ClosePositionShortInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['price', getOptionDecoder(getU64Decoder())],
  ]);
}

export function getClosePositionShortInstructionDataCodec(): Codec<
  ClosePositionShortInstructionDataArgs,
  ClosePositionShortInstructionData
> {
  return combineCodec(
    getClosePositionShortInstructionDataEncoder(),
    getClosePositionShortInstructionDataDecoder()
  );
}

export type ClosePositionShortInput<
  TAccountCaller extends string = string,
  TAccountOwner extends string = string,
  TAccountReceivingAccount extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountPosition extends string = string,
  TAccountCustody extends string = string,
  TAccountCustodyTradeOracle extends string = string,
  TAccountCollateralCustody extends string = string,
  TAccountCollateralCustodyOracle extends string = string,
  TAccountCollateralCustodyTokenAccount extends string = string,
  TAccountUserProfile extends string = string,
  TAccountReferrerProfile extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountAdrenaProgram extends string = string,
> = {
  /** #1 */
  caller: TransactionSigner<TAccountCaller>;
  /** #2 */
  owner: Address<TAccountOwner>;
  /** #3 */
  receivingAccount: Address<TAccountReceivingAccount>;
  /** #4 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #5 */
  cortex: Address<TAccountCortex>;
  /** #6 */
  pool: Address<TAccountPool>;
  /** #7 */
  position: Address<TAccountPosition>;
  /** #8 */
  custody: Address<TAccountCustody>;
  /** #9 */
  custodyTradeOracle: Address<TAccountCustodyTradeOracle>;
  /** #10 */
  collateralCustody: Address<TAccountCollateralCustody>;
  /** #11 */
  collateralCustodyOracle: Address<TAccountCollateralCustodyOracle>;
  /** #12 */
  collateralCustodyTokenAccount: Address<TAccountCollateralCustodyTokenAccount>;
  /** #13 */
  userProfile?: Address<TAccountUserProfile>;
  /** #14 */
  referrerProfile?: Address<TAccountReferrerProfile>;
  /** #15 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #16 */
  adrenaProgram: Address<TAccountAdrenaProgram>;
  price: ClosePositionShortInstructionDataArgs['price'];
};

export function getClosePositionShortInstruction<
  TAccountCaller extends string,
  TAccountOwner extends string,
  TAccountReceivingAccount extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountPosition extends string,
  TAccountCustody extends string,
  TAccountCustodyTradeOracle extends string,
  TAccountCollateralCustody extends string,
  TAccountCollateralCustodyOracle extends string,
  TAccountCollateralCustodyTokenAccount extends string,
  TAccountUserProfile extends string,
  TAccountReferrerProfile extends string,
  TAccountTokenProgram extends string,
  TAccountAdrenaProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: ClosePositionShortInput<
    TAccountCaller,
    TAccountOwner,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountCustody,
    TAccountCustodyTradeOracle,
    TAccountCollateralCustody,
    TAccountCollateralCustodyOracle,
    TAccountCollateralCustodyTokenAccount,
    TAccountUserProfile,
    TAccountReferrerProfile,
    TAccountTokenProgram,
    TAccountAdrenaProgram
  >,
  config?: { programAddress?: TProgramAddress }
): ClosePositionShortInstruction<
  TProgramAddress,
  TAccountCaller,
  TAccountOwner,
  TAccountReceivingAccount,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountPool,
  TAccountPosition,
  TAccountCustody,
  TAccountCustodyTradeOracle,
  TAccountCollateralCustody,
  TAccountCollateralCustodyOracle,
  TAccountCollateralCustodyTokenAccount,
  TAccountUserProfile,
  TAccountReferrerProfile,
  TAccountTokenProgram,
  TAccountAdrenaProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    caller: { value: input.caller ?? null, isWritable: true },
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
    custodyTradeOracle: {
      value: input.custodyTradeOracle ?? null,
      isWritable: false,
    },
    collateralCustody: {
      value: input.collateralCustody ?? null,
      isWritable: true,
    },
    collateralCustodyOracle: {
      value: input.collateralCustodyOracle ?? null,
      isWritable: false,
    },
    collateralCustodyTokenAccount: {
      value: input.collateralCustodyTokenAccount ?? null,
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
      getAccountMeta(accounts.caller),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.receivingAccount),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.position),
      getAccountMeta(accounts.custody),
      getAccountMeta(accounts.custodyTradeOracle),
      getAccountMeta(accounts.collateralCustody),
      getAccountMeta(accounts.collateralCustodyOracle),
      getAccountMeta(accounts.collateralCustodyTokenAccount),
      getAccountMeta(accounts.userProfile),
      getAccountMeta(accounts.referrerProfile),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.adrenaProgram),
    ],
    programAddress,
    data: getClosePositionShortInstructionDataEncoder().encode(
      args as ClosePositionShortInstructionDataArgs
    ),
  } as ClosePositionShortInstruction<
    TProgramAddress,
    TAccountCaller,
    TAccountOwner,
    TAccountReceivingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountCustody,
    TAccountCustodyTradeOracle,
    TAccountCollateralCustody,
    TAccountCollateralCustodyOracle,
    TAccountCollateralCustodyTokenAccount,
    TAccountUserProfile,
    TAccountReferrerProfile,
    TAccountTokenProgram,
    TAccountAdrenaProgram
  >;

  return instruction;
}

export type ParsedClosePositionShortInstruction<
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
    receivingAccount: TAccountMetas[2];
    /** #4 */
    transferAuthority: TAccountMetas[3];
    /** #5 */
    cortex: TAccountMetas[4];
    /** #6 */
    pool: TAccountMetas[5];
    /** #7 */
    position: TAccountMetas[6];
    /** #8 */
    custody: TAccountMetas[7];
    /** #9 */
    custodyTradeOracle: TAccountMetas[8];
    /** #10 */
    collateralCustody: TAccountMetas[9];
    /** #11 */
    collateralCustodyOracle: TAccountMetas[10];
    /** #12 */
    collateralCustodyTokenAccount: TAccountMetas[11];
    /** #13 */
    userProfile?: TAccountMetas[12] | undefined;
    /** #14 */
    referrerProfile?: TAccountMetas[13] | undefined;
    /** #15 */
    tokenProgram: TAccountMetas[14];
    /** #16 */
    adrenaProgram: TAccountMetas[15];
  };
  data: ClosePositionShortInstructionData;
};

export function parseClosePositionShortInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedClosePositionShortInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 16) {
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
      caller: getNextAccount(),
      owner: getNextAccount(),
      receivingAccount: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      position: getNextAccount(),
      custody: getNextAccount(),
      custodyTradeOracle: getNextAccount(),
      collateralCustody: getNextAccount(),
      collateralCustodyOracle: getNextAccount(),
      collateralCustodyTokenAccount: getNextAccount(),
      userProfile: getNextOptionalAccount(),
      referrerProfile: getNextOptionalAccount(),
      tokenProgram: getNextAccount(),
      adrenaProgram: getNextAccount(),
    },
    data: getClosePositionShortInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
