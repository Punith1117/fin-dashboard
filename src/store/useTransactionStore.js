import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

// Pre-seeded mock transactions
const initialTransactions = [
  {
    id: '1',
    amount: 50000,
    type: 'income',
    category: 'Salary',
    note: 'April Salary',
    date: new Date('2026-03-01T10:00:00').toISOString(),
  },
  {
    id: '2',
    amount: 1500,
    type: 'expense',
    category: 'Food & Dining',
    note: 'Dinner at restaurant',
    date: new Date('2026-03-02T20:30:00').toISOString(),
  },
  {
    id: '3',
    amount: 12000,
    type: 'expense',
    category: 'Rent',
    note: 'April Rent',
    date: new Date('2026-03-05T09:00:00').toISOString(),
  },
  {
    id: '4',
    amount: 8000,
    type: 'income',
    category: 'Freelance',
    note: 'Side project milestone',
    date: new Date('2026-03-10T15:00:00').toISOString(),
  },
  {
    id: '5',
    amount: 2500,
    type: 'expense',
    category: 'Utilities',
    note: 'Electricity Bill',
    date: new Date('2026-03-15T11:20:00').toISOString(),
  },
  {
    id: '6',
    amount: 1200,
    type: 'expense',
    category: 'Entertainment',
    note: 'Movie night',
    date: new Date('2026-03-16T19:00:00').toISOString(),
  },
  {
    id: '7',
    amount: 3000,
    type: 'income',
    category: 'Interest',
    note: 'Savings account interest',
    date: new Date('2026-03-17T08:00:00').toISOString(),
  },
  {
    id: '8',
    amount: 450,
    type: 'expense',
    category: 'Transport',
    note: 'Bus fare',
    date: new Date('2026-03-18T09:30:00').toISOString(),
  },
  {
    id: '9',
    amount: 15000,
    type: 'income',
    category: 'Freelance',
    note: 'Logo design project',
    date: new Date('2026-03-19T14:00:00').toISOString(),
  },
  {
    id: '10',
    amount: 2200,
    type: 'expense',
    category: 'Shopping',
    note: 'New headphones',
    date: new Date('2026-03-20T16:45:00').toISOString(),
  },
  {
    id: '11',
    amount: 800,
    type: 'expense',
    category: 'Food & Dining',
    note: 'Lunch at cafe',
    date: new Date('2026-03-21T13:00:00').toISOString(),
  },
  {
    id: '12',
    amount: 5000,
    type: 'income',
    category: 'Investment',
    note: 'Stock dividend',
    date: new Date('2026-03-22T10:00:00').toISOString(),
  },
  {
    id: '13',
    amount: 3500,
    type: 'expense',
    category: 'Health',
    note: 'Gym membership',
    date: new Date('2026-03-23T07:30:00').toISOString(),
  },
  {
    id: '14',
    amount: 1200,
    type: 'expense',
    category: 'Utilities',
    note: 'Internet Bill',
    date: new Date('2026-04-01T15:20:00').toISOString(),
  },
  {
    id: '15',
    amount: 6000,
    type: 'income',
    category: 'Freelance',
    note: 'Consultation fee',
    date: new Date('2026-04-01T11:00:00').toISOString(),
  },
  {
    id: '16',
    amount: 4500,
    type: 'expense',
    category: 'Food & Dining',
    note: 'Grocery shopping',
    date: new Date('2026-04-01T18:30:00').toISOString(),
  },
  {
    id: '17',
    amount: 1000,
    type: 'expense',
    category: 'Transport',
    note: 'Fuel',
    date: new Date('2026-04-02T10:15:00').toISOString(),
  },
  {
    id: '18',
    amount: 25000,
    type: 'income',
    category: 'Bonus',
    note: 'Project completion bonus',
    date: new Date('2026-04-02T09:00:00').toISOString(),
  },
  {
    id: '19',
    amount: 1500,
    type: 'expense',
    category: 'Entertainment',
    note: 'Book purchase',
    date: new Date('2026-04-02T14:30:00').toISOString(),
  },
  {
    id: '20',
    amount: 3000,
    type: 'expense',
    category: 'Shopping',
    note: 'Gifts for friends',
    date: new Date('2026-04-02T16:00:00').toISOString(),
  }
];

export const useTransactionStore = create((set, get) => ({
  transactions: initialTransactions,

  // Action to add a transaction (prepends to list)
  addTransaction: (transaction) => {
    set((state) => ({
      transactions: [
        {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          ...transaction,
        },
        ...state.transactions,
      ],
    }));
  },

  // Action to delete a transaction cleanly with RBAC guard
  deleteTransaction: (id) => {
    const isAdmin = useAuthStore.getState().isAdmin;
    if (!isAdmin) {
      console.warn('Unauthorized: Only admins can delete transactions.');
      return;
    }

    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },

  // Action to edit a transaction cleanly with RBAC guard
  editTransaction: (id, updatedData) => {
    const isAdmin = useAuthStore.getState().isAdmin;
    if (!isAdmin) {
      console.warn('Unauthorized: Only admins can edit transactions.');
      return;
    }

    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedData } : t
      ),
    }));
  },

  // Selectors for derived state
  getTotalIncome: () => {
    return get().transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  },

  getTotalExpense: () => {
    return get().transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  },

  getTotalBalance: () => {
    let income = 0;
    let expense = 0;
    
    get().transactions.forEach((t) => {
      if (t.type === 'income') income += Number(t.amount);
      if (t.type === 'expense') expense += Number(t.amount);
    });

    return income - expense;
  },
}));
