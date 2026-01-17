import { useState, useCallback } from "react";
import { useReadContract, useWatchContractEvent } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import {
    GREETING_BOARD_ADDRESS,
    GREETING_BOARD_ABI,
} from "../wagmi.config";

interface Greeting {
    sender: `0x${string}`;
    message: string;
    timestamp: bigint;
}

// Gradient colors for avatars
const GRADIENT_COLORS = [
    "from-pink-500 to-indigo-500",
    "from-cyan-400 to-blue-600",
    "from-amber-400 to-orange-600",
    "from-green-400 to-emerald-600",
    "from-purple-400 to-pink-600",
];

type SortOrder = "newest" | "oldest";

/**
 * GreetingList Component with Filter & Refresh
 */
export function GreetingList() {
    const queryClient = useQueryClient();
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const {
        data: greetings,
        isLoading,
        isError,
        error,
        refetch,
    } = useReadContract({
        address: GREETING_BOARD_ADDRESS,
        abi: GREETING_BOARD_ABI,
        functionName: "getAllGreetings",
    });

    const { data: totalGreetings } = useReadContract({
        address: GREETING_BOARD_ADDRESS,
        abi: GREETING_BOARD_ABI,
        functionName: "getTotalGreetings",
    });

    useWatchContractEvent({
        address: GREETING_BOARD_ADDRESS,
        abi: GREETING_BOARD_ABI,
        eventName: "GreetingUpdated",
        onLogs: () => {
            queryClient.invalidateQueries({ queryKey: ["readContract"] });
        },
    });

    // Refresh handler
    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await refetch();
        setTimeout(() => setIsRefreshing(false), 500);
    }, [refetch]);

    // Toggle sort order
    const handleToggleSort = useCallback(() => {
        setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
    }, []);

    // Sort greetings
    const sortedGreetings = greetings
        ? [...(greetings as Greeting[])].sort((a, b) => {
            if (sortOrder === "newest") {
                return Number(b.timestamp) - Number(a.timestamp);
            }
            return Number(a.timestamp) - Number(b.timestamp);
        })
        : [];

    // Loading state
    if (isLoading) {
        return (
            <div>
                <ListHeader
                    totalGreetings={totalGreetings}
                    sortOrder={sortOrder}
                    onToggleSort={handleToggleSort}
                    onRefresh={handleRefresh}
                    isRefreshing={isRefreshing}
                />
                <div className="space-y-4 md:space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-slate-900/40 border border-slate-800/50 p-4 md:p-6 rounded-2xl animate-pulse"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="size-8 rounded-full bg-slate-700" />
                                <div className="flex flex-col gap-1">
                                    <div className="h-4 w-24 bg-slate-700 rounded" />
                                    <div className="h-3 w-16 bg-slate-800 rounded" />
                                </div>
                            </div>
                            <div className="h-5 w-full bg-slate-700 rounded mb-2" />
                            <div className="h-5 w-3/4 bg-slate-700 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div>
                <ListHeader
                    totalGreetings={totalGreetings}
                    sortOrder={sortOrder}
                    onToggleSort={handleToggleSort}
                    onRefresh={handleRefresh}
                    isRefreshing={isRefreshing}
                />
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <p className="font-medium mb-2">Error loading greetings</p>
                    <p className="text-sm opacity-75 mb-4">
                        {error?.message || "Failed to fetch data from contract"}
                    </p>
                    <button
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (!greetings || greetings.length === 0) {
        return (
            <div>
                <ListHeader
                    totalGreetings={totalGreetings}
                    sortOrder={sortOrder}
                    onToggleSort={handleToggleSort}
                    onRefresh={handleRefresh}
                    isRefreshing={isRefreshing}
                />
                <div className="text-center py-12 md:py-16">
                    <div className="text-5xl md:text-6xl mb-4">📭</div>
                    <p className="text-slate-400 text-lg mb-2">No greetings yet</p>
                    <p className="text-sm text-slate-500">
                        Be the first to leave your mark on the chain!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <ListHeader
                totalGreetings={totalGreetings}
                sortOrder={sortOrder}
                onToggleSort={handleToggleSort}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
            />
            <div className="space-y-4 md:space-y-6">
                {sortedGreetings.map((greeting, index) => (
                    <GreetingCard
                        key={`${greeting.sender}-${greeting.timestamp}`}
                        greeting={greeting}
                        colorIndex={index % GRADIENT_COLORS.length}
                    />
                ))}
            </div>
        </div>
    );
}

/**
 * List Header with Filter and Refresh
 */
function ListHeader({
    totalGreetings,
    sortOrder,
    onToggleSort,
    onRefresh,
    isRefreshing,
}: {
    totalGreetings: bigint | undefined;
    sortOrder: SortOrder;
    onToggleSort: () => void;
    onRefresh: () => void;
    isRefreshing: boolean;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">Recent Greetings</h2>
                {totalGreetings !== undefined && (
                    <p className="text-sm text-slate-500 mt-1">
                        Total: <span style={{ color: '#135bec' }} className="font-semibold">{totalGreetings.toString()}</span> messages
                    </p>
                )}
            </div>
            <div className="flex gap-2">
                {/* Filter/Sort Button */}
                <button
                    onClick={onToggleSort}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-sm"
                    title={`Sort by ${sortOrder === "newest" ? "oldest" : "newest"} first`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span className="hidden sm:inline">{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
                </button>

                {/* Refresh Button */}
                <button
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-sm disabled:opacity-50"
                    title="Refresh"
                >
                    <svg
                        className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="hidden sm:inline">Refresh</span>
                </button>
            </div>
        </div>
    );
}

/**
 * Greeting Card Component
 */
function GreetingCard({
    greeting,
    colorIndex,
}: {
    greeting: Greeting;
    colorIndex: number;
}) {
    const shortAddress = `${greeting.sender.slice(0, 6)}...${greeting.sender.slice(-4)}`;

    // Link to Etherscan address page (shows all transactions from this address)
    const etherscanUrl = `https://sepolia.etherscan.io/address/${greeting.sender}`;

    return (
        <div className="group bg-slate-900/40 border border-slate-800/50 p-4 md:p-6 rounded-2xl hover:border-[#135bec]/30 transition-all">
            {/* Header */}
            <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                        className={`size-8 rounded-full bg-gradient-to-tr ${GRADIENT_COLORS[colorIndex]}`}
                    />
                    <div className="flex flex-col">
                        <span
                            className="text-sm font-bold font-mono tracking-tight px-2 py-0.5 rounded-lg"
                            style={{ backgroundColor: 'rgba(30, 41, 59, 1)', color: '#135bec' }}
                        >
                            {shortAddress}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">
                            {formatRelativeTime(greeting.timestamp)}
                        </span>
                    </div>
                </div>
                <a
                    href={etherscanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-[#135bec] transition-all p-1"
                    title="View on Etherscan"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>

            {/* Message */}
            <p className="text-base md:text-lg leading-relaxed text-slate-200 font-medium break-words">
                {greeting.message}
            </p>
        </div>
    );
}

function formatRelativeTime(timestamp: bigint): string {
    const now = Math.floor(Date.now() / 1000);
    const time = Number(timestamp);
    const diff = now - time;

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return new Date(time * 1000).toLocaleDateString();
}
