import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { GreetingList } from "./components/GreetingList";
import { GreetingForm } from "./components/GreetingForm";
import { HistoryPage } from "./components/HistoryPage";
import { DocsPage } from "./components/DocsPage";

type PageType = "home" | "history" | "docs";

/**
 * Main App Component - Minimalist Design with Pages
 */
function App() {
  const { isConnected } = useAccount();
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  return (
    <div className="flex h-screen overflow-hidden bg-[#101622]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col justify-between p-6 bg-[#101622] hidden md:flex">
        <div className="flex flex-col gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#135bec' }}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-none tracking-tight">Greeting</h1>
              <p className="text-xs text-slate-400 font-medium">Web3 Board</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setCurrentPage("home")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${currentPage === "home"
                ? "text-white"
                : "text-slate-400 hover:bg-slate-800"
                }`}
              style={currentPage === "home" ? { backgroundColor: 'rgba(19, 91, 236, 0.1)', color: '#135bec' } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-semibold">Home</span>
            </button>
            <button
              onClick={() => setCurrentPage("history")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${currentPage === "history"
                ? "text-white"
                : "text-slate-400 hover:bg-slate-800"
                }`}
              style={currentPage === "history" ? { backgroundColor: 'rgba(19, 91, 236, 0.1)', color: '#135bec' } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold">History</span>
            </button>
            <button
              onClick={() => setCurrentPage("docs")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${currentPage === "docs"
                ? "text-white"
                : "text-slate-400 hover:bg-slate-800"
                }`}
              style={currentPage === "docs" ? { backgroundColor: 'rgba(19, 91, 236, 0.1)', color: '#135bec' } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-semibold">Docs</span>
            </button>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="flex flex-col gap-4 border-t border-slate-800 pt-6">
          <a
            className="flex items-center gap-3 px-3 text-slate-400 hover:text-[#135bec] transition-all"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-sm">GitHub</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 text-slate-400 hover:text-[#135bec] transition-all"
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-sm">X / Twitter</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto pb-20 md:pb-0">
        {/* Top Navigation */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 py-4 border-b border-slate-800 sticky top-0 bg-[#101622]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm">Network:</span>
            <span className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Sepolia
            </span>
          </div>
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </header>

        {/* Page Content */}
        {currentPage === "home" && <HomePage />}
        {currentPage === "history" && <HistoryPage />}
        {currentPage === "docs" && <DocsPage />}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#101622] border-t border-slate-800 flex justify-around py-3 z-50">
        <button
          onClick={() => setCurrentPage("home")}
          className={`flex flex-col items-center gap-1 ${currentPage === "home" ? "text-[#135bec]" : "text-slate-400"}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          onClick={() => setCurrentPage("history")}
          className={`flex flex-col items-center gap-1 ${currentPage === "history" ? "text-[#135bec]" : "text-slate-400"}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-medium">History</span>
        </button>
        <button
          onClick={() => setCurrentPage("docs")}
          className={`flex flex-col items-center gap-1 ${currentPage === "docs" ? "text-[#135bec]" : "text-slate-400"}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-medium">Docs</span>
        </button>
      </nav>
    </div>
  );
}

/**
 * Home Page Component
 */
function HomePage() {
  return (
    <div className="max-w-4xl mx-auto w-full py-8 md:py-12 px-4 md:px-10">
      {/* Headline */}
      <div className="mb-10 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Leave your mark <br />
          <span style={{ color: '#135bec' }}>on the chain.</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-xl">
          A minimalist board for immutable greetings. Connect your wallet and
          write a message that lasts forever.
        </p>
      </div>

      {/* Composer Component */}
      <GreetingForm />

      {/* Recent Greetings Section */}
      <div className="mt-10 md:mt-12">
        <GreetingList />
      </div>
    </div>
  );
}

export default App;
