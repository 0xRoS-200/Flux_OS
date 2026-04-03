import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useStore } from "../store/useStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TransactionModal({ isOpen, onClose }) {
  const addTransaction = useStore((state) => state.addTransaction);
  const updateTransaction = useStore((state) => state.updateTransaction);
  const editingTransaction = useStore((state) => state.editingTransaction);
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

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        category: editingTransaction.category,
        amount: Math.abs(editingTransaction.amount),
        type: editingTransaction.type,
        status: editingTransaction.status,
        date: editingTransaction.date
      });
    } else {
      setFormData({
        category: "",
        amount: "",
        type: "expense",
        status: "completed",
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [editingTransaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, {
      scale: 0.9, opacity: 0, y: -20, duration: 0.2, onComplete: () => {
        const payload = {
          ...formData,
          amount: formData.type === 'expense' ? -Math.abs(formData.amount) : Math.abs(formData.amount)
        };
        if (editingTransaction) {
          updateTransaction({ ...editingTransaction, ...payload });
        } else {
          addTransaction(payload);
        }
        setFormData({ ...formData, category: "", amount: "" });
        onClose();
      }
    });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/10 dark:bg-black/60 backdrop-blur-[12px]">
      <div ref={modalRef} className="bg-white/70 dark:bg-stone-900/80 border border-white dark:border-stone-800/50 backdrop-blur-[60px] rounded-[3rem] shadow-[0_30px_80px_rgba(249,115,22,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.5)] w-full max-w-md p-10 overflow-hidden relative group">
        
        {/* Aesthetic Edge Glow - Sunlight / Ember */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400/40 dark:via-orange-500/20 to-transparent" />

        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">{editingTransaction ? "Edit Entry" : "New Entry"}</h2>
            <p className="text-[10px] font-bold text-orange-500 dark:text-orange-400 uppercase tracking-[0.2em]">Flux Ledger v1</p>
          </div>
          <button onClick={onClose} className="p-3 bg-stone-100 dark:bg-stone-800/50 text-stone-400 hover:text-orange-500 rounded-2xl transition-all hover:scale-110 active:scale-95">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-left">
          <div className="space-y-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] ml-1">Classification</label>
              <input required type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-5 bg-stone-50/40 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/50 rounded-2xl focus:outline-none focus:border-orange-400 focus:bg-white dark:focus:bg-stone-800 text-stone-800 dark:text-stone-100 transition-all text-sm font-medium placeholder-stone-300 dark:placeholder-stone-700 shadow-sm" placeholder="e.g. Luxury Dining" />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] ml-1">Amount (₹)</label>
                <input required type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full p-5 bg-stone-50/40 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/50 rounded-2xl focus:outline-none focus:border-orange-400 focus:bg-white dark:focus:bg-stone-800 text-stone-800 dark:text-stone-100 transition-all text-sm font-medium placeholder-stone-300 dark:placeholder-stone-700 shadow-sm" placeholder="0.00" />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] ml-1">Timeline</label>
                <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-5 bg-stone-50/40 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/50 rounded-2xl focus:outline-none focus:border-orange-400 focus:bg-white dark:focus:bg-stone-800 text-stone-800 dark:text-stone-100 transition-all text-sm font-medium shadow-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] ml-1">Flow Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full p-5 bg-stone-50/40 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/50 rounded-2xl focus:outline-none focus:border-orange-400 focus:bg-white dark:focus:bg-stone-800 text-stone-800 dark:text-stone-100 transition-all text-sm font-medium outline-none shadow-sm cursor-pointer">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.1em] ml-1">Verification</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full p-5 bg-stone-50/40 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/50 rounded-2xl focus:outline-none focus:border-orange-400 focus:bg-white dark:focus:bg-stone-800 text-stone-800 dark:text-stone-100 transition-all text-sm font-medium outline-none shadow-sm cursor-pointer">
                  <option value="completed">Confirmed</option>
                  <option value="pending">In-Process</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full mt-2 p-6 bg-stone-900 dark:bg-orange-600 text-white font-bold text-sm rounded-[2rem] active:scale-[0.98] transition-all hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1">
            {editingTransaction ? "Update Ledger" : "Commit to Ledger"}
          </button>
        </form>
      </div>
    </div>

  );
}