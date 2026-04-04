import React, { useState } from 'react';
import { categories } from '../../constants/categories';

export function AddTransactionForm({ onSubmit, onCancel }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(categories[0]);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const numAmount = Number(amount);
    if (!amount || numAmount <= 0) {
      setError('Amount must be greater than zero');
      return;
    }

    if (note.length > 50) {
      setError('Note must be 50 characters or less');
      return;
    }

    setError('');
    onSubmit({
      amount: numAmount,
      type,
      category,
      note: note.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="p-3 text-sm text-finance-danger bg-finance-danger/10 rounded-lg" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="transaction-type" className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
        <select 
          id="transaction-type"
          value={type} 
          onChange={(e) => setType(e.target.value)}
          className="p-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-finance-primary/50"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="transaction-category" className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
        <select 
          id="transaction-category"
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-finance-primary/50"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="transaction-amount" className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount (₹)</label>
        <input 
          id="transaction-amount"
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          min="0.01"
          step="0.01"
          aria-describedby="amount-description"
          className="p-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-finance-primary/50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="transaction-note" className="text-sm font-medium text-gray-700 dark:text-gray-300">Note (optional, max 50 chars)</label>
        <input 
          id="transaction-note"
          type="text" 
          value={note} 
          onChange={(e) => setNote(e.target.value)}
          placeholder="What was this for?"
          maxLength={50}
          aria-describedby="note-description"
          className="p-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-finance-primary/50"
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-finance-primary hover:bg-finance-primary/90 rounded-lg transition-colors"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}
