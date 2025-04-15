import { Rpc, 
  RpcSubscriptions, 
  SolanaRpcApi, 
  SolanaRpcSubscriptionsApi, 
  createSolanaRpc, 
  createSolanaRpcSubscriptions
 } from "@solana/kit";
import dotenv from 'dotenv';
dotenv.config();
 
export type KitClient = {
  rpc: Rpc<SolanaRpcApi>;
  rpcSubscriptions: RpcSubscriptions<SolanaRpcSubscriptionsApi>;
};


 
let client: KitClient | undefined;
export function createClient(): KitClient {
  if (!client) {

    console.log(process.env.RPC_URL);
    client = {
      rpc: createSolanaRpc(process.env.RPC_URL || 'https://api.mainnet-beta.solana.com'),
      rpcSubscriptions: createSolanaRpcSubscriptions(process.env.WS_URL || 'wss://api.mainnet-beta.solana.com'),
    };
  }
  return client;
}