import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useStore } from "../store/useStore";
import { Plus, Moon, Sun } from "lucide-react";

import SummaryCards from "./SummaryCards";
import BalanceChart from "./BalanceChart";
import SpendingBreakdown from "./SpendingBreakdown";
import InsightsPanel from "./InsightsPanel";
import TransactionsTable from "./TransactionsTable";
import TransactionModal from "./TransactionModal";

export default function Dashboard() {
  const { role, theme, toggleTheme, fetchTransactions, isLoading, activeTab } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-300">

        <Sidebar />

        <div className="flex-1 overflow-y-auto p-4 md:p-8">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, here is your financial summary.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:shadow-sm transition-all"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {role === 'admin' && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex flex-1 sm:flex-none justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm"
                >
                  <Plus className="h-4 w-4" />
                  New Transaction
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">Loading data...</div>
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
                <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                  <h2 className="text-xl font-extrabold mb-4 text-zinc-900 dark:text-white">Transaction History</h2>
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