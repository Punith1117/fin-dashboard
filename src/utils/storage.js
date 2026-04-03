const STORAGE_KEY = 'fin_transactions';
import { categories } from '../constants/categories';

/**
 * Retrieves transactions from localStorage.
 * Handles parsing errors and returns null if data is missing or invalid.
 */
export const getStoredTransactions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const parsedData = JSON.parse(data);
    
    // Deep validation: ensure it's an array and each item meets structural requirements
    if (Array.isArray(parsedData)) {
      const isSchemaValid = parsedData.every(item => (
        item.id && 
        (typeof item.amount === 'number' || !isNaN(Number(item.amount))) && 
        ['income', 'expense'].includes(item.type) &&
        categories.includes(item.category) &&
        item.date && !isNaN(Date.parse(item.date))
      ));

      if (isSchemaValid) {
        return parsedData;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error loading transactions from localStorage:', error);
    return null;
  }
};

/**
 * Saves transactions to localStorage.
 * @param {Array} transactions - The list of transactions to persist.
 */
export const saveTransactions = (transactions) => {
  try {
    const data = JSON.stringify(transactions);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error);
  }
};
