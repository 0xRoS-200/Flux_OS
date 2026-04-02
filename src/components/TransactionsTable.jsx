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
    <div className="bg-white/40 dark:bg-stone-900/60 backdrop-blur-2xl rounded-2xl sm:rounded-[2.5rem] border border-white/60 dark:border-stone-800/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden mb-8 transition-all">
      <div className="p-4 sm:p-8 border-b border-stone-100 dark:border-stone-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 tracking-tight">Recent Intelligence</h3>
          <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest leading-none">Transaction Ledger Layer</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56 group">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search Ledger..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-11 pr-4 py-2 sm:py-3 bg-stone-50/40 dark:bg-stone-800/40 dark:text-stone-100 border border-stone-200/60 dark:border-stone-700/50 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-orange-400 transition-all shadow-sm placeholder-stone-400 dark:placeholder-stone-600"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 sm:p-3 bg-stone-50/40 dark:bg-stone-800/40 dark:text-stone-100 border border-stone-200/60 dark:border-stone-700/50 rounded-xl text-xs sm:text-sm outline-none cursor-pointer focus:border-orange-400 transition-all font-medium"
          >
            <option value="all">Everywhere</option>
            <option value="income">Credits</option>
            <option value="expense">Debits</option>
          </select>

          <div className="flex gap-2 ml-auto sm:ml-0">
            <label title="Restore from CSV" className="p-2 sm:p-3 bg-white/60 dark:bg-stone-800/60 border border-white dark:border-stone-700/50 rounded-xl text-stone-400 dark:text-stone-500 hover:text-orange-500 hover:border-orange-400 transition-all cursor-pointer shadow-sm">
              <Upload className="h-4 w-4" />
              <input type="file" accept=".csv" className="hidden" onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                  importTransactions(evt.target.result);
                  alert("Intelligence restored successfully!");
                };
                reader.readAsText(file);
              }} />
            </label>
            <button onClick={exportToCSV} title="Export CSV" className="p-2 sm:p-3 bg-white/60 dark:bg-stone-800/60 border border-white dark:border-stone-700/50 rounded-xl text-stone-400 dark:text-stone-500 hover:text-orange-500 hover:border-orange-400 transition-all shadow-sm">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-stone-50/30 dark:bg-stone-800/30 text-[9px] sm:text-[10px] uppercase text-stone-400 dark:text-stone-500 font-bold tracking-[0.2em] border-b border-stone-100 dark:border-stone-800/50">
            <tr>
              <th className="px-4 sm:px-8 py-3 sm:py-5">Origin / Class</th>
              <th className="px-4 sm:px-8 py-3 sm:py-5">Timeline</th>
              <th className="hidden xs:table-cell px-4 sm:px-8 py-3 sm:py-5">Verification</th>
              <th className="px-4 sm:px-8 py-3 sm:py-5 text-right">Magnitude</th>
              {role === 'admin' && <th className="px-4 sm:px-8 py-3 sm:py-5 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50 dark:divide-stone-800/30">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1 tracking-tight">No Intelligence Found</p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-medium">Your current filters returned zero results.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/40 dark:hover:bg-stone-800/40 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="font-bold text-stone-800 dark:text-stone-100 tracking-tight">{tx.category}</div>
                    <div className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest">{tx.type}</div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-stone-500 dark:text-stone-400 font-medium italic">{tx.date}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg tracking-wider ${tx.status === 'completed' ? 'bg-orange-50 text-orange-600 dark:bg-orange-600/20 dark:text-orange-400 border border-orange-100/50 dark:border-orange-500/10' : 'bg-stone-100 text-stone-500 dark:bg-stone-800/50 dark:text-stone-400 border border-stone-200/50 dark:border-stone-700/50'}`}>
                      {tx.status === 'completed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </td>
                  <td className={`px-8 py-5 text-right font-bold whitespace-nowrap tabular-nums tracking-tighter text-base ${tx.amount > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-stone-900 dark:text-white'}`}>
                    {tx.amount > 0 ? '+' : ''}
                    {Math.abs(tx.amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                  {role === 'admin' && (
                    <td className="px-8 py-5 text-right">
                      <button onClick={() => deleteTransaction(tx.id)} className="text-stone-300 hover:text-red-500 transition-all p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
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