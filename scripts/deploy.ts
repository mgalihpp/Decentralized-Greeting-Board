import { ethers } from "hardhat";

/**
 * Deploy script for GreetingBoard contract
 * 
 * Usage:
 * - Local: npx hardhat run scripts/deploy.ts
 * - Sepolia: npx hardhat run scripts/deploy.ts --network sepolia
 */
async function main() {
    console.log("🚀 Starting deployment of GreetingBoard...\n");

    // Get deployer account
    const [deployer] = await ethers.getSigners();
    console.log("📍 Deploying with account:", deployer.address);

    // Check deployer balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(balance), "ETH\n");

    // Deploy the contract
    console.log("📦 Deploying GreetingBoard contract...");
    const GreetingBoard = await ethers.getContractFactory("GreetingBoard");
    const greetingBoard = await GreetingBoard.deploy();

    // Wait for deployment to complete
    await greetingBoard.waitForDeployment();

    // Get deployed address
    const contractAddress = await greetingBoard.getAddress();
    console.log("✅ GreetingBoard deployed to:", contractAddress);

    // Log deployment info
    console.log("\n========================================");
    console.log("📋 Deployment Summary");
    console.log("========================================");
    console.log("Contract Address:", contractAddress);
    console.log("Deployer Address:", deployer.address);
    console.log("Network:", (await ethers.provider.getNetwork()).name);
    console.log("========================================\n");

    // Reminder for frontend .env
    console.log("📝 Add this to your frontend/.env file:");
    console.log(`VITE_CONTRACT_ADDRESS=${contractAddress}\n`);

    return contractAddress;
}

// Execute deployment
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
