import React, { useMemo } from 'react';
import { useTransactionStore } from '../../../store/useTransactionStore';
import { 
  getFilteredTransactions, 
  calculateTopSpendingCategory, 
  calculateMonthlyComparison, 
  calculateSavingsRate, 
  checkOverspending 
} from '../../../utils/insightUtils';
import InsightCard from './InsightCard';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle, 
  Zap, 
  PieChart 
} from 'lucide-react';

const InsightsSection = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  // Dynamically determine the 'current' month based on the latest transaction
  // This ensures insights work with both mock data and real-time entries
  const today = useMemo(() => {
    if (transactions.length === 0) return new Date();
    const latestDate = transactions.reduce((max, tx) => {
      const d = new Date(tx.date);
      return d > max ? d : max;
    }, new Date(0));
    return latestDate;
  }, [transactions]);
  const month = today.getMonth();
  const year = today.getFullYear();

  const prevDate = new Date(year, month - 1, 1);
  const prevMonth = prevDate.getMonth();
  const prevYear = prevDate.getFullYear();

  const insights = useMemo(() => {
    const currentMonthTxs = getFilteredTransactions(transactions, month, year);
    const prevMonthTxs = getFilteredTransactions(transactions, prevMonth, prevYear);

    const topCategory = calculateTopSpendingCategory(currentMonthTxs);
    const comparison = calculateMonthlyComparison(currentMonthTxs, prevMonthTxs);
    const savingsRate = calculateSavingsRate(currentMonthTxs);
    const overspending = checkOverspending(currentMonthTxs);

    const list = [];

    // 1. Top Category Insight
    if (topCategory) {
      list.push({
        title: 'Highest Spending',
        value: topCategory.category,
        highlight: `₹${topCategory.amount} (${topCategory.percentage}%)`,
        icon: PieChart,
        type: 'info',
        tooltip: 'The category with the highest total expense in the current month.'
      });
    }

    // 2. Savings Rate Insight
    list.push({
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      highlight: Number(savingsRate) >= 20 ? 'Target achieved!' : 'Try to save 20%',
      icon: Target,
      type: Number(savingsRate) >= 20 ? 'success' : 'warning',
      tooltip: 'Percentage of income remaining after all expenses this month. Goal: 20%+'
    });

    // 3. Monthly Comparison
    list.push({
      title: 'Month-over-Month',
      value: `${comparison.diff}%`,
      highlight: comparison.isIncrease ? 'Increase in spending' : 'Decrease in spending',
      icon: comparison.isIncrease ? TrendingUp : TrendingDown,
      type: comparison.isIncrease ? 'warning' : 'success',
      tooltip: 'Comparison of total expenses between the current and previous month.'
    });

    // 4. Overspending Alert (Conditional)
    if (overspending) {
      list.push({
        title: 'Budget Alert',
        value: overspending.message,
        highlight: 'Immediate attention required',
        icon: AlertTriangle,
        type: overspending.status,
        tooltip: 'Triggered when expenses exceed income or a significant portion of it.'
      });
    } else {
      // Positive feedback if no overspending
      list.push({
        title: 'Budget Status',
        value: 'On Track',
        highlight: 'Spending within income',
        icon: Zap,
        type: 'success',
        tooltip: 'You are currently spending less than you earn this month. Keep it up!'
      });
    }

    return list;
  }, [transactions, month, year, prevMonth, prevYear]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-2 mb-1">
      {insights.map((insight, index) => (
        <InsightCard 
          key={index}
          {...insight}
        />
      ))}
    </div>
  );
};

export default InsightsSection;
