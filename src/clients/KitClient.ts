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

// Load .env file if it exists, but don't require it
dotenv.config();
 
export type KitClient = {
  rpc: Rpc<SolanaRpcApi>;
  rpcSubscriptions: RpcSubscriptions<SolanaRpcSubscriptionsApi>;
  wallet: TransactionSigner;
};

export type KitClientConfig = {
  privateKey?: string;
  rpcUrl?: string;
  wsUrl?: string;
};

let client: KitClient | undefined;

export async function createKitClient(config?: KitClientConfig): Promise<KitClient> {
  if (!client) {
    const privateKey = config?.privateKey || process.env.PRIVATE_KEY_STR || '';
    const rpcUrl = config?.rpcUrl || process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
    const wsUrl = config?.wsUrl || process.env.WS_URL || 'wss://api.mainnet-beta.solana.com';

    const codec = getBase58Codec();
    const pkArray = codec.encode(privateKey);
    const wallet = await createKeyPairSignerFromBytes(pkArray);

    client = {
      rpc: createSolanaRpc(rpcUrl),
      rpcSubscriptions: createSolanaRpcSubscriptions(wsUrl),
      wallet: wallet
    };
  }
  return client;
}

// Add a function to reset the client (useful for testing or changing configurations)
export function resetKitClient(): void {
  client = undefined;
}