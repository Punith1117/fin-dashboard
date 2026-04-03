/**
 * Utility functions for deriving business insights from transactions.
 */

/**
 * Gets transactions for a specific month and year.
 */
export const getFilteredTransactions = (transactions, month, year) => {
  return transactions.filter((tx) => {
    const date = new Date(tx.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
};

/**
 * Calculates the highest spending category for the given transactions.
 */
export const calculateTopSpendingCategory = (monthTransactions) => {
  const expenses = monthTransactions.filter((tx) => tx.type === 'expense');
  if (expenses.length === 0) return null;

  const categoryMap = {};
  let totalExpense = 0;

  expenses.forEach((tx) => {
    const amt = Number(tx.amount);
    categoryMap[tx.category] = (categoryMap[tx.category] || 0) + amt;
    totalExpense += amt;
  });

  const topCategory = Object.entries(categoryMap).reduce(
    (prev, curr) => (curr[1] > prev[1] ? curr : prev),
    ['None', 0]
  );

  return {
    category: topCategory[0],
    amount: topCategory[1],
    percentage: totalExpense > 0 ? ((topCategory[1] / totalExpense) * 100).toFixed(1) : 0,
  };
};

/**
 * Compares current month spending with previous month.
 */
export const calculateMonthlyComparison = (currentTransactions, prevTransactions) => {
  const currentTotal = currentTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const prevTotal = prevTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  if (prevTotal === 0) return { diff: 0, isIncrease: false };

  const diffPercent = (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1);
  return {
    diff: Math.abs(diffPercent),
    isIncrease: diffPercent > 0,
  };
};

/**
 * Calculates savings rate for the current month.
 */
export const calculateSavingsRate = (monthTransactions) => {
  let income = 0;
  let expense = 0;

  monthTransactions.forEach((tx) => {
    const amt = Number(tx.amount);
    if (tx.type === 'income') income += amt;
    else expense += amt;
  });

  if (income === 0) return 0;

  const savings = income - expense;
  return ((savings / income) * 100).toFixed(1);
};

/**
 * Checks for overspending alert based on income vs expense.
 */
export const checkOverspending = (monthTransactions) => {
  let income = 0;
  let expense = 0;

  monthTransactions.forEach((tx) => {
    const amt = Number(tx.amount);
    if (tx.type === 'income') income += amt;
    else expense += amt;
  });

  if (income === 0 && expense > 0) return { status: 'critical', message: 'No income this month!' };
  if (expense > income) return { status: 'critical', message: 'Spending exceeds income' };
  if (expense > 0.8 * income) return { status: 'warning', message: 'Spent > 80% of income' };

  return null;
};
