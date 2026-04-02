import { create } from 'zustand';

// Pre-seeded mock transactions
const initialTransactions = [
  {
    id: '1',
    amount: 50000,
    type: 'income',
    category: 'Salary',
    note: 'April Salary',
    date: new Date('2024-04-01T10:00:00').toISOString(),
  },
  {
    id: '2',
    amount: 1500,
    type: 'expense',
    category: 'Food & Dining',
    note: 'Dinner at restaurant',
    date: new Date('2024-04-02T20:30:00').toISOString(),
  },
  {
    id: '3',
    amount: 12000,
    type: 'expense',
    category: 'Rent',
    note: 'April Rent',
    date: new Date('2024-04-05T09:00:00').toISOString(),
  },
  {
    id: '4',
    amount: 8000,
    type: 'income',
    category: 'Freelance',
    note: 'Side project milestone',
    date: new Date('2024-04-10T15:00:00').toISOString(),
  },
  {
    id: '5',
    amount: 2500,
    type: 'expense',
    category: 'Utilities',
    note: 'Electricity Bill',
    date: new Date('2024-04-15T11:20:00').toISOString(),
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

  // Action to delete a transaction cleanly
  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },

  // Action to edit a transaction cleanly
  editTransaction: (id, updatedData) => {
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
