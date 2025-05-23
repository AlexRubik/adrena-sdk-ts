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
import {
  getOpenPositionWithSwapParamsDecoder,
  getOpenPositionWithSwapParamsEncoder,
  type OpenPositionWithSwapParams,
  type OpenPositionWithSwapParamsArgs,
} from '../types';

export const OPEN_OR_INCREASE_POSITION_WITH_SWAP_SHORT_DISCRIMINATOR =
  new Uint8Array([65, 201, 86, 242, 134, 148, 34, 179]);

export function getOpenOrIncreasePositionWithSwapShortDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    OPEN_OR_INCREASE_POSITION_WITH_SWAP_SHORT_DISCRIMINATOR
  );
}

export type OpenOrIncreasePositionWithSwapShortInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountFundingAccount extends string | IAccountMeta<string> = string,
  TAccountCollateralAccount extends string | IAccountMeta<string> = string,
  TAccountReceivingCustody extends string | IAccountMeta<string> = string,
  TAccountReceivingCustodyOracle extends string | IAccountMeta<string> = string,
  TAccountReceivingCustodyTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountCollateralCustody extends string | IAccountMeta<string> = string,
  TAccountCollateralCustodyOracle extends
    | string
    | IAccountMeta<string> = string,
  TAccountCollateralCustodyTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountPrincipalCustody extends string | IAccountMeta<string> = string,
  TAccountPrincipalCustodyTradeOracle extends
    | string
    | IAccountMeta<string> = string,
  TAccountPrincipalCustodyTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountPosition extends string | IAccountMeta<string> = string,
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
        ? ReadonlySignerAccount<TAccountOwner> &
            IAccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountFundingAccount extends string
        ? WritableAccount<TAccountFundingAccount>
        : TAccountFundingAccount,
      TAccountCollateralAccount extends string
        ? WritableAccount<TAccountCollateralAccount>
        : TAccountCollateralAccount,
      TAccountReceivingCustody extends string
        ? WritableAccount<TAccountReceivingCustody>
        : TAccountReceivingCustody,
      TAccountReceivingCustodyOracle extends string
        ? ReadonlyAccount<TAccountReceivingCustodyOracle>
        : TAccountReceivingCustodyOracle,
      TAccountReceivingCustodyTokenAccount extends string
        ? WritableAccount<TAccountReceivingCustodyTokenAccount>
        : TAccountReceivingCustodyTokenAccount,
      TAccountCollateralCustody extends string
        ? WritableAccount<TAccountCollateralCustody>
        : TAccountCollateralCustody,
      TAccountCollateralCustodyOracle extends string
        ? ReadonlyAccount<TAccountCollateralCustodyOracle>
        : TAccountCollateralCustodyOracle,
      TAccountCollateralCustodyTokenAccount extends string
        ? WritableAccount<TAccountCollateralCustodyTokenAccount>
        : TAccountCollateralCustodyTokenAccount,
      TAccountPrincipalCustody extends string
        ? WritableAccount<TAccountPrincipalCustody>
        : TAccountPrincipalCustody,
      TAccountPrincipalCustodyTradeOracle extends string
        ? ReadonlyAccount<TAccountPrincipalCustodyTradeOracle>
        : TAccountPrincipalCustodyTradeOracle,
      TAccountPrincipalCustodyTokenAccount extends string
        ? WritableAccount<TAccountPrincipalCustodyTokenAccount>
        : TAccountPrincipalCustodyTokenAccount,
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

export type OpenOrIncreasePositionWithSwapShortInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: OpenPositionWithSwapParams;
};

export type OpenOrIncreasePositionWithSwapShortInstructionDataArgs = {
  params: OpenPositionWithSwapParamsArgs;
};

export function getOpenOrIncreasePositionWithSwapShortInstructionDataEncoder(): Encoder<OpenOrIncreasePositionWithSwapShortInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getOpenPositionWithSwapParamsEncoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: OPEN_OR_INCREASE_POSITION_WITH_SWAP_SHORT_DISCRIMINATOR,
    })
  );
}

export function getOpenOrIncreasePositionWithSwapShortInstructionDataDecoder(): Decoder<OpenOrIncreasePositionWithSwapShortInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getOpenPositionWithSwapParamsDecoder()],
  ]);
}

export function getOpenOrIncreasePositionWithSwapShortInstructionDataCodec(): Codec<
  OpenOrIncreasePositionWithSwapShortInstructionDataArgs,
  OpenOrIncreasePositionWithSwapShortInstructionData
> {
  return combineCodec(
    getOpenOrIncreasePositionWithSwapShortInstructionDataEncoder(),
    getOpenOrIncreasePositionWithSwapShortInstructionDataDecoder()
  );
}

export type OpenOrIncreasePositionWithSwapShortInput<
  TAccountOwner extends string = string,
  TAccountPayer extends string = string,
  TAccountFundingAccount extends string = string,
  TAccountCollateralAccount extends string = string,
  TAccountReceivingCustody extends string = string,
  TAccountReceivingCustodyOracle extends string = string,
  TAccountReceivingCustodyTokenAccount extends string = string,
  TAccountCollateralCustody extends string = string,
  TAccountCollateralCustodyOracle extends string = string,
  TAccountCollateralCustodyTokenAccount extends string = string,
  TAccountPrincipalCustody extends string = string,
  TAccountPrincipalCustodyTradeOracle extends string = string,
  TAccountPrincipalCustodyTokenAccount extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountPosition extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountAdrenaProgram extends string = string,
> = {
  /** #1 */
  owner: TransactionSigner<TAccountOwner>;
  /** #2 */
  payer: TransactionSigner<TAccountPayer>;
  /** #3 */
  fundingAccount: Address<TAccountFundingAccount>;
  /** #4 */
  collateralAccount: Address<TAccountCollateralAccount>;
  /** #5 */
  receivingCustody: Address<TAccountReceivingCustody>;
  /** #6 */
  receivingCustodyOracle: Address<TAccountReceivingCustodyOracle>;
  /** #7 */
  receivingCustodyTokenAccount: Address<TAccountReceivingCustodyTokenAccount>;
  /** #8 */
  collateralCustody: Address<TAccountCollateralCustody>;
  /** #9 */
  collateralCustodyOracle: Address<TAccountCollateralCustodyOracle>;
  /** #10 */
  collateralCustodyTokenAccount: Address<TAccountCollateralCustodyTokenAccount>;
  /** #11 */
  principalCustody: Address<TAccountPrincipalCustody>;
  /** #12 */
  principalCustodyTradeOracle: Address<TAccountPrincipalCustodyTradeOracle>;
  /** #13 */
  principalCustodyTokenAccount: Address<TAccountPrincipalCustodyTokenAccount>;
  /** #14 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #15 */
  cortex: Address<TAccountCortex>;
  /** #16 */
  pool: Address<TAccountPool>;
  /** #17 */
  position: Address<TAccountPosition>;
  /** #18 */
  systemProgram?: Address<TAccountSystemProgram>;
  /** #19 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #20 */
  adrenaProgram: Address<TAccountAdrenaProgram>;
  params: OpenOrIncreasePositionWithSwapShortInstructionDataArgs['params'];
};

export function getOpenOrIncreasePositionWithSwapShortInstruction<
  TAccountOwner extends string,
  TAccountPayer extends string,
  TAccountFundingAccount extends string,
  TAccountCollateralAccount extends string,
  TAccountReceivingCustody extends string,
  TAccountReceivingCustodyOracle extends string,
  TAccountReceivingCustodyTokenAccount extends string,
  TAccountCollateralCustody extends string,
  TAccountCollateralCustodyOracle extends string,
  TAccountCollateralCustodyTokenAccount extends string,
  TAccountPrincipalCustody extends string,
  TAccountPrincipalCustodyTradeOracle extends string,
  TAccountPrincipalCustodyTokenAccount extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountPosition extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountAdrenaProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: OpenOrIncreasePositionWithSwapShortInput<
    TAccountOwner,
    TAccountPayer,
    TAccountFundingAccount,
    TAccountCollateralAccount,
    TAccountReceivingCustody,
    TAccountReceivingCustodyOracle,
    TAccountReceivingCustodyTokenAccount,
    TAccountCollateralCustody,
    TAccountCollateralCustodyOracle,
    TAccountCollateralCustodyTokenAccount,
    TAccountPrincipalCustody,
    TAccountPrincipalCustodyTradeOracle,
    TAccountPrincipalCustodyTokenAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAdrenaProgram
  >,
  config?: { programAddress?: TProgramAddress }
): OpenOrIncreasePositionWithSwapShortInstruction<
  TProgramAddress,
  TAccountOwner,
  TAccountPayer,
  TAccountFundingAccount,
  TAccountCollateralAccount,
  TAccountReceivingCustody,
  TAccountReceivingCustodyOracle,
  TAccountReceivingCustodyTokenAccount,
  TAccountCollateralCustody,
  TAccountCollateralCustodyOracle,
  TAccountCollateralCustodyTokenAccount,
  TAccountPrincipalCustody,
  TAccountPrincipalCustodyTradeOracle,
  TAccountPrincipalCustodyTokenAccount,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountPool,
  TAccountPosition,
  TAccountSystemProgram,
  TAccountTokenProgram,
  TAccountAdrenaProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    owner: { value: input.owner ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    fundingAccount: { value: input.fundingAccount ?? null, isWritable: true },
    collateralAccount: {
      value: input.collateralAccount ?? null,
      isWritable: true,
    },
    receivingCustody: {
      value: input.receivingCustody ?? null,
      isWritable: true,
    },
    receivingCustodyOracle: {
      value: input.receivingCustodyOracle ?? null,
      isWritable: false,
    },
    receivingCustodyTokenAccount: {
      value: input.receivingCustodyTokenAccount ?? null,
      isWritable: true,
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
    principalCustody: {
      value: input.principalCustody ?? null,
      isWritable: true,
    },
    principalCustodyTradeOracle: {
      value: input.principalCustodyTradeOracle ?? null,
      isWritable: false,
    },
    principalCustodyTokenAccount: {
      value: input.principalCustodyTokenAccount ?? null,
      isWritable: true,
    },
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    cortex: { value: input.cortex ?? null, isWritable: true },
    pool: { value: input.pool ?? null, isWritable: true },
    position: { value: input.position ?? null, isWritable: true },
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
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.fundingAccount),
      getAccountMeta(accounts.collateralAccount),
      getAccountMeta(accounts.receivingCustody),
      getAccountMeta(accounts.receivingCustodyOracle),
      getAccountMeta(accounts.receivingCustodyTokenAccount),
      getAccountMeta(accounts.collateralCustody),
      getAccountMeta(accounts.collateralCustodyOracle),
      getAccountMeta(accounts.collateralCustodyTokenAccount),
      getAccountMeta(accounts.principalCustody),
      getAccountMeta(accounts.principalCustodyTradeOracle),
      getAccountMeta(accounts.principalCustodyTokenAccount),
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.position),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.adrenaProgram),
    ],
    programAddress,
    data: getOpenOrIncreasePositionWithSwapShortInstructionDataEncoder().encode(
      args as OpenOrIncreasePositionWithSwapShortInstructionDataArgs
    ),
  } as OpenOrIncreasePositionWithSwapShortInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountPayer,
    TAccountFundingAccount,
    TAccountCollateralAccount,
    TAccountReceivingCustody,
    TAccountReceivingCustodyOracle,
    TAccountReceivingCustodyTokenAccount,
    TAccountCollateralCustody,
    TAccountCollateralCustodyOracle,
    TAccountCollateralCustodyTokenAccount,
    TAccountPrincipalCustody,
    TAccountPrincipalCustodyTradeOracle,
    TAccountPrincipalCustodyTokenAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountPosition,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAdrenaProgram
  >;

  return instruction;
}

export type ParsedOpenOrIncreasePositionWithSwapShortInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    owner: TAccountMetas[0];
    /** #2 */
    payer: TAccountMetas[1];
    /** #3 */
    fundingAccount: TAccountMetas[2];
    /** #4 */
    collateralAccount: TAccountMetas[3];
    /** #5 */
    receivingCustody: TAccountMetas[4];
    /** #6 */
    receivingCustodyOracle: TAccountMetas[5];
    /** #7 */
    receivingCustodyTokenAccount: TAccountMetas[6];
    /** #8 */
    collateralCustody: TAccountMetas[7];
    /** #9 */
    collateralCustodyOracle: TAccountMetas[8];
    /** #10 */
    collateralCustodyTokenAccount: TAccountMetas[9];
    /** #11 */
    principalCustody: TAccountMetas[10];
    /** #12 */
    principalCustodyTradeOracle: TAccountMetas[11];
    /** #13 */
    principalCustodyTokenAccount: TAccountMetas[12];
    /** #14 */
    transferAuthority: TAccountMetas[13];
    /** #15 */
    cortex: TAccountMetas[14];
    /** #16 */
    pool: TAccountMetas[15];
    /** #17 */
    position: TAccountMetas[16];
    /** #18 */
    systemProgram: TAccountMetas[17];
    /** #19 */
    tokenProgram: TAccountMetas[18];
    /** #20 */
    adrenaProgram: TAccountMetas[19];
  };
  data: OpenOrIncreasePositionWithSwapShortInstructionData;
};

export function parseOpenOrIncreasePositionWithSwapShortInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedOpenOrIncreasePositionWithSwapShortInstruction<
  TProgram,
  TAccountMetas
> {
  if (instruction.accounts.length < 20) {
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
      payer: getNextAccount(),
      fundingAccount: getNextAccount(),
      collateralAccount: getNextAccount(),
      receivingCustody: getNextAccount(),
      receivingCustodyOracle: getNextAccount(),
      receivingCustodyTokenAccount: getNextAccount(),
      collateralCustody: getNextAccount(),
      collateralCustodyOracle: getNextAccount(),
      collateralCustodyTokenAccount: getNextAccount(),
      principalCustody: getNextAccount(),
      principalCustodyTradeOracle: getNextAccount(),
      principalCustodyTokenAccount: getNextAccount(),
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      position: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      adrenaProgram: getNextAccount(),
    },
    data: getOpenOrIncreasePositionWithSwapShortInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
