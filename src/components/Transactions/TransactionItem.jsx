import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatters';
import { useAuthStore } from '../../store/useAuthStore';
import { useTransactionStore } from '../../store/useTransactionStore';
import { Edit2, Trash2 } from 'lucide-react';
import { EditTransactionModal } from './EditTransactionModal';

export function TransactionItem({ transaction }) {
  const { amount, type, category, note, date } = transaction;
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const isIncome = type === 'income';
  const amountColor = isIncome ? 'text-finance-success' : 'text-finance-danger';
  const amountPrefix = isIncome ? '+' : '-';

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transaction.id);
    }
  };

  return (
    <>
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
        
        <div className="flex items-center gap-6">
          <div className={`font-bold text-lg ${amountColor}`}>
            {amountPrefix} {formatCurrency(amount)}
          </div>
          
          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 text-gray-400 hover:text-finance-primary hover:bg-finance-primary/10 rounded-lg transition-colors"
                title="Edit Transaction"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-finance-danger hover:bg-finance-danger/10 rounded-lg transition-colors"
                title="Delete Transaction"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <EditTransactionModal
        transaction={transaction}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
