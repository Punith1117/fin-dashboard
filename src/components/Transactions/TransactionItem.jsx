import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export function TransactionItem({ transaction }) {
  const { amount, type, category, note, date } = transaction;
  
  const isIncome = type === 'income';
  const amountColor = isIncome ? 'text-finance-success' : 'text-finance-danger';
  const amountPrefix = isIncome ? '+' : '-';

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{category}</span>
        <span className="text-sm text-gray-500">{formattedDate}</span>
        {note && (
          <span className="text-xs text-gray-400 mt-1 truncate max-w-[200px]" title={note}>
            {note}
          </span>
        )}
      </div>
      
      <div className={`font-bold text-lg ${amountColor}`}>
        {amountPrefix} {formatCurrency(amount)}
      </div>
    </div>
  );
}
