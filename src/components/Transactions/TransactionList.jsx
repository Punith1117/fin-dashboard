import React from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { TransactionItem } from './TransactionItem';

export function TransactionList() {
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">Transactions History</h2>
      <div className="rounded-2xl border border-gray-100 bg-finance-surface shadow-sm overflow-hidden min-h-[100px]">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500">
            <p className="text-lg font-medium">No transactions yet</p>
            <p className="text-sm">Add your first transaction to get started.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
