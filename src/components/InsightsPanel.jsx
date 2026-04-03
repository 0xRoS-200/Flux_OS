import React, { useMemo } from "react";
import { Gem } from "lucide-react";
import { useStore } from "../store/useStore";

export default function InsightsPanel() {
  const transactions = useStore((state) => state.transactions);
  const setActiveTab = useStore((state) => state.setActiveTab);

  const insight = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return null;

    const categoryTotals = expenses.reduce((acc, tx) => {
      const cat = tx.category.trim();
      acc[cat] = (acc[cat] || 0) + Math.abs(tx.amount);
      return acc;
    }, {});

    let highestCategory = "";
    let highestAmount = 0;

    for (const [category, amount] of Object.entries(categoryTotals)) {
      if (amount > highestAmount) {
        highestAmount = amount;
        highestCategory = category;
      }
    }

    const totalExpenses = expenses.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const percentage = totalExpenses > 0 ? ((highestAmount / totalExpenses) * 100).toFixed(0) : 0;

    return {
      category: highestCategory,
      amount: highestAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      percentage
    };
  }, [transactions]);

  return (
    <div className="bg-blue-600 rounded-xl p-6 text-white shadow-sm transition-colors flex flex-col justify-between">
      <div>
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <Gem className="h-4 w-4 text-blue-200" /> Smart Insight
        </h3>

        {insight ? (
          <p className="text-blue-100 text-sm leading-relaxed mb-4">
            Your highest spending category is <strong className="text-white">{insight.category}</strong>. You've spent <strong className="text-white">{insight.amount}</strong> here, making up <strong className="text-white">{insight.percentage}%</strong> of your total expenses.
          </p>
        ) : (
          <p className="text-blue-100 text-sm leading-relaxed mb-4">
            Not enough expense data to generate insights yet. Keep tracking your transactions!
          </p>
        )}
      </div>

      <button onClick={() => setActiveTab("Analytics")} className="text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg border border-white/20 self-start">
        View Full Analysis
      </button>
    </div>
  );
}