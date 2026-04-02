import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useStore } from "../store/useStore";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 flex flex-col gap-1">
        <span className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
          <span className="text-zinc-900 dark:text-white font-bold text-sm">
            {payload[0].value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} balance
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function BalanceChart() {
  const transactions = useStore((state) => state.transactions);
  const [timeRange, setTimeRange] = useState('ALL');

  const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedTx.reduce((acc, tx) => {
    const previousBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
    acc.push({
      dateObj: new Date(tx.date),
      date: new Date(tx.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      balance: previousBalance + tx.amount
    });
    return acc;
  }, []);

  const getFilteredData = () => {
    if (timeRange === 'ALL') return chartData;

    const latestDate = chartData.length > 0 ? new Date(Math.max(...chartData.map(d => d.dateObj))) : new Date();
    let pastDate = new Date(latestDate);

    if (timeRange === '1D') {
      pastDate.setDate(latestDate.getDate() - 1);
    } else if (timeRange === '7D') {
      pastDate.setDate(latestDate.getDate() - 7);
    } else if (timeRange === '1M') {
      pastDate.setMonth(latestDate.getMonth() - 1);
    } else if (timeRange === '3M') {
      pastDate.setMonth(latestDate.getMonth() - 3);
    }

    return chartData.filter(d => d.dateObj >= pastDate);
  };

  const displayData = getFilteredData();

  return (
    <div className="xl:col-span-2 bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-zinc-900 dark:text-white">Balance Statistics</h3>
        <div className="flex gap-2 bg-zinc-50 dark:bg-zinc-800 p-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
          {['1D', '7D', '1M', '3M', 'ALL'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-semibold rounded-md ${timeRange === range ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full flex-1">
        {displayData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 dark:text-gray-500 italic">
            No balance history available for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayData} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" strokeOpacity={0.4} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} tickFormatter={(val) => `₹${val}`} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#d4d4d8', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}