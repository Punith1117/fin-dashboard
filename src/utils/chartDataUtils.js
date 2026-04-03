/**
 * Utility functions for charting and data transformation.
 * All logic for deriving chart data from raw transactions resides here.
 */

/**
 * Transforms raw transactions into a 6-month balance trend for AreaChart.
 * Returns an array of objects: { month: string, balance: number, income: number, expense: number }
 */
export const formatBalanceTrendData = (transactions) => {
  const now = new Date();
  const months = [];
  
  // Create an array for the last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = d.toLocaleString('default', { month: 'short' });
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    
    months.push({
      key: yearMonth,
      month: monthKey,
      income: 0,
      expense: 0,
      balance: 0
    });
  }

  // Aggregate income and expenses by month
  transactions.forEach((tx) => {
    const txDate = new Date(tx.date);
    const txYearMonth = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, '0')}`;
    
    const monthData = months.find(m => m.key === txYearMonth);
    if (monthData) {
      const amt = Number(tx.amount);
      if (tx.type === 'income') {
        monthData.income += amt;
      } else {
        monthData.expense += amt;
      }
    }
  });

  // Here we'll show monthly net balance for the trend
  months.forEach(m => {
    m.balance = m.income - m.expense;
  });

  return months;
};

/**
 * Transforms transactions into category distribution data for PieChart.
 * Groups by category, sorts by absolute amount, takes top 6, and groups the rest.
 */
export const formatCategoryDistributionData = (transactions) => {
  const expenseMap = {};
  
  // Aggregate only expenses
  transactions
    .filter(tx => tx.type === 'expense')
    .forEach(tx => {
      const category = tx.category || 'Uncategorized';
      expenseMap[category] = (expenseMap[category] || 0) + Math.abs(Number(tx.amount));
    });

  // Convert to array and sort
  const sortedCategories = Object.entries(expenseMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (sortedCategories.length <= 6) {
    return sortedCategories;
  }

  // Group top 6 and Others
  const topSix = sortedCategories.slice(0, 6);
  const othersValue = sortedCategories.slice(6).reduce((sum, item) => sum + item.value, 0);
  
  return [...topSix, { name: 'Others', value: othersValue }];
};

