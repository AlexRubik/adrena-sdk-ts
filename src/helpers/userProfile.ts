// public getUserProfilePda = (wallet: PublicKey) => {
//     return PublicKey.findProgramAddressSync(
//       [Buffer.from("user_profile"), wallet.toBuffer()],
//       AdrenaClient.programId,
//     )[0];
//   };

import { address, Address, getAddressEncoder, getProgramDerivedAddress, Rpc, SolanaRpcApi, TransactionSigner } from "@solana/kit";
import { ADRENA_PROGRAM_ID } from "./constants";
import { getCortexPda } from "./utils";
import { SYSTEM_PROGRAM_ADDRESS } from "@solana-program/system";
import { getEditUserProfileInstruction, getInitUserProfileInstruction } from "../../codama-generated";


export function getUserProfilePda(wallet: Address) {

    const encoder = getAddressEncoder();
    const encodedWallet = encoder.encode(wallet);

    return getProgramDerivedAddress({
        programAddress: ADRENA_PROGRAM_ID,
        seeds: [Buffer.from("user_profile"), encodedWallet],
        
});
}

export async function hasUserProfile(wallet: Address, rpc: Rpc<SolanaRpcApi>) {
    const pda = await getUserProfilePda(wallet);
    console.log(`User Profile PDA: ${pda[0]}`);
    const pdaBalance = await rpc.getBalance(pda[0]).send();
    console.log(pdaBalance);
    return pdaBalance.value > 0;
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
    const randomNumber = Math.floor(Math.random() * 100000);
    // get random fill character, if math random is > 0.5, use number 2 else 1
    const fillChar = Math.random() > 0.5 ? "2" : "1";
    return `RudeGoon${randomNumber.toString().padStart(5, fillChar)}`;
}

export async function buildInitUserProfileIx(wallet: TransactionSigner) {

    const nickname = getUniqueMonsterName();
    const profilePicture = 0;
    const wallpaper = 0;
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
        user: wallet,
        userNickname: userNicknamePda[0],
        userProfile: userPda[0],
    }
)

    return ix;
}


export async function buildEditUserProfileIx(wallet: TransactionSigner) {

    const profilePicture = 0;
    const wallpaper = 0;
    const title = 0;
    const referrerProfile = address('F5MG8jgytQT6pS5CgtRGRmNRCufkxR7CkGMQiPt6Z6xb');

    const userPda = await getUserProfilePda(wallet.address);

    const ix = getEditUserProfileInstruction({
        payer: wallet,
        user: wallet,
        userProfile: userPda[0],
        profilePicture,
        wallpaper,
        title,
        referrerProfile,
    })

}