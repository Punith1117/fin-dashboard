import React from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { formatCurrency } from '../../utils/formatters';
import { StatCard } from './StatCard';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export function StatsGrid() {
  const getTotalBalance = useTransactionStore((state) => state.getTotalBalance);
  const getTotalIncome = useTransactionStore((state) => state.getTotalIncome);
  const getTotalExpense = useTransactionStore((state) => state.getTotalExpense);

  const balance = getTotalBalance();
  const income = getTotalIncome();
  const expense = getTotalExpense();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
