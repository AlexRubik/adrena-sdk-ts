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
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { ADRENA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const GENESIS_OTC_IN_DISCRIMINATOR = new Uint8Array([
  250, 84, 122, 89, 253, 185, 57, 186,
]);

export function getGenesisOtcInDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    GENESIS_OTC_IN_DISCRIMINATOR
  );
}

export type GenesisOtcInInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountFundingAccountOne extends string | IAccountMeta<string> = string,
  TAccountFundingAccountTwo extends string | IAccountMeta<string> = string,
  TAccountFundingAccountThree extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountCustodyOne extends string | IAccountMeta<string> = string,
  TAccountCustodyOneTokenAccount extends string | IAccountMeta<string> = string,
  TAccountCustodyTwo extends string | IAccountMeta<string> = string,
  TAccountCustodyTwoTokenAccount extends string | IAccountMeta<string> = string,
  TAccountCustodyThree extends string | IAccountMeta<string> = string,
  TAccountCustodyThreeTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountGenesisLock extends string | IAccountMeta<string> = string,
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
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountFundingAccountOne extends string
        ? WritableAccount<TAccountFundingAccountOne>
        : TAccountFundingAccountOne,
      TAccountFundingAccountTwo extends string
        ? WritableAccount<TAccountFundingAccountTwo>
        : TAccountFundingAccountTwo,
      TAccountFundingAccountThree extends string
        ? WritableAccount<TAccountFundingAccountThree>
        : TAccountFundingAccountThree,
      TAccountCortex extends string
        ? ReadonlyAccount<TAccountCortex>
        : TAccountCortex,
      TAccountPool extends string
        ? ReadonlyAccount<TAccountPool>
        : TAccountPool,
      TAccountCustodyOne extends string
        ? WritableAccount<TAccountCustodyOne>
        : TAccountCustodyOne,
      TAccountCustodyOneTokenAccount extends string
        ? WritableAccount<TAccountCustodyOneTokenAccount>
        : TAccountCustodyOneTokenAccount,
      TAccountCustodyTwo extends string
        ? WritableAccount<TAccountCustodyTwo>
        : TAccountCustodyTwo,
      TAccountCustodyTwoTokenAccount extends string
        ? WritableAccount<TAccountCustodyTwoTokenAccount>
        : TAccountCustodyTwoTokenAccount,
      TAccountCustodyThree extends string
        ? WritableAccount<TAccountCustodyThree>
        : TAccountCustodyThree,
      TAccountCustodyThreeTokenAccount extends string
        ? WritableAccount<TAccountCustodyThreeTokenAccount>
        : TAccountCustodyThreeTokenAccount,
      TAccountGenesisLock extends string
        ? WritableAccount<TAccountGenesisLock>
        : TAccountGenesisLock,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type GenesisOtcInInstructionData = {
  discriminator: ReadonlyUint8Array;
  custodyOneAmount: bigint;
  custodyTwoAmount: bigint;
  custodyThreeAmount: bigint;
};

export type GenesisOtcInInstructionDataArgs = {
  custodyOneAmount: number | bigint;
  custodyTwoAmount: number | bigint;
  custodyThreeAmount: number | bigint;
};

export function getGenesisOtcInInstructionDataEncoder(): Encoder<GenesisOtcInInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['custodyOneAmount', getU64Encoder()],
      ['custodyTwoAmount', getU64Encoder()],
      ['custodyThreeAmount', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: GENESIS_OTC_IN_DISCRIMINATOR })
  );
}

export function getGenesisOtcInInstructionDataDecoder(): Decoder<GenesisOtcInInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['custodyOneAmount', getU64Decoder()],
    ['custodyTwoAmount', getU64Decoder()],
    ['custodyThreeAmount', getU64Decoder()],
  ]);
}

export function getGenesisOtcInInstructionDataCodec(): Codec<
  GenesisOtcInInstructionDataArgs,
  GenesisOtcInInstructionData
> {
  return combineCodec(
    getGenesisOtcInInstructionDataEncoder(),
    getGenesisOtcInInstructionDataDecoder()
  );
}

export type GenesisOtcInInput<
  TAccountAdmin extends string = string,
  TAccountPayer extends string = string,
  TAccountFundingAccountOne extends string = string,
  TAccountFundingAccountTwo extends string = string,
  TAccountFundingAccountThree extends string = string,
  TAccountCortex extends string = string,
  TAccountPool extends string = string,
  TAccountCustodyOne extends string = string,
  TAccountCustodyOneTokenAccount extends string = string,
  TAccountCustodyTwo extends string = string,
  TAccountCustodyTwoTokenAccount extends string = string,
  TAccountCustodyThree extends string = string,
  TAccountCustodyThreeTokenAccount extends string = string,
  TAccountGenesisLock extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** #1 */
  admin: TransactionSigner<TAccountAdmin>;
  /** #2 */
  payer: TransactionSigner<TAccountPayer>;
  /** #3 */
  fundingAccountOne: Address<TAccountFundingAccountOne>;
  /** #4 */
  fundingAccountTwo: Address<TAccountFundingAccountTwo>;
  /** #5 */
  fundingAccountThree: Address<TAccountFundingAccountThree>;
  /** #6 */
  cortex: Address<TAccountCortex>;
  /** #7 */
  pool: Address<TAccountPool>;
  /** #8 */
  custodyOne: Address<TAccountCustodyOne>;
  /** #9 */
  custodyOneTokenAccount: Address<TAccountCustodyOneTokenAccount>;
  /** #10 */
  custodyTwo: Address<TAccountCustodyTwo>;
  /** #11 */
  custodyTwoTokenAccount: Address<TAccountCustodyTwoTokenAccount>;
  /** #12 */
  custodyThree: Address<TAccountCustodyThree>;
  /** #13 */
  custodyThreeTokenAccount: Address<TAccountCustodyThreeTokenAccount>;
  /** #14 */
  genesisLock: Address<TAccountGenesisLock>;
  /** #15 */
  systemProgram?: Address<TAccountSystemProgram>;
  /** #16 */
  tokenProgram?: Address<TAccountTokenProgram>;
  custodyOneAmount: GenesisOtcInInstructionDataArgs['custodyOneAmount'];
  custodyTwoAmount: GenesisOtcInInstructionDataArgs['custodyTwoAmount'];
  custodyThreeAmount: GenesisOtcInInstructionDataArgs['custodyThreeAmount'];
};

export function getGenesisOtcInInstruction<
  TAccountAdmin extends string,
  TAccountPayer extends string,
  TAccountFundingAccountOne extends string,
  TAccountFundingAccountTwo extends string,
  TAccountFundingAccountThree extends string,
  TAccountCortex extends string,
  TAccountPool extends string,
  TAccountCustodyOne extends string,
  TAccountCustodyOneTokenAccount extends string,
  TAccountCustodyTwo extends string,
  TAccountCustodyTwoTokenAccount extends string,
  TAccountCustodyThree extends string,
  TAccountCustodyThreeTokenAccount extends string,
  TAccountGenesisLock extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: GenesisOtcInInput<
    TAccountAdmin,
    TAccountPayer,
    TAccountFundingAccountOne,
    TAccountFundingAccountTwo,
    TAccountFundingAccountThree,
    TAccountCortex,
    TAccountPool,
    TAccountCustodyOne,
    TAccountCustodyOneTokenAccount,
    TAccountCustodyTwo,
    TAccountCustodyTwoTokenAccount,
    TAccountCustodyThree,
    TAccountCustodyThreeTokenAccount,
    TAccountGenesisLock,
    TAccountSystemProgram,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): GenesisOtcInInstruction<
  TProgramAddress,
  TAccountAdmin,
  TAccountPayer,
  TAccountFundingAccountOne,
  TAccountFundingAccountTwo,
  TAccountFundingAccountThree,
  TAccountCortex,
  TAccountPool,
  TAccountCustodyOne,
  TAccountCustodyOneTokenAccount,
  TAccountCustodyTwo,
  TAccountCustodyTwoTokenAccount,
  TAccountCustodyThree,
  TAccountCustodyThreeTokenAccount,
  TAccountGenesisLock,
  TAccountSystemProgram,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    admin: { value: input.admin ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    fundingAccountOne: {
      value: input.fundingAccountOne ?? null,
      isWritable: true,
    },
    fundingAccountTwo: {
      value: input.fundingAccountTwo ?? null,
      isWritable: true,
    },
    fundingAccountThree: {
      value: input.fundingAccountThree ?? null,
      isWritable: true,
    },
    cortex: { value: input.cortex ?? null, isWritable: false },
    pool: { value: input.pool ?? null, isWritable: false },
    custodyOne: { value: input.custodyOne ?? null, isWritable: true },
    custodyOneTokenAccount: {
      value: input.custodyOneTokenAccount ?? null,
      isWritable: true,
    },
    custodyTwo: { value: input.custodyTwo ?? null, isWritable: true },
    custodyTwoTokenAccount: {
      value: input.custodyTwoTokenAccount ?? null,
      isWritable: true,
    },
    custodyThree: { value: input.custodyThree ?? null, isWritable: true },
    custodyThreeTokenAccount: {
      value: input.custodyThreeTokenAccount ?? null,
      isWritable: true,
    },
    genesisLock: { value: input.genesisLock ?? null, isWritable: true },
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
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.fundingAccountOne),
      getAccountMeta(accounts.fundingAccountTwo),
      getAccountMeta(accounts.fundingAccountThree),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.custodyOne),
      getAccountMeta(accounts.custodyOneTokenAccount),
      getAccountMeta(accounts.custodyTwo),
      getAccountMeta(accounts.custodyTwoTokenAccount),
      getAccountMeta(accounts.custodyThree),
      getAccountMeta(accounts.custodyThreeTokenAccount),
      getAccountMeta(accounts.genesisLock),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getGenesisOtcInInstructionDataEncoder().encode(
      args as GenesisOtcInInstructionDataArgs
    ),
  } as GenesisOtcInInstruction<
    TProgramAddress,
    TAccountAdmin,
    TAccountPayer,
    TAccountFundingAccountOne,
    TAccountFundingAccountTwo,
    TAccountFundingAccountThree,
    TAccountCortex,
    TAccountPool,
    TAccountCustodyOne,
    TAccountCustodyOneTokenAccount,
    TAccountCustodyTwo,
    TAccountCustodyTwoTokenAccount,
    TAccountCustodyThree,
    TAccountCustodyThreeTokenAccount,
    TAccountGenesisLock,
    TAccountSystemProgram,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedGenesisOtcInInstruction<
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
    fundingAccountOne: TAccountMetas[2];
    /** #4 */
    fundingAccountTwo: TAccountMetas[3];
    /** #5 */
    fundingAccountThree: TAccountMetas[4];
    /** #6 */
    cortex: TAccountMetas[5];
    /** #7 */
    pool: TAccountMetas[6];
    /** #8 */
    custodyOne: TAccountMetas[7];
    /** #9 */
    custodyOneTokenAccount: TAccountMetas[8];
    /** #10 */
    custodyTwo: TAccountMetas[9];
    /** #11 */
    custodyTwoTokenAccount: TAccountMetas[10];
    /** #12 */
    custodyThree: TAccountMetas[11];
    /** #13 */
    custodyThreeTokenAccount: TAccountMetas[12];
    /** #14 */
    genesisLock: TAccountMetas[13];
    /** #15 */
    systemProgram: TAccountMetas[14];
    /** #16 */
    tokenProgram: TAccountMetas[15];
  };
  data: GenesisOtcInInstructionData;
};

export function parseGenesisOtcInInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedGenesisOtcInInstruction<TProgram, TAccountMetas> {
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
  return {
    programAddress: instruction.programAddress,
    accounts: {
      admin: getNextAccount(),
      payer: getNextAccount(),
      fundingAccountOne: getNextAccount(),
      fundingAccountTwo: getNextAccount(),
      fundingAccountThree: getNextAccount(),
      cortex: getNextAccount(),
      pool: getNextAccount(),
      custodyOne: getNextAccount(),
      custodyOneTokenAccount: getNextAccount(),
      custodyTwo: getNextAccount(),
      custodyTwoTokenAccount: getNextAccount(),
      custodyThree: getNextAccount(),
      custodyThreeTokenAccount: getNextAccount(),
      genesisLock: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getGenesisOtcInInstructionDataDecoder().decode(instruction.data),
  };
}
