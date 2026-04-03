import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useStore } from "../store/useStore";

const COLORS = ["#2563eb", "#f59e0b", "#9333ea", "#0d9488", "#71717a"];

export default function SpendingBreakdown() {
  const transactions = useStore((state) => state.transactions);

  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const categoryTotals = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
    return acc;
  }, {});

  const categoryData = Object.keys(categoryTotals).map((key, index) => ({
    name: key,
    value: categoryTotals[key],
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex-1 transition-colors">
      <h3 className="font-bold text-zinc-900 dark:text-white mb-6">Spending Breakdown</h3>

      {categoryData.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-sm text-zinc-400 dark:text-zinc-500 italic">
          No expense data available. Add a transaction.
        </div>
      ) : (
        <>
          <div className="flex justify-center mb-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={categoryData} 
                  innerRadius="60%" 
                  outerRadius="100%" 
                  paddingAngle={5} 
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', notation: 'compact', maximumFractionDigits: 2 }).format(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    {item.name}
                  </span>
                  <span className="text-zinc-900 dark:text-white">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', notation: 'compact', maximumFractionDigits: 2 }).format(item.value)}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 rounded-full" style={{ width: `${(item.value / totalExpenses) * 100}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}