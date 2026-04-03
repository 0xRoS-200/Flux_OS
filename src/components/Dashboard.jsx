import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useStore } from "../store/useStore";
import { Plus, Moon, Sun, MonitorSmartphone } from "lucide-react";

import SummaryCards from "./SummaryCards";
import BalanceChart from "./BalanceChart";
import SpendingBreakdown from "./SpendingBreakdown";
import InsightsPanel from "./InsightsPanel";
import TransactionsTable from "./TransactionsTable";
import TransactionModal from "./TransactionModal";

export default function Dashboard() {
  const { role, theme, toggleTheme, fetchTransactions, isLoading, activeTab, triggerAdminRequest } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    fetchTransactions();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, [fetchTransactions]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen bg-stone-50 dark:bg-stone-950 overflow-hidden transition-colors duration-300">

        <Sidebar />

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 italic tracking-tight">Dashboard Overview</h1>
              <p className="text-[11px] sm:text-sm text-stone-500 dark:text-stone-400 mt-1 font-medium italic text-balance">Welcome back, your financial summary is ready.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {deferredPrompt && (
                <button
                  onClick={handleInstall}
                  className="flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-stone-900/60 border border-white/60 dark:border-stone-800/10 backdrop-blur-md text-stone-600 dark:text-stone-300 hover:text-orange-500 dark:hover:text-orange-400 hover:shadow-sm transition-all rounded-xl text-sm font-bold animate-pulse"
                >
                  <MonitorSmartphone className="h-4 w-4" />
                  <span className="hidden xs:inline">Install App</span>
                </button>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-white/40 dark:bg-stone-900/60 border border-white/60 dark:border-stone-800/10 backdrop-blur-md text-stone-600 dark:text-stone-300 hover:shadow-sm transition-all"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                onClick={() => role === 'admin' ? setIsModalOpen(true) : triggerAdminRequest()}
                className={`flex flex-1 sm:flex-none justify-center items-center gap-2 px-5 py-2.5 rounded-xl transition-all shadow-sm font-bold text-sm tracking-tight ${role === 'admin' ? 'bg-slate-900 dark:bg-orange-600 text-white hover:shadow-lg' : 'bg-slate-900/50 dark:bg-orange-600/50 text-white/50 cursor-pointer'}`}
              >
                <Plus className="h-4 w-4" />
                New Entry
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center text-stone-500 dark:text-stone-400">Loading Intelligence...</div>
          ) : (
            <>
              {activeTab === "Dashboard" && (
                <>
                  <SummaryCards />
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                    <BalanceChart />
                    <div className="flex flex-col gap-6">
                      <SpendingBreakdown />
                      <InsightsPanel />
                    </div>
                  </div>
                  <TransactionsTable />
                </>
              )}
              {activeTab === "Transactions" && (
                <div className="bg-white/30 dark:bg-stone-900/40 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-sm border border-white/60 dark:border-stone-800/20">
                  <h2 className="text-xl font-extrabold mb-6 text-stone-900 dark:text-stone-100 tracking-tight">Transaction History Ledger</h2>
                  <TransactionsTable />
                </div>
              )}
              {activeTab === "Analytics" && (
                <div className="grid grid-cols-1 gap-6">
                  <SummaryCards />
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <BalanceChart />
                    <div className="flex flex-col gap-6">
                      <SpendingBreakdown />
                      <InsightsPanel />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}