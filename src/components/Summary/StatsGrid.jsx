import React from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { formatCurrency } from '../../utils/formatters';
import { StatCard } from './StatCard';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export function StatsGrid() {
  // Subscribe to transactions to ensure standard reactivity when the list updates
  const transactions = useTransactionStore((state) => state.transactions);
  const getTotalBalance = useTransactionStore((state) => state.getTotalBalance);
  const getTotalIncome = useTransactionStore((state) => state.getTotalIncome);
  const getTotalExpense = useTransactionStore((state) => state.getTotalExpense);

  const balance = getTotalBalance();
  const income = getTotalIncome();
  const expense = getTotalExpense();

  return (
    <div className="grid grid-cols-3 lg:gap-6 gap-1 lg:mb-8 mb-2 sticky lg:top-[55px] top-[75px] bg-finance-surface z-10">
      <StatCard 
        label="Total Balance" 
        amount={formatCurrency(balance)} 
        type="primary" 
        icon={Wallet} 
      />
      <StatCard 
        label="Total Income" 
        amount={formatCurrency(income)} 
        type="success" 
        icon={TrendingUp} 
      />
      <StatCard 
        label="Total Expenses" 
        amount={formatCurrency(expense)} 
        type="danger" 
        icon={TrendingDown} 
      />
    </div>
  );
}
