# Decentralized Greeting Board

A Web3 portfolio project demonstrating a fully decentralized greeting board on the Ethereum blockchain.

## 🛠 Tech Stack

- **Smart Contract**: Solidity ^0.8.24, Hardhat
- **Frontend**: React + Vite + TypeScript
- **Web3**: Wagmi v2, RainbowKit, Ethers.js v6
- **Styling**: TailwindCSS
- **Network**: Sepolia Testnet

## 📁 Project Structure

```
greeting-board/
├── contracts/          # Solidity smart contracts
│   └── GreetingBoard.sol
├── scripts/            # Deployment scripts
│   └── deploy.ts
├── test/               # Contract tests
│   └── GreetingBoard.test.ts
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── wagmi.config.ts
│   └── package.json
├── hardhat.config.ts
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- MetaMask or compatible wallet
- Sepolia ETH for gas (get from faucet)

### 1. Install Dependencies

```bash
# Root (Hardhat)
npm install

# Frontend
cd frontend
npm install
```

### 2. Configure Environment

```bash
# Copy example files
cp .env.example .env
cp frontend/.env.example frontend/.env
```

Edit `.env`:
```
PRIVATE_KEY=your_wallet_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```

Edit `frontend/.env`:
```
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_CONTRACT_ADDRESS=0x_deployed_address
```

### 3. Compile & Test Contract

```bash
# Compile
npx hardhat compile

# Run tests
npx hardhat test
```

### 4. Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

Copy the deployed contract address to `frontend/.env`.

### 5. Run Frontend

```bash
cd frontend
npm run dev
```

Open http://localhost:5173

## 📜 Smart Contract Features

- `writeGreeting(string)` - Store a new message
- `getAllGreetings()` - Get all stored greetings
- `getTotalGreetings()` - Get total messages ever written
- Max 5 messages stored (oldest removed when full)
- Event `GreetingUpdated` emitted on each write

## 🔗 Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://rainbowkit.com/docs)
- [Sepolia Faucet](https://sepoliafaucet.com)

## 📄 License

MIT
