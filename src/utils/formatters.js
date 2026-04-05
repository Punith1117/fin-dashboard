export const formatCurrency = (amount) => {
  // Check if amount has decimal places
  const hasDecimals = amount % 1 !== 0;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
