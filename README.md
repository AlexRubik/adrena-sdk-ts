[![npm version](https://img.shields.io/npm/v/adrena-sdk-ts.svg)](https://www.npmjs.com/package/adrena-sdk-ts)
[![npm downloads](https://img.shields.io/npm/dm/adrena-sdk-ts.svg)](https://www.npmjs.com/package/adrena-sdk-ts)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/adrena-sdk-ts.svg)](https://bundlephobia.com/package/adrena-sdk-ts)

In development...

SDK for interacting with the Adrena Protocol using Typescript and [@solana/kit](https://github.com/anza-xyz/kit)

Adrena Links:
- Website: https://app.adrena.xyz/
- X: https://x.com/AdrenaProtocol
- Discord: https://discord.gg/Z3UZAVA2ch
- Docs: https://docs.adrena.xyz/


## Configuration

The Kit Client can be configured in two ways:

1. Using environment variables:
   - `PRIVATE_KEY_STR`: Your Solana private key
   - `RPC_URL`: Solana RPC URL
   - `WS_URL`: Solana WebSocket URL

2. Passing configuration directly:
   ```typescript
   import { createKitClient } from 'adrena-sdk-ts';
   
   const client = await createKitClient({
     privateKey: 'your-private-key',
     rpcUrl: 'https://your-rpc-url.com',
     wsUrl: 'wss://your-ws-url.com'
   });
   ```