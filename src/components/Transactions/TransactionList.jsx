import React, { useState, useMemo } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { TransactionItem } from './TransactionItem';
import { TransactionControls } from './TransactionControls';
import { useDebounce } from '../../hooks/useDebounce';

export function TransactionList() {
  const transactions = useTransactionStore((state) => state.transactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Filter by Type
    if (typeFilter !== 'all') {
      result = result.filter((t) => t.type === typeFilter);
    }

    // Filter by Category
    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // Filter by Amount Range
    if (minAmount !== '') {
      result = result.filter((t) => Number(t.amount) >= Number(minAmount));
    }
    if (maxAmount !== '') {
      result = result.filter((t) => Number(t.amount) <= Number(maxAmount));
    }

    // Filter by Search Query
    if (debouncedSearchQuery) {
      const lowerQuery = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          (t.note && t.note.toLowerCase().includes(lowerQuery)) ||
          (t.category && t.category.toLowerCase().includes(lowerQuery))
      );
    }

    // Default Sort: Newest First
    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    return result;
  }, [transactions, debouncedSearchQuery, typeFilter, categoryFilter, minAmount, maxAmount]);

  const isFiltered = searchQuery !== '' || typeFilter !== 'all' || categoryFilter !== 'all' || minAmount !== '' || maxAmount !== '';

  const resetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setMinAmount('');
    setMaxAmount('');
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">Transactions History</h2>
      
      <TransactionControls 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        minAmount={minAmount}
        setMinAmount={setMinAmount}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
      />

      <div className="rounded-2xl border border-gray-100 bg-finance-surface shadow-sm overflow-hidden min-h-[100px]">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500">
            {transactions.length === 0 ? (
              <>
                <p className="text-lg font-medium">No transactions yet</p>
                <p className="text-sm">Add your first transaction to get started.</p>
              </>
            ) : (
              <>
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm">Try adjusting your filters or search criteria.</p>
                {isFiltered && (
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 text-sm font-medium text-finance-primary bg-finance-primary/10 rounded-lg hover:bg-finance-primary/20 transition-colors"
                  >
                    Reset All Filters
                  </button>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
