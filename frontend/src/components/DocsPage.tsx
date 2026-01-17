import { GREETING_BOARD_ADDRESS } from "../wagmi.config";

/**
 * Docs Page - Documentation and smart contract info
 */
export function DocsPage() {
    const contractAddress = GREETING_BOARD_ADDRESS;
    const etherscanUrl = `https://sepolia.etherscan.io/address/${contractAddress}`;

    return (
        <div className="max-w-4xl mx-auto w-full py-8 md:py-12 px-4 md:px-10">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Documentation
                </h1>
                <p className="text-slate-400 text-base md:text-lg">
                    Learn how the Greeting Board works and interact with the smart contract.
                </p>
            </div>

            {/* Contract Info */}
            <section className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span style={{ color: '#135bec' }}>📜</span> Smart Contract
                </h2>
                <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
                    <div className="mb-4">
                        <p className="text-sm text-slate-400 mb-1">Contract Address (Sepolia)</p>
                        <div className="flex items-center gap-2">
                            <code className="text-sm bg-slate-800 px-3 py-2 rounded-lg font-mono break-all" style={{ color: '#135bec' }}>
                                {contractAddress}
                            </code>
                            <a
                                href={etherscanUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-slate-800 rounded-lg transition-all text-slate-400 hover:text-[#135bec]"
                                title="View on Etherscan"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-slate-800/50 rounded-lg">
                            <p className="text-slate-400">Network</p>
                            <p className="font-semibold">Sepolia Testnet</p>
                        </div>
                        <div className="p-3 bg-slate-800/50 rounded-lg">
                            <p className="text-slate-400">Solidity Version</p>
                            <p className="font-semibold">^0.8.24</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span style={{ color: '#135bec' }}>⚙️</span> How It Works
                </h2>
                <div className="space-y-4">
                    <FeatureCard
                        step="1"
                        title="Connect Wallet"
                        description="Connect your MetaMask or WalletConnect compatible wallet to the Sepolia testnet."
                    />
                    <FeatureCard
                        step="2"
                        title="Write Message"
                        description="Type your greeting message (max 280 characters) in the composer."
                    />
                    <FeatureCard
                        step="3"
                        title="Confirm Transaction"
                        description="Approve the transaction in your wallet. You'll need Sepolia ETH for gas fees."
                    />
                    <FeatureCard
                        step="4"
                        title="Stored Forever"
                        description="Your message is stored immutably on the blockchain. The board keeps the 5 most recent messages."
                    />
                </div>
            </section>

            {/* Functions */}
            <section className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span style={{ color: '#135bec' }}>🔧</span> Contract Functions
                </h2>
                <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-800/50">
                            <tr>
                                <th className="text-left p-4 font-semibold">Function</th>
                                <th className="text-left p-4 font-semibold hidden md:table-cell">Description</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="p-4 font-mono text-xs" style={{ color: '#135bec' }}>writeGreeting(string)</td>
                                <td className="p-4 text-slate-400 hidden md:table-cell">Store a new greeting message</td>
                                <td className="p-4"><span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">Write</span></td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-xs" style={{ color: '#135bec' }}>getAllGreetings()</td>
                                <td className="p-4 text-slate-400 hidden md:table-cell">Get all stored greetings (max 5)</td>
                                <td className="p-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Read</span></td>
                            </tr>
                            <tr>
                                <td className="p-4 font-mono text-xs" style={{ color: '#135bec' }}>getTotalGreetings()</td>
                                <td className="p-4 text-slate-400 hidden md:table-cell">Get total greetings ever written</td>
                                <td className="p-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Read</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Get Test ETH */}
            <section className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span style={{ color: '#135bec' }}>💧</span> Get Sepolia ETH
                </h2>
                <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
                    <p className="text-slate-400 mb-4">
                        You need Sepolia ETH to pay for gas fees. Get free test ETH from these faucets:
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                        >
                            Google Cloud Faucet
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <a
                            href="https://www.alchemy.com/faucets/ethereum-sepolia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                        >
                            Alchemy Faucet
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <a
                            href="https://www.infura.io/faucet/sepolia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                        >
                            Infura Faucet
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span style={{ color: '#135bec' }}>🛠️</span> Tech Stack
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechBadge name="Solidity" version="^0.8.24" />
                    <TechBadge name="Hardhat" version="Latest" />
                    <TechBadge name="React" version="19" />
                    <TechBadge name="Wagmi" version="v2" />
                    <TechBadge name="RainbowKit" version="v2" />
                    <TechBadge name="Vite" version="6" />
                    <TechBadge name="TypeScript" version="5" />
                    <TechBadge name="TailwindCSS" version="3" />
                </div>
            </section>
        </div>
    );
}

function FeatureCard({
    step,
    title,
    description,
}: {
    step: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
            <div
                className="size-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                style={{ backgroundColor: '#135bec' }}
            >
                {step}
            </div>
            <div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-slate-400">{description}</p>
            </div>
        </div>
    );
}

function TechBadge({ name, version }: { name: string; version: string }) {
    return (
        <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 text-center">
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-slate-500">{version}</p>
        </div>
    );
}
