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
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
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

export const ADD_LIMIT_ORDER_DISCRIMINATOR = new Uint8Array([
  163, 4, 58, 224, 7, 212, 118, 49,
]);

export function getAddLimitOrderDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    ADD_LIMIT_ORDER_DISCRIMINATOR
  );
}

export type AddLimitOrderInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountFundingAccount extends string | IAccountMeta<string> = string,
  TAccountTransferAuthority extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountLimitOrderBook extends string | IAccountMeta<string> = string,
  TAccountCollateralEscrow extends string | IAccountMeta<string> = string,
  TAccountCollateralCustodyMint extends string | IAccountMeta<string> = string,
  TAccountCustody extends string | IAccountMeta<string> = string,
  TAccountCollateralCustody extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountAssociatedTokenProgram extends string | IAccountMeta<string> = string,
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
      TAccountTransferAuthority extends string
        ? ReadonlyAccount<TAccountTransferAuthority>
        : TAccountTransferAuthority,
      TAccountCortex extends string
        ? ReadonlyAccount<TAccountCortex>
        : TAccountCortex,
      TAccountPool extends string
        ? WritableAccount<TAccountPool>
        : TAccountPool,
      TAccountLimitOrderBook extends string
        ? WritableAccount<TAccountLimitOrderBook>
        : TAccountLimitOrderBook,
      TAccountCollateralEscrow extends string
        ? WritableAccount<TAccountCollateralEscrow>
        : TAccountCollateralEscrow,
      TAccountCollateralCustodyMint extends string
        ? ReadonlyAccount<TAccountCollateralCustodyMint>
        : TAccountCollateralCustodyMint,
      TAccountCustody extends string
        ? ReadonlyAccount<TAccountCustody>
        : TAccountCustody,
      TAccountCollateralCustody extends string
        ? ReadonlyAccount<TAccountCollateralCustody>
        : TAccountCollateralCustody,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountAssociatedTokenProgram extends string
        ? ReadonlyAccount<TAccountAssociatedTokenProgram>
        : TAccountAssociatedTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type AddLimitOrderInstructionData = {
  discriminator: ReadonlyUint8Array;
  triggerPrice: bigint;
  limitPrice: Option<bigint>;
  side: number;
  amount: bigint;
  leverage: number;
};

export type AddLimitOrderInstructionDataArgs = {
  triggerPrice: number | bigint;
  limitPrice: OptionOrNullable<number | bigint>;
  side: number;
  amount: number | bigint;
  leverage: number;
};

export function getAddLimitOrderInstructionDataEncoder(): Encoder<AddLimitOrderInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['triggerPrice', getU64Encoder()],
      ['limitPrice', getOptionEncoder(getU64Encoder())],
      ['side', getU8Encoder()],
      ['amount', getU64Encoder()],
      ['leverage', getU32Encoder()],
    ]),
    (value) => ({ ...value, discriminator: ADD_LIMIT_ORDER_DISCRIMINATOR })
  );
}

export function getAddLimitOrderInstructionDataDecoder(): Decoder<AddLimitOrderInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['triggerPrice', getU64Decoder()],
    ['limitPrice', getOptionDecoder(getU64Decoder())],
    ['side', getU8Decoder()],
    ['amount', getU64Decoder()],
    ['leverage', getU32Decoder()],
  ]);
}

export function getAddLimitOrderInstructionDataCodec(): Codec<
  AddLimitOrderInstructionDataArgs,
  AddLimitOrderInstructionData
> {
  return combineCodec(
    getAddLimitOrderInstructionDataEncoder(),
    getAddLimitOrderInstructionDataDecoder()
  );
}

export type AddLimitOrderInput<
  TAccountOwner extends string = string,
  TAccountFundingAccount extends string = string,
  TAccountTransferAuthority extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountLimitOrderBook extends string = string,
  TAccountCollateralEscrow extends string = string,
  TAccountCollateralCustodyMint extends string = string,
  TAccountCustody extends string = string,
  TAccountCollateralCustody extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountAssociatedTokenProgram extends string = string,
> = {
  /** #1 */
  owner: TransactionSigner<TAccountOwner>;
  /** #2 */
  fundingAccount: Address<TAccountFundingAccount>;
  /** #3 */
  transferAuthority: Address<TAccountTransferAuthority>;
  /** #4 */
  cortex: Address<TAccountCortex>;
  /** #5 */
  pool: Address<TAccountPool>;
  /** #6 */
  limitOrderBook: Address<TAccountLimitOrderBook>;
  /** #7 */
  collateralEscrow: Address<TAccountCollateralEscrow>;
  /** #8 */
  collateralCustodyMint: Address<TAccountCollateralCustodyMint>;
  /** #9 */
  custody: Address<TAccountCustody>;
  /** #10 */
  collateralCustody: Address<TAccountCollateralCustody>;
  /** #11 */
  systemProgram?: Address<TAccountSystemProgram>;
  /** #12 */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** #13 */
  associatedTokenProgram: Address<TAccountAssociatedTokenProgram>;
  triggerPrice: AddLimitOrderInstructionDataArgs['triggerPrice'];
  limitPrice: AddLimitOrderInstructionDataArgs['limitPrice'];
  side: AddLimitOrderInstructionDataArgs['side'];
  amount: AddLimitOrderInstructionDataArgs['amount'];
  leverage: AddLimitOrderInstructionDataArgs['leverage'];
};

export function getAddLimitOrderInstruction<
  TAccountOwner extends string,
  TAccountFundingAccount extends string,
  TAccountTransferAuthority extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountLimitOrderBook extends string,
  TAccountCollateralEscrow extends string,
  TAccountCollateralCustodyMint extends string,
  TAccountCustody extends string,
  TAccountCollateralCustody extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TAccountAssociatedTokenProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: AddLimitOrderInput<
    TAccountOwner,
    TAccountFundingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountLimitOrderBook,
    TAccountCollateralEscrow,
    TAccountCollateralCustodyMint,
    TAccountCustody,
    TAccountCollateralCustody,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociatedTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): AddLimitOrderInstruction<
  TProgramAddress,
  TAccountOwner,
  TAccountFundingAccount,
  TAccountTransferAuthority,
  TAccountCortex,
  TAccountPool,
  TAccountLimitOrderBook,
  TAccountCollateralEscrow,
  TAccountCollateralCustodyMint,
  TAccountCustody,
  TAccountCollateralCustody,
  TAccountSystemProgram,
  TAccountTokenProgram,
  TAccountAssociatedTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    owner: { value: input.owner ?? null, isWritable: true },
    fundingAccount: { value: input.fundingAccount ?? null, isWritable: true },
    transferAuthority: {
      value: input.transferAuthority ?? null,
      isWritable: false,
    },
    cortex: { value: input.cortex ?? null, isWritable: false },
    pool: { value: input.pool ?? null, isWritable: true },
    limitOrderBook: { value: input.limitOrderBook ?? null, isWritable: true },
    collateralEscrow: {
      value: input.collateralEscrow ?? null,
      isWritable: true,
    },
    collateralCustodyMint: {
      value: input.collateralCustodyMint ?? null,
      isWritable: false,
    },
    custody: { value: input.custody ?? null, isWritable: false },
    collateralCustody: {
      value: input.collateralCustody ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    associatedTokenProgram: {
      value: input.associatedTokenProgram ?? null,
      isWritable: false,
    },
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
      getAccountMeta(accounts.transferAuthority),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.limitOrderBook),
      getAccountMeta(accounts.collateralEscrow),
      getAccountMeta(accounts.collateralCustodyMint),
      getAccountMeta(accounts.custody),
      getAccountMeta(accounts.collateralCustody),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.associatedTokenProgram),
    ],
    programAddress,
    data: getAddLimitOrderInstructionDataEncoder().encode(
      args as AddLimitOrderInstructionDataArgs
    ),
  } as AddLimitOrderInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountFundingAccount,
    TAccountTransferAuthority,
    TAccountCortex,
    TAccountPool,
    TAccountLimitOrderBook,
    TAccountCollateralEscrow,
    TAccountCollateralCustodyMint,
    TAccountCustody,
    TAccountCollateralCustody,
    TAccountSystemProgram,
    TAccountTokenProgram,
    TAccountAssociatedTokenProgram
  >;

  return instruction;
}

export type ParsedAddLimitOrderInstruction<
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
    transferAuthority: TAccountMetas[2];
    /** #4 */
    cortex: TAccountMetas[3];
    /** #5 */
    pool: TAccountMetas[4];
    /** #6 */
    limitOrderBook: TAccountMetas[5];
    /** #7 */
    collateralEscrow: TAccountMetas[6];
    /** #8 */
    collateralCustodyMint: TAccountMetas[7];
    /** #9 */
    custody: TAccountMetas[8];
    /** #10 */
    collateralCustody: TAccountMetas[9];
    /** #11 */
    systemProgram: TAccountMetas[10];
    /** #12 */
    tokenProgram: TAccountMetas[11];
    /** #13 */
    associatedTokenProgram: TAccountMetas[12];
  };
  data: AddLimitOrderInstructionData;
};

export function parseAddLimitOrderInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedAddLimitOrderInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 13) {
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
      transferAuthority: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      limitOrderBook: getNextAccount(),
      collateralEscrow: getNextAccount(),
      collateralCustodyMint: getNextAccount(),
      custody: getNextAccount(),
      collateralCustody: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      associatedTokenProgram: getNextAccount(),
    },
    data: getAddLimitOrderInstructionDataDecoder().decode(instruction.data),
  };
}
