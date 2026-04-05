import React, { useState, useMemo, useEffect } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { TransactionItem } from './TransactionItem';
import { TransactionControls } from './TransactionControls';
import { EditTransactionModal } from './EditTransactionModal';
import { Pagination } from './Pagination';
import { useDebounce } from '../../hooks/useDebounce';

export function TransactionList() {
  const transactions = useTransactionStore((state) => state.transactions);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', order: 'desc' });
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

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

    // sort logic
    result.sort((a, b) => {
      let comparison = 0;
      if (sortConfig.key === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortConfig.key === 'amount') {
        comparison = Math.round((Number(a.amount) - Number(b.amount)) * 100) / 100;
      } else if (sortConfig.key === 'category') {
        comparison = (a.category || '').localeCompare(b.category || '');
      }

      return sortConfig.order === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [transactions, debouncedSearchQuery, typeFilter, categoryFilter, minAmount, maxAmount, sortConfig]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  // Edge case handle: when a delete/edit reduces total results below current page
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, typeFilter, categoryFilter, minAmount, maxAmount, sortConfig]);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const isFiltered = searchQuery !== '' || typeFilter !== 'all' || categoryFilter !== 'all' || minAmount !== '' || maxAmount !== '';

  const resetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setMinAmount('');
    setMaxAmount('');
    setSortConfig({ key: 'date', order: 'desc' });
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 px-2">Transactions History</h2>
      
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
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        isFiltered={isFiltered}
        resetFilters={resetFilters}
      />

      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-finance-surface dark:bg-gray-800 shadow-sm overflow-hidden min-h-[100px]">
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
            {paginatedTransactions.map((transaction) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                onEdit={() => setEditingTransaction(transaction)}
              />
            ))}
            
            {totalPages > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>

      <EditTransactionModal
        transaction={editingTransaction}
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
      />
    </section>
  );
}
