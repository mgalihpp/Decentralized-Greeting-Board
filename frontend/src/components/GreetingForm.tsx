import { useState, useEffect } from "react";
import {
    useAccount,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import {
    GREETING_BOARD_ADDRESS,
    GREETING_BOARD_ABI,
} from "../wagmi.config";

/**
 * GreetingForm Component - Minimalist Composer Style
 */
export function GreetingForm() {
    const [message, setMessage] = useState("");
    const { isConnected, address } = useAccount();
    const queryClient = useQueryClient();

    const {
        writeContract,
        data: hash,
        isPending: isWriting,
        error: writeError,
        reset: resetWrite,
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: confirmError,
    } = useWaitForTransactionReceipt({
        hash,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        writeContract({
            address: GREETING_BOARD_ADDRESS,
            abi: GREETING_BOARD_ABI,
            functionName: "writeGreeting",
            args: [message.trim()],
        });
    };

    useEffect(() => {
        if (isConfirmed) {
            setMessage("");
            queryClient.invalidateQueries({ queryKey: ["readContract"] });
            const timer = setTimeout(() => resetWrite(), 5000);
            return () => clearTimeout(timer);
        }
    }, [isConfirmed, queryClient, resetWrite]);

    const error = writeError || confirmError;
    const isLoading = isWriting || isConfirming;

    const shortAddress = address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "";

    return (
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-1 shadow-2xl shadow-black/5 mb-8 md:mb-12">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex gap-4 p-4 md:p-6 items-start">
                    {/* Avatar */}
                    <div className="size-10 md:size-12 rounded-full border-2 p-0.5 shrink-0" style={{ borderColor: 'rgba(19, 91, 236, 0.2)' }}>
                        <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                            {isConnected ? (
                                <div className="w-full h-full bg-gradient-to-tr from-[#135bec] to-purple-500" />
                            ) : (
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Textarea */}
                    <div className="flex-1">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-lg md:text-xl placeholder:text-slate-600 resize-none min-h-[100px] md:min-h-[120px] p-0 text-white"
                            placeholder={
                                isConnected
                                    ? "What's your message to the decentralized world?"
                                    : "Connect wallet to post a greeting..."
                            }
                            disabled={!isConnected || isLoading}
                            maxLength={280}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-800 p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/30 rounded-b-2xl">
                    <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                        {isConnected && (
                            <div className="flex items-center gap-2 text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="text-xs font-medium font-mono">{shortAddress}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="text-xs font-medium">Immutable</span>
                        </div>
                        <div className="text-xs text-slate-500">
                            {message.length}/280
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!isConnected || !message.trim() || isLoading}
                        className="w-full sm:w-auto text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: (!isConnected || !message.trim() || isLoading) ? '#374151' : '#135bec',
                        }}
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                                {isWriting ? "Confirm in wallet..." : "Confirming..."}
                            </>
                        ) : (
                            <>
                                Send to Blockchain
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Status Messages */}
            {!isConnected && (
                <div className="mx-4 mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                    Connect your wallet to post a greeting
                </div>
            )}

            {hash && !isConfirmed && !error && (
                <div className="mx-4 mb-4 p-3 rounded-xl border text-sm" style={{ backgroundColor: 'rgba(19, 91, 236, 0.1)', borderColor: 'rgba(19, 91, 236, 0.2)', color: '#135bec' }}>
                    <span>Transaction submitted!</span>
                    <a
                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs mt-1 underline opacity-75 hover:opacity-100"
                    >
                        View on Etherscan →
                    </a>
                </div>
            )}

            {isConfirmed && (
                <div className="mx-4 mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    🎉 Greeting posted successfully!
                </div>
            )}

            {error && (
                <div className="mx-4 mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <span className="font-medium">Transaction failed</span>
                    <span className="block text-xs mt-1 opacity-75">
                        {getErrorMessage(error)}
                    </span>
                </div>
            )}
        </div>
    );
}

function LoadingSpinner() {
    return (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    );
}

function getErrorMessage(error: Error): string {
    const message = error.message || "Unknown error";
    if (message.includes("user rejected")) return "Transaction was rejected";
    if (message.includes("insufficient funds")) return "Insufficient ETH for gas";
    if (message.length > 100) return message.slice(0, 100) + "...";
    return message;
}
