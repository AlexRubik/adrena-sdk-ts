import * as adrenaSDK from "adrena-sdk-ts";
import dotenv from "dotenv";

async function main() {
  console.log("Testing Adrena SDK");
  
  // Load environment variables
  dotenv.config();
  
  // Example usage
  const client = await adrenaSDK.createKitClient({
    privateKey: process.env.PRIVATE_KEY_STR,
    rpcUrl: process.env.RPC_URL,
    wsUrl: process.env.WS_URL
  });

  
  console.log("Client created:", client ? "Success" : "Failed");
}

main().catch(console.error);
