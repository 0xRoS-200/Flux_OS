import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialTransactions = [
  { id: 1, date: "2024-03-24", amount: 2500.00, category: "Salary", type: "income", status: "completed" },
  { id: 2, date: "2024-03-22", amount: -120.50, category: "Food", type: "expense", status: "completed" },
  { id: 3, date: "2024-03-20", amount: -800.00, category: "Housing", type: "expense", status: "completed" },
];

export const useStore = create(
  persist(
    (set, get) => ({
      activeTab: "Dashboard",
      isExpanded: true,
      theme: "light",
      role: "user",
      userProfile: null,
      lastProfile: null,
      
      setProfile: (profile) => set({ userProfile: profile, lastProfile: profile }),
      clearProfile: () => set({ userProfile: null }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
      toggleRole: () => set((state) => ({ role: state.role === "user" ? "admin" : "user" })),
      toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      
      autoExportFrequency: "none",
      lastExportDate: null,
      setAutoExportFrequency: (freq) => set({ autoExportFrequency: freq }),
      setLastExportDate: (date) => set({ lastExportDate: date }),

      
      needAdminAction: false,
      triggerAdminRequest: () => {
        set({ needAdminAction: true });
        setTimeout(() => set({ needAdminAction: false }), 2000);
      },
      
      editingTransaction: null,
      setEditingTransaction: (tx) => set({ editingTransaction: tx }),
      
      transactions: initialTransactions,
      isLoading: false,
      
      fetchTransactions: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ isLoading: false });
      },
      addTransaction: (newTx) => set((state) => ({
        transactions: [{ ...newTx, id: Date.now() }, ...state.transactions]
      })),
      updateTransaction: (updatedTx) => set((state) => ({
        transactions: state.transactions.map(tx => tx.id === updatedTx.id ? updatedTx : tx)
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(tx => tx.id !== id)
      })),
      importTransactions: (csvText) => set((state) => {
        try {
          const lines = csvText.trim().split('\n');
          if (lines.length < 2) return state; // Only headers
          
          const importedTx = lines.slice(1).map((line, ix) => {
            const parts = line.split(',');
            // CSV structure fallback based on our TransactionsTable export
            return {
              id: parts[0] || Date.now() + ix,
              date: parts[1],
              category: parts[2],
              type: parts[3],
              status: parts[4],
              amount: parseFloat(parts[5]) || 0
            };
          }).filter(t => t.date && t.category);
          
          if (importedTx.length > 0) {
            // Overwrite mock entirely if they restore, or append logic
            return { transactions: [...importedTx] };
          }
          return state;
        } catch (error) {
          console.error("CSV Import Error:", error);
          return state;
        }
      }),
    }),
    {
      name: "flux-dashboard-storage",
    }
  )
);