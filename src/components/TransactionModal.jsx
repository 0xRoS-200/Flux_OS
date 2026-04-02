import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { useStore } from "../store/useStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TransactionModal({ isOpen, onClose }) {
  const addTransaction = useStore((state) => state.addTransaction);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    type: "expense",
    status: "completed",
    date: new Date().toISOString().split('T')[0]
  });

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, { scale: 0.9, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" });
    }
  }, { dependencies: [isOpen] });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, {
      scale: 0.9, opacity: 0, y: -20, duration: 0.2, onComplete: () => {
        addTransaction({
          ...formData,
          amount: formData.type === 'expense' ? -Math.abs(formData.amount) : Math.abs(formData.amount)
        });
        setFormData({ ...formData, category: "", amount: "" });
        onClose();
      }
    });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white">New Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category/Name</label>
            <input required type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="mt-1 w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Groceries" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount (₹)</label>
              <input required type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="mt-1 w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="mt-1 w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="mt-1 w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white outline-none">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="mt-1 w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white outline-none">
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
}