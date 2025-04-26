import { Rpc, 
  RpcSubscriptions, 
  SolanaRpcApi, 
  SolanaRpcSubscriptionsApi, 
  TransactionSigner, 
  createKeyPairSignerFromBytes, 
  createSolanaRpc, 
  createSolanaRpcSubscriptions,
  getBase58Codec
 } from "@solana/kit";
import dotenv from 'dotenv';
dotenv.config();
 
export type KitClient = {
  rpc: Rpc<SolanaRpcApi>;
  rpcSubscriptions: RpcSubscriptions<SolanaRpcSubscriptionsApi>;
  wallet: TransactionSigner;
};


 
let client: KitClient | undefined;
export async function createKitClient(): Promise<KitClient> {
  if (!client) {

    const codec = getBase58Codec();
    const pkArray = codec.encode(process.env.PRIVATE_KEY_STR || '');
    const wallet = await createKeyPairSignerFromBytes(pkArray);

    client = {
      rpc: createSolanaRpc(process.env.RPC_URL || 'https://api.mainnet-beta.solana.com'),
      rpcSubscriptions: createSolanaRpcSubscriptions(process.env.WS_URL || 'wss://api.mainnet-beta.solana.com'),
      wallet: wallet
    };
  }
  return client;
}