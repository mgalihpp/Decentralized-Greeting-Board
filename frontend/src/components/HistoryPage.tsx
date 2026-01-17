import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import {
    GREETING_BOARD_ADDRESS,
    GREETING_BOARD_ABI,
} from "../wagmi.config";

interface Greeting {
    sender: `0x${string}`;
    message: string;
    timestamp: bigint;
}

/**
 * History Page - Shows user's own greetings
 */
export function HistoryPage() {
    const { isConnected, address } = useAccount();

    const { data: greetings, isLoading } = useReadContract({
        address: GREETING_BOARD_ADDRESS,
        abi: GREETING_BOARD_ABI,
        functionName: "getAllGreetings",
    });

    // Filter greetings by current user
    const userGreetings = greetings
        ? (greetings as Greeting[]).filter(
            (g) => g.sender.toLowerCase() === address?.toLowerCase()
        )
        : [];

    return (
        <div className="max-w-4xl mx-auto w-full py-8 md:py-12 px-4 md:px-10">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Your History
                </h1>
                <p className="text-slate-400 text-base md:text-lg">
                    View all greetings you've posted on the blockchain.
                </p>
            </div>

            {/* Content */}
            {!isConnected ? (
                <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
                    <div className="text-5xl mb-4">🔐</div>
                    <p className="text-slate-400 text-lg mb-2">Wallet not connected</p>
                    <p className="text-sm text-slate-500">
                        Connect your wallet to see your greeting history.
                    </p>
                </div>
            ) : isLoading ? (
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl animate-pulse"
                        >
                            <div className="h-5 w-3/4 bg-slate-700 rounded mb-2" />
                            <div className="h-4 w-1/4 bg-slate-800 rounded" />
                        </div>
                    ))}
                </div>
            ) : userGreetings.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
                    <div className="text-5xl mb-4">📝</div>
                    <p className="text-slate-400 text-lg mb-2">No greetings yet</p>
                    <p className="text-sm text-slate-500">
                        Go to Home and post your first greeting!
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {userGreetings.map((greeting, index) => (
                        <div
                            key={`${greeting.timestamp}-${index}`}
                            className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl"
                        >
                            <p className="text-lg text-slate-200 font-medium mb-3">
                                {greeting.message}
                            </p>
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <span>{formatDate(greeting.timestamp)}</span>
                                <a
                                    href={`https://sepolia.etherscan.io/address/${greeting.sender}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#135bec] transition-all flex items-center gap-1"
                                >
                                    View on Etherscan
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats */}
            {isConnected && userGreetings.length > 0 && (
                <div className="mt-8 p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
                    <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-800/50 rounded-xl">
                            <p className="text-3xl font-bold" style={{ color: '#135bec' }}>
                                {userGreetings.length}
                            </p>
                            <p className="text-sm text-slate-400">Total Greetings</p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-xl">
                            <p className="text-3xl font-bold text-green-400">
                                {formatDate(userGreetings[userGreetings.length - 1]?.timestamp)}
                            </p>
                            <p className="text-sm text-slate-400">Last Posted</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function formatDate(timestamp: bigint): string {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
