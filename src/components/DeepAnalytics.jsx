import React, { useMemo } from "react";
import { TrendingUp, AlertTriangle, ArrowDownToLine, ArrowUpFromLine, Activity } from "lucide-react";
import { useStore } from "../store/useStore";

export default function DeepAnalytics() {
  const transactions = useStore((state) => state.transactions);

  const stats = useMemo(() => {
    if (transactions.length === 0) return null;

    const expenses = transactions.filter(t => t.type === 'expense');
    const incomes = transactions.filter(t => t.type === 'income');

    const totalExpenseAmount = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const avgExpense = expenses.length > 0 ? totalExpenseAmount / expenses.length : 0;

    let largestExpense = null;
    if (expenses.length > 0) {
      largestExpense = expenses.reduce((prev, curr) => (Math.abs(curr.amount) > Math.abs(prev.amount)) ? curr : prev);
    }

    // Category frequency
    const categoryCounts = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {});
    
    let mostFrequentCat = "";
    let mostFrequentCount = 0;
    for (const [cat, count] of Object.entries(categoryCounts)) {
      if (count > mostFrequentCount) {
         mostFrequentCount = count;
         mostFrequentCat = cat;
      }
    }
    const avgIncome = incomes.length > 0 ? incomes.reduce((sum, t) => sum + t.amount, 0) / incomes.length : 0;
    const burnRateRatio = avgIncome > 0 ? (avgExpense / avgIncome) * 100 : 0;

    return {
      avgExpense,
      largestExpense,
      mostFrequentCat,
      mostFrequentCount,
      burnRateRatio
    };
  }, [transactions]);

  if (!stats) {
    return null;
  }

  return (
    <div className="bg-white/40 dark:bg-stone-900/60 backdrop-blur-2xl rounded-2xl sm:rounded-[2.5rem] border border-white/60 dark:border-stone-800/10 shadow-sm p-6 sm:p-8 mt-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
          <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">Comparative Intelligence</h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Deep-dive breakdown logic & transaction anomalies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-stone-400" />
            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Average Outflow</span>
          </div>
          <div className="text-2xl font-black text-stone-800 dark:text-stone-100 mb-1">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', notation: 'compact', maximumFractionDigits: 2 }).format(stats.avgExpense)}
          </div>
          <p className="text-[10px] text-stone-400">Typical transaction weight.</p>
        </div>

        <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-500/10 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">Largest Debit</span>
          </div>
          <div className="text-2xl font-black text-orange-700 dark:text-orange-300 mb-1">
            {stats.largestExpense ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', notation: 'compact', maximumFractionDigits: 2 }).format(Math.abs(stats.largestExpense.amount)) : "N/A"}
          </div>
          <p className="text-[10px] text-orange-500/80 font-medium truncate">
            {stats.largestExpense ? `Flagged in ${stats.largestExpense.category}` : "Awaiting data"}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50">
          <div className="flex items-center gap-2 mb-3">
            <ArrowDownToLine className="h-4 w-4 text-stone-400" />
            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Frequent Vector</span>
          </div>
          <div className="text-2xl font-black text-stone-800 dark:text-stone-100 mb-1">
            {stats.mostFrequentCat || "N/A"}
          </div>
          <p className="text-[10px] text-stone-400">
            Recorded {stats.mostFrequentCount} times.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-500/10">
          <div className="flex items-center gap-2 mb-3">
            <ArrowUpFromLine className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Expense/Income Bias</span>
          </div>
          <div className="text-2xl font-black text-blue-700 dark:text-blue-300 mb-1">
            {stats.burnRateRatio > 0 ? `${stats.burnRateRatio.toFixed(1)}%` : "0%"}
          </div>
          <p className="text-[10px] text-blue-500/80 font-medium">
            Avg expense vs avg income scale.
          </p>
        </div>

      </div>
    </div>
  );
}
