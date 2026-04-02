import { TrendingUp, IndianRupee, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useStore } from "../store/useStore";

export default function SummaryCards() {
  const transactions = useStore((state) => state.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  const formatINR = (amount) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white dark:bg-stone-900 rounded-xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col transition-colors">
        <span className="text-stone-500 dark:text-stone-400 text-sm font-medium mb-4 flex justify-between items-center">
          Total Balance
          <IndianRupee className="h-4 w-4 text-stone-400" />
        </span>
        <div className="flex items-end gap-3">
          <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            {formatINR(totalBalance)}
          </h2>
          {totalBalance > 0 && (
            <span className="flex items-center text-orange-600 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-0.5 rounded text-xs font-bold mb-1 tracking-tight">
              <TrendingUp className="h-3 w-3 mr-1" /> Active
            </span>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col transition-colors">
        <span className="text-stone-500 dark:text-stone-400 text-sm font-medium mb-4 flex justify-between items-center">
          Total Income
          <ArrowUpRight className="h-4 w-4 text-orange-500" />
        </span>
        <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          {formatINR(totalIncome)}
        </h2>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col transition-colors">
        <span className="text-stone-500 dark:text-stone-400 text-sm font-medium mb-4 flex justify-between items-center">
          Total Expenses
          <ArrowDownRight className="h-4 w-4 text-amber-600" />
        </span>
        <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          {formatINR(totalExpense)}
        </h2>
      </div>
    </div>
  );
}