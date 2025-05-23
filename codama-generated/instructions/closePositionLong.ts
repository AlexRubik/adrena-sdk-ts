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

export const CLOSE_POSITION_LONG_DISCRIMINATOR = new Uint8Array([
  50, 66, 35, 214, 218, 31, 152, 68,
]);

export function getClosePositionLongDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    CLOSE_POSITION_LONG_DISCRIMINATOR
  );
}

export type ClosePositionLongInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountCaller extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
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

export type ClosePositionLongInstructionData = {
  discriminator: ReadonlyUint8Array;
  price: Option<bigint>;
};

export type ClosePositionLongInstructionDataArgs = {
  price: OptionOrNullable<number | bigint>;
};

export function getClosePositionLongInstructionDataEncoder(): Encoder<ClosePositionLongInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['price', getOptionEncoder(getU64Encoder())],
    ]),
    (value) => ({ ...value, discriminator: CLOSE_POSITION_LONG_DISCRIMINATOR })
  );
}

export function getClosePositionLongInstructionDataDecoder(): Decoder<ClosePositionLongInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['price', getOptionDecoder(getU64Decoder())],
  ]);
}

export function getClosePositionLongInstructionDataCodec(): Codec<
  ClosePositionLongInstructionDataArgs,
  ClosePositionLongInstructionData
> {
  return combineCodec(
    getClosePositionLongInstructionDataEncoder(),
    getClosePositionLongInstructionDataDecoder()
  );
}

export type ClosePositionLongInput<
  TAccountCaller extends string = string,
  TAccountOwner extends string = string,
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
  custodyOracle: Address<TAccountCustodyOracle>;
  /** #10 */
  custodyTradeOracle: Address<TAccountCustodyTradeOracle>;
  /** #11 */
  custodyTokenAccount: Address<TAccountCustodyTokenAccount>;
  /** #12 */
  userProfile?: Address<TAccountUserProfile>;
  /** #13 */
  referrerProfile?: Address<TAccountReferrerProfile>;
  /** #14 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #15 */
  adrenaProgram: Address<TAccountAdrenaProgram>;
  price: ClosePositionLongInstructionDataArgs['price'];
};

export function getClosePositionLongInstruction<
  TAccountCaller extends string,
  TAccountOwner extends string,
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
  input: ClosePositionLongInput<
    TAccountCaller,
    TAccountOwner,
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
): ClosePositionLongInstruction<
  TProgramAddress,
  TAccountCaller,
  TAccountOwner,
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
      getAccountMeta(accounts.custodyOracle),
      getAccountMeta(accounts.custodyTradeOracle),
      getAccountMeta(accounts.custodyTokenAccount),
      getAccountMeta(accounts.userProfile),
      getAccountMeta(accounts.referrerProfile),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.adrenaProgram),
    ],
    programAddress,
    data: getClosePositionLongInstructionDataEncoder().encode(
      args as ClosePositionLongInstructionDataArgs
    ),
  } as ClosePositionLongInstruction<
    TProgramAddress,
    TAccountCaller,
    TAccountOwner,
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

export type ParsedClosePositionLongInstruction<
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
    custodyOracle: TAccountMetas[8];
    /** #10 */
    custodyTradeOracle: TAccountMetas[9];
    /** #11 */
    custodyTokenAccount: TAccountMetas[10];
    /** #12 */
    userProfile?: TAccountMetas[11] | undefined;
    /** #13 */
    referrerProfile?: TAccountMetas[12] | undefined;
    /** #14 */
    tokenProgram: TAccountMetas[13];
    /** #15 */
    adrenaProgram: TAccountMetas[14];
  };
  data: ClosePositionLongInstructionData;
};

export function parseClosePositionLongInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedClosePositionLongInstruction<TProgram, TAccountMetas> {
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
      custodyOracle: getNextAccount(),
      custodyTradeOracle: getNextAccount(),
      custodyTokenAccount: getNextAccount(),
      userProfile: getNextOptionalAccount(),
      referrerProfile: getNextOptionalAccount(),
      tokenProgram: getNextAccount(),
      adrenaProgram: getNextAccount(),
    },
    data: getClosePositionLongInstructionDataDecoder().decode(instruction.data),
  };
}
