/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU8Decoder,
  getU8Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
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

export const INIT_USER_PROFILE_DISCRIMINATOR = new Uint8Array([
  148, 35, 126, 247, 28, 169, 135, 175,
]);

export function getInitUserProfileDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    INIT_USER_PROFILE_DISCRIMINATOR
  );
}

export type InitUserProfileInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountUser extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountUserProfile extends string | IAccountMeta<string> = string,
  TAccountUserNickname extends string | IAccountMeta<string> = string,
  TAccountReferrerProfile extends string | IAccountMeta<string> = string,
  TAccountCortex extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountUser extends string
        ? ReadonlySignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser>
        : TAccountUser,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountUserProfile extends string
        ? WritableAccount<TAccountUserProfile>
        : TAccountUserProfile,
      TAccountUserNickname extends string
        ? WritableAccount<TAccountUserNickname>
        : TAccountUserNickname,
      TAccountReferrerProfile extends string
        ? ReadonlyAccount<TAccountReferrerProfile>
        : TAccountReferrerProfile,
      TAccountCortex extends string
        ? WritableAccount<TAccountCortex>
        : TAccountCortex,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitUserProfileInstructionData = {
  discriminator: ReadonlyUint8Array;
  nickname: string;
  profilePicture: number;
  wallpaper: number;
  title: number;
};

export type InitUserProfileInstructionDataArgs = {
  nickname: string;
  profilePicture: number;
  wallpaper: number;
  title: number;
};

export function getInitUserProfileInstructionDataEncoder(): Encoder<InitUserProfileInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['nickname', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['profilePicture', getU8Encoder()],
      ['wallpaper', getU8Encoder()],
      ['title', getU8Encoder()],
    ]),
    (value) => ({ ...value, discriminator: INIT_USER_PROFILE_DISCRIMINATOR })
  );
}

export function getInitUserProfileInstructionDataDecoder(): Decoder<InitUserProfileInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['nickname', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['profilePicture', getU8Decoder()],
    ['wallpaper', getU8Decoder()],
    ['title', getU8Decoder()],
  ]);
}

export function getInitUserProfileInstructionDataCodec(): Codec<
  InitUserProfileInstructionDataArgs,
  InitUserProfileInstructionData
> {
  return combineCodec(
    getInitUserProfileInstructionDataEncoder(),
    getInitUserProfileInstructionDataDecoder()
  );
}

export type InitUserProfileInput<
  TAccountUser extends string = string,
  TAccountPayer extends string = string,
  TAccountUserProfile extends string = string,
  TAccountUserNickname extends string = string,
  TAccountReferrerProfile extends string = string,
  TAccountCortex extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  /** #1 */
  user: TransactionSigner<TAccountUser>;
  /** #2 */
  payer: TransactionSigner<TAccountPayer>;
  /** #3 */
  userProfile: Address<TAccountUserProfile>;
  /**
   * #4
   * Use PDA to make nicknames unique
   */
  userNickname: Address<TAccountUserNickname>;
  /**
   * #5
   * Apply this referrer to the user profile, If none, referrer_profile is set to default
   */
  referrerProfile?: Address<TAccountReferrerProfile>;
  /** #6 */
  cortex: Address<TAccountCortex>;
  /** #7 */
  systemProgram?: Address<TAccountSystemProgram>;
  nickname: InitUserProfileInstructionDataArgs['nickname'];
  profilePicture: InitUserProfileInstructionDataArgs['profilePicture'];
  wallpaper: InitUserProfileInstructionDataArgs['wallpaper'];
  title: InitUserProfileInstructionDataArgs['title'];
};

export function getInitUserProfileInstruction<
  TAccountUser extends string,
  TAccountPayer extends string,
  TAccountUserProfile extends string,
  TAccountUserNickname extends string,
  TAccountReferrerProfile extends string,
  TAccountCortex extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof ADRENA_PROGRAM_ADDRESS,
>(
  input: InitUserProfileInput<
    TAccountUser,
    TAccountPayer,
    TAccountUserProfile,
    TAccountUserNickname,
    TAccountReferrerProfile,
    TAccountCortex,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): InitUserProfileInstruction<
  TProgramAddress,
  TAccountUser,
  TAccountPayer,
  TAccountUserProfile,
  TAccountUserNickname,
  TAccountReferrerProfile,
  TAccountCortex,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? ADRENA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    user: { value: input.user ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    userProfile: { value: input.userProfile ?? null, isWritable: true },
    userNickname: { value: input.userNickname ?? null, isWritable: true },
    referrerProfile: {
      value: input.referrerProfile ?? null,
      isWritable: false,
    },
    cortex: { value: input.cortex ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
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

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.user),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.userProfile),
      getAccountMeta(accounts.userNickname),
      getAccountMeta(accounts.referrerProfile),
      getAccountMeta(accounts.cortex),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitUserProfileInstructionDataEncoder().encode(
      args as InitUserProfileInstructionDataArgs
    ),
  } as InitUserProfileInstruction<
    TProgramAddress,
    TAccountUser,
    TAccountPayer,
    TAccountUserProfile,
    TAccountUserNickname,
    TAccountReferrerProfile,
    TAccountCortex,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedInitUserProfileInstruction<
  TProgram extends string = typeof ADRENA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** #1 */
    user: TAccountMetas[0];
    /** #2 */
    payer: TAccountMetas[1];
    /** #3 */
    userProfile: TAccountMetas[2];
    /**
     * #4
     * Use PDA to make nicknames unique
     */

    userNickname: TAccountMetas[3];
    /**
     * #5
     * Apply this referrer to the user profile, If none, referrer_profile is set to default
     */

    referrerProfile?: TAccountMetas[4] | undefined;
    /** #6 */
    cortex: TAccountMetas[5];
    /** #7 */
    systemProgram: TAccountMetas[6];
  };
  data: InitUserProfileInstructionData;
};

export function parseInitUserProfileInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitUserProfileInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 7) {
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
      user: getNextAccount(),
      payer: getNextAccount(),
      userProfile: getNextAccount(),
      userNickname: getNextAccount(),
      referrerProfile: getNextOptionalAccount(),
      cortex: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getInitUserProfileInstructionDataDecoder().decode(instruction.data),
  };
}
