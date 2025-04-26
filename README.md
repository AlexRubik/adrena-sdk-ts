[![npm version](https://img.shields.io/npm/v/adrena-sdk-ts.svg)](https://www.npmjs.com/package/adrena-sdk-ts)
[![npm downloads](https://img.shields.io/npm/dm/adrena-sdk-ts.svg)](https://www.npmjs.com/package/adrena-sdk-ts)

In development...

SDK for interacting with the Adrena Protocol using Typescript and [@solana/kit](https://github.com/anza-xyz/kit)

Adrena Links:
- Website: https://app.adrena.xyz/
- X: https://x.com/AdrenaProtocol
- Discord: https://discord.gg/Z3UZAVA2ch
- Docs: https://docs.adrena.xyz/

## Installation

Install the Adrena SDK and required dependencies:

### Using yarn
```bash
# Install the SDK
yarn add adrena-sdk-ts

# Install dotenv for environment variable management
yarn add dotenv
```

### Using npm
```bash
# Install the SDK
npm install adrena-sdk-ts

# Install dotenv for environment variable management
npm install dotenv
```

## Configuration

To use this SDK, you will need to interact with the Solana blockchain using an RPC URL and sign transactions with your private key. We will initialize a "Solana Kit Client" to use these dependencies.

The Kit Client can be configured in two ways:

1. Using .env variables:

Create a file in your root directory, name it .env, and provide it with these values:
   - [Example .env file](https://github.com/AlexRubik/adrena-sdk-ts/blob/main/.env.example)
   - Remember to put .env in your .gitignore file if you are using Git
   - `PRIVATE_KEY_STR`: Your Solana private key
   - `RPC_URL`: Solana RPC URL
   - `WS_URL`: Solana WebSocket URL (optional)

2. Passing configuration directly:
   - NOT RECOMMENDED but you can also provide your private key directly in the code.
   ```typescript
   import { createKitClient } from 'adrena-sdk-ts';
   
   const client = await createKitClient({
     privateKey: 'your-private-key',
     rpcUrl: 'https://your-rpc-url.com',
     wsUrl: 'wss://your-ws-url.com' // optional
   });
   ```
   
## Get Started
See [examples directory](https://github.com/AlexRubik/adrena-sdk-ts/tree/main/examples/src) to see how we can interact with the Adrena Protocol.