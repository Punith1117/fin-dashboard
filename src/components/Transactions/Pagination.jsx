import React from 'react';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-4 px-2 select-none border-t border-gray-100">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-500 hover:text-finance-primary hover:bg-finance-primary/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
        title="First Page"
      >
        <ChevronsLeft size={18} />
      </button>
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-500 hover:text-finance-primary hover:bg-finance-primary/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
        title="Previous Page"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center mx-2 gap-1">
        {(() => {
          const pages = [];
          const maxVisible = 5;
          let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
          let end = Math.min(totalPages, start + maxVisible - 1);

          if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
          }

          for (let i = start; i <= end; i++) {
            pages.push(
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                  currentPage === i
                    ? 'bg-finance-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {i}
              </button>
            );
          }
          return pages;
        })()}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-500 hover:text-finance-primary hover:bg-finance-primary/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
        title="Next Page"
      >
        <ChevronRight size={18} />
      </button>
      
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-500 hover:text-finance-primary hover:bg-finance-primary/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
        title="Last Page"
      >
        <ChevronsRight size={18} />
      </button>
    </div>
  );
}
