import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { sepolia, hardhat } from "wagmi/chains";

/**
 * Konfigurasi Wagmi + RainbowKit
 *
 * PENTING: Ganti VITE_WALLETCONNECT_PROJECT_ID di .env dengan project ID dari
 * https://cloud.walletconnect.com
 */

// WalletConnect Project ID (daftar gratis di cloud.walletconnect.com)
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "demo";

// Konfigurasi RainbowKit + Wagmi
export const config = getDefaultConfig({
    // Nama aplikasi yang ditampilkan di wallet
    appName: "Greeting Board",

    // Project ID untuk WalletConnect
    projectId,

    // Chain yang didukung (Sepolia testnet + Hardhat lokal untuk development)
    chains: [sepolia, hardhat],

    // Transport untuk setiap chain
    transports: {
        [sepolia.id]: http(
            import.meta.env.VITE_SEPOLIA_RPC_URL ||
            "https://rpc.sepolia.org"
        ),
        [hardhat.id]: http("http://127.0.0.1:8545"),
    },

    // Enable Server-Side Rendering support
    ssr: false,
});

// ============================================================
// CONTRACT CONFIGURATION
// ============================================================

/**
 * Alamat contract GreetingBoard yang sudah di-deploy
 * Ganti dengan alamat contract hasil deploy ke Sepolia
 */
export const GREETING_BOARD_ADDRESS = (import.meta.env.VITE_CONTRACT_ADDRESS ||
    "0x0000000000000000000000000000000000000000") as `0x${string}`;

/**
 * ABI dari contract GreetingBoard
 * Diambil dari artifacts/contracts/GreetingBoard.sol/GreetingBoard.json
 */
export const GREETING_BOARD_ABI = [
    {
        inputs: [],
        name: "MAX_GREETINGS",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllGreetings",
        outputs: [
            {
                components: [
                    { internalType: "address", name: "sender", type: "address" },
                    { internalType: "string", name: "message", type: "string" },
                    { internalType: "uint256", name: "timestamp", type: "uint256" },
                ],
                internalType: "struct GreetingBoard.Greeting[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getGreetingsCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getTotalGreetings",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "greetings",
        outputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "string", name: "message", type: "string" },
            { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalGreetings",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "_message", type: "string" }],
        name: "writeGreeting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "sender", type: "address" },
            { indexed: false, internalType: "string", name: "message", type: "string" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        name: "GreetingUpdated",
        type: "event",
    },
] as const;
