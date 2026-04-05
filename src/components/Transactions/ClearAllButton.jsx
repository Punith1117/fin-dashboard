import React, { useState } from 'react';
import { BrushCleaning } from 'lucide-react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { useAuthStore } from '../../store/useAuthStore';

export function ClearAllButton() {
  const { clearAllTransactions } = useTransactionStore();
  const { isAdmin } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isAdmin) return null;

  const handleClearAll = () => {
    clearAllTransactions();
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        title="Clear All Transactions"
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <BrushCleaning size={18} />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Clear All Transactions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This action cannot be undone. All transactions will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
