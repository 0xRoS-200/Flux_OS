import React, { useState } from "react";
import { Search, Download, Trash2, Upload } from "lucide-react";
import { useStore } from "../store/useStore";

export default function TransactionsTable() {
  const { transactions, role, deleteTransaction, importTransactions } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase()) || t.amount.toString().includes(searchTerm);
    const matchesType = filterType === "all" || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const exportToCSV = () => {
    const headers = ["ID,Date,Category,Type,Status,Amount\n"];
    const csvData = filteredTransactions.map(t =>
      `${t.id},${t.date},${t.category},${t.type},${t.status},${t.amount}`
    ).join("\n");

    const blob = new Blob([headers + csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden mb-8 transition-colors">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-bold text-zinc-900 dark:text-white">Recent Transactions</h3>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800 dark:text-white border border-stone-200 dark:border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 bg-gray-50 dark:bg-slate-700 dark:text-white border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <label title="Restore from CSV" className="p-2 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
            <Upload className="h-4 w-4" />
            <input type="file" accept=".csv" className="hidden" onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (evt) => {
                importTransactions(evt.target.result);
                alert("Backup restored successfully!");
              };
              reader.readAsText(file);
            }} />
          </label>
          <button onClick={exportToCSV} title="Export CSV" className="p-2 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-500 dark:text-zinc-400">
          <thead className="bg-zinc-50/50 dark:bg-zinc-800/50 text-xs uppercase text-zinc-400 dark:text-zinc-300 font-semibold border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4">Transaction</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
              {role === 'admin' && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <p className="text-lg font-medium mb-1">No transactions found</p>
                    <p className="text-sm">Try adjusting your filters or add a new transaction.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-stone-100 dark:border-stone-800/50 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-stone-900 dark:text-white">{tx.category}</div>
                    <div className="text-xs text-stone-500 capitalize">{tx.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-stone-600 dark:text-stone-400 font-medium">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md ${tx.status === 'completed' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${tx.amount > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-stone-900 dark:text-white'}`}>
                    {tx.amount > 0 ? '+' : ''}
                    {tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                  {role === 'admin' && (
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => deleteTransaction(tx.id)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                        <Trash2 className="h-4 w-4 ml-auto" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}