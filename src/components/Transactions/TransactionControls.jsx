import React from 'react';
import { categories } from '../../constants/categories';

export function TransactionControls({ 
  searchQuery, 
  setSearchQuery, 
  typeFilter, 
  setTypeFilter, 
  categoryFilter, 
  setCategoryFilter,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  sortConfig,
  setSortConfig,
  isFiltered,
  resetFilters
}) {
  return (
    <div className="mb-6 px-2 flex flex-col gap-4">
      {/* Search Bar */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by note or category..."
          className="block w-full lg:pl-10 pl-8 lg:pr-10 pr-8 lg:py-3 py-2 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary sm:text-sm shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[140px]">
          <label htmlFor="type-filter" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Type
          </label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="block w-full px-3 lg:py-2.5 py-1.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary transition-all cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="flex-[2] min-w-[180px]">
          <label htmlFor="category-filter" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Category
          </label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full px-3 lg:py-2.5 py-1.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary transition-all cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Range */}
        <div className="flex-[2] min-w-[200px] flex gap-2">
          <div className="flex-1">
            <label htmlFor="min-amount" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
              Min (₹)
            </label>
            <input
              type="number"
              id="min-amount"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="0"
              min="0"
              className="block w-full px-3 lg:py-2.5 py-1.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary transition-all"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="max-amount" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
              Max (₹)
            </label>
            <input
              type="number"
              id="max-amount"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="Max"
              min="0"
              className="block w-full px-3 lg:py-2.5 py-1.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary transition-all"
            />
          </div>
        </div>
        
        {/* Sort Controls */}
        <div className="flex-[1.5] min-w-[200px] flex gap-2">
          <div className="flex-[2]">
            <label htmlFor="sort-key" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
              Sort By
            </label>
            <select
              id="sort-key"
              value={sortConfig.key}
              onChange={(e) => setSortConfig({ ...sortConfig, key: e.target.value })}
              className="block w-full px-3 lg:py-2.5 py-1.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary transition-all cursor-pointer"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="sort-order" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
              Order
            </label>
            <select
              id="sort-order"
              value={sortConfig.order}
              onChange={(e) => setSortConfig({ ...sortConfig, order: e.target.value })}
              className="block w-full px-3 lg:py-2.5 py-1.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary transition-all cursor-pointer"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clear All Active Filters */}
      {isFiltered && (
        <div className="flex justify-end mt-2 px-1">
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-finance-primary hover:text-finance-primary/80 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
