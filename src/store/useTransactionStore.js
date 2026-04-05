import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { getStoredTransactions, saveTransactions } from '../utils/storage';

// Pre-seeded mock transactions
const initialTransactions = [
  // April 2026
  { id: '20', amount: 3000, type: 'expense', category: 'Shopping', date: '2026-04-02T16:00:00Z' },
  { id: '19', amount: 1500, type: 'expense', category: 'Entertainment', date: '2026-04-02T14:30:00Z' },
  { id: '18', amount: 25000, type: 'income', category: 'Dividends', date: '2026-04-02T09:00:00Z' },
  { id: '17', amount: 1000, type: 'expense', category: 'Transportation', date: '2026-04-02T10:15:00Z' },
  { id: '16', amount: 4500, type: 'expense', category: 'Food & Dining', date: '2026-04-01T18:30:00Z' },
  { id: '15', amount: 6000, type: 'income', category: 'Freelance', date: '2026-04-01T11:00:00Z' },
  { id: '14', amount: 1200, type: 'expense', category: 'Utilities', date: '2026-04-01T15:20:00Z' },
  
  // March 2026
  { id: '13', amount: 50000, type: 'income', category: 'Salary', date: '2026-03-01T10:00:00Z' },
  { id: '12', amount: 12000, type: 'expense', category: 'Rent', date: '2026-03-05T09:00:00Z' },
  { id: '11', amount: 2500, type: 'expense', category: 'Utilities', date: '2026-03-15T11:20:00Z' },
  { id: '10', amount: 8000, type: 'income', category: 'Freelance', date: '2026-03-10T15:00:00Z' },
  { id: '9',  amount: 3500, type: 'expense', category: 'Healthcare', date: '2026-03-23T07:30:00Z' },
  
  // February 2026
  { id: 'feb-1', amount: 50000, type: 'income', category: 'Salary', date: '2026-02-01T10:00:00Z' },
  { id: 'feb-2', amount: 12000, type: 'expense', category: 'Rent', date: '2026-02-05T09:00:00Z' },
  { id: 'feb-3', amount: 4000,  type: 'expense', category: 'Food & Dining', date: '2026-02-10T18:00:00Z' },
  
  // January 2026
  { id: 'jan-1', amount: 48000, type: 'income', category: 'Salary', date: '2026-01-01T10:00:00Z' },
  { id: 'jan-2', amount: 12000, type: 'expense', category: 'Rent', date: '2026-01-05T09:00:00Z' },
  { id: 'jan-3', amount: 5500,  type: 'expense', category: 'Shopping', date: '2026-01-15T14:00:00Z' },
  { id: 'jan-4', amount: 2000,  type: 'expense', category: 'Entertainment', date: '2026-01-20T20:00:00Z' },
  
  // December 2025
  { id: 'dec-1', amount: 48000, type: 'income', category: 'Salary', date: '2025-12-01T10:00:00Z' },
  { id: 'dec-2', amount: 12000, type: 'expense', category: 'Rent', date: '2025-12-05T09:00:00Z' },
  { id: 'dec-3', amount: 8000,  type: 'expense', category: 'Entertainment', date: '2025-12-22T08:00:00Z' },
  
  // November 2025
  { id: 'nov-1', amount: 45000, type: 'income', category: 'Salary', date: '2025-11-01T10:00:00Z' },
  { id: 'nov-2', amount: 12000, type: 'expense', category: 'Rent', date: '2025-11-05T09:00:00Z' },
  { id: 'nov-3', amount: 3000,  type: 'expense', category: 'Food & Dining', date: '2025-11-12T19:00:00Z' }
];

export const useTransactionStore = create((set, get) => ({
  // Load transactions from localStorage or fall back to mock data
  transactions: getStoredTransactions() || initialTransactions,

  // Action to add a transaction (prepends to list)
  addTransaction: (transaction) => {
    set((state) => {
      const newTransactions = [
        {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          ...transaction,
        },
        ...state.transactions,
      ];
      saveTransactions(newTransactions);
      return { transactions: newTransactions };
    });
  },

  // Action to delete a transaction cleanly with RBAC guard
  deleteTransaction: (id) => {
    const isAdmin = useAuthStore.getState().isAdmin;
    if (!isAdmin) {
      console.warn('Unauthorized: Only admins can delete transactions.');
      return;
    }

    set((state) => {
      const newTransactions = state.transactions.filter((t) => t.id !== id);
      saveTransactions(newTransactions);
      return { transactions: newTransactions };
    });
  },

  // Action to edit a transaction cleanly with RBAC guard
  editTransaction: (id, updatedData) => {
    const isAdmin = useAuthStore.getState().isAdmin;
    if (!isAdmin) {
      console.warn('Unauthorized: Only admins can edit transactions.');
      return;
    }

    set((state) => {
      const newTransactions = state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedData } : t
      );
      saveTransactions(newTransactions);
      return { transactions: newTransactions };
    });
  },

  // Selectors for derived state
  getTotalIncome: () => {
    return get().transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => Math.round((sum + Number(t.amount)) * 100) / 100, 0);
  },

  getTotalExpense: () => {
    return get().transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => Math.round((sum + Number(t.amount)) * 100) / 100, 0);
  },

  getTotalBalance: () => {
    let income = 0;
    let expense = 0;
    
    get().transactions.forEach((t) => {
      if (t.type === 'income') income = Math.round((income + Number(t.amount)) * 100) / 100;
      if (t.type === 'expense') expense = Math.round((expense + Number(t.amount)) * 100) / 100;
    });

    return Math.round((income - expense) * 100) / 100;
  },
}));
