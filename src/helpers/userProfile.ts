

import { address, 
    Address, 
    GetAccountInfoApi, 
    getAddressEncoder, 
    getProgramDerivedAddress, 
    getUtf8Decoder,
    Rpc, 
    SolanaRpcApi, 
    TransactionSigner 
} from "@solana/kit";
import { ADRENA_PROGRAM_ID, DEV_PDA } from "./constants";
import { getCortexPda } from "./utils";
import { SYSTEM_PROGRAM_ADDRESS } from "@solana-program/system";
import { 
    fetchUserProfile, 
    getEditUserProfileInstruction, 
    getInitUserProfileInstruction,
} from "../../codama-generated";


export function getUserProfilePda(wallet: Address) {

    const encoder = getAddressEncoder();
    const encodedWallet = encoder.encode(wallet);

    return getProgramDerivedAddress({
        programAddress: ADRENA_PROGRAM_ID,
        seeds: [Buffer.from("user_profile"), encodedWallet],
        
});
}

export async function hasUserProfile(wallet: Address, rpc: Rpc<SolanaRpcApi>) {

    try {
        const pda = await getUserProfilePda(wallet);
        console.log(`User Profile PDA: ${pda[0]}`);
        const pdaBalance = await rpc.getBalance(pda[0]).send();

    pdaBalance.value > 0 ? console.log('User Profile exists') : console.log('User Profile does not exist');
    
    return {
            exists: pdaBalance.value > 0,
            pda: pda[0],
        };
    } catch (error) {
        console.error(error);
        return {
            exists: false,
            pda: null,
        };
    }
}

// public getUserNicknamePda = (nickname: string) => {
//     return PublicKey.findProgramAddressSync(
//       [Buffer.from("nickname"), Buffer.from(nickname)],
//       AdrenaClient.programId,
//     )[0];
//   };

export function getUserNicknamePda(nickname: string) {
    
    return getProgramDerivedAddress({
        programAddress: ADRENA_PROGRAM_ID,
        seeds: [Buffer.from("nickname"), Buffer.from(nickname)],
    });
}

export function getUniqueMonsterName() {
    // Use cryptographically secure random number generation
    const randomArray = new Uint32Array(2);
    crypto.getRandomValues(randomArray);

    // Generate random number between 0 and 99999
    const randomNumber = randomArray[0] % 100000;

    // Get random fill character securely: if random value is > 0.5, use "2" else "1"
    const fillChar = (randomArray[1] / 0xFFFFFFFF) > 0.5 ? "2" : "1";

    return `RudeGoon${randomNumber.toString().padStart(5, fillChar)}`;
}

export async function buildInitUserProfileIx(wallet: TransactionSigner) {

    const nickname = getUniqueMonsterName();
    const profilePicture = 1;
    const wallpaper = 4;
    const title = 0;
    const referrerProfile = address('F5MG8jgytQT6pS5CgtRGRmNRCufkxR7CkGMQiPt6Z6xb');

    const userPda = await getUserProfilePda(wallet.address);

    const cortexPda = await getCortexPda();

    const userNicknamePda = await getUserNicknamePda(nickname);

    const systemProgram = SYSTEM_PROGRAM_ADDRESS;

    const ix = getInitUserProfileInstruction(
        {
        nickname,
        profilePicture,
        wallpaper,
        cortex: cortexPda[0],
        payer: wallet,
        referrerProfile,
        systemProgram,
        title,
        user: wallet.address,
        caller: wallet,
        team: 0,
        continent: 0,
        userNickname: userNicknamePda[0],
        userProfile: userPda[0],
    }
)

    return ix;
}


export async function buildEditUserProfileIx(wallet: TransactionSigner) {

    const profilePicture = 1;
    const wallpaper = 4;
    const title = 0;

    const userPda = await getUserProfilePda(wallet.address);

    const ix = getEditUserProfileInstruction({
        payer: wallet,
        user: wallet,
        team: 0,
        continent: 0,
        userProfile: userPda[0],
        profilePicture,
        wallpaper,
        title,
        referrerProfile: DEV_PDA,
    })

    return ix;

}

export async function getBasicProfileData(profilePda: Address, rpc: Rpc<GetAccountInfoApi>) {

    // address value in userProfile object is pda, not wallet address
    // referrerProfile is also a pda

    const userProfile = await fetchUserProfile(rpc, profilePda);

    const decoder = getUtf8Decoder();
    const nickname = decoder.decode(userProfile.data.nickname.value);

    return {
        nickname,
        userProfile,
    };
}