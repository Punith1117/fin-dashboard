import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from '../Common/Modal';
import { AddTransactionForm } from './AddTransactionForm';
import { useTransactionStore } from '../../store/useTransactionStore';

export function AddTransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const addTransaction = useTransactionStore(state => state.addTransaction);

  const handleSubmit = (transactionData) => {
    addTransaction(transactionData);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button — fixed to bottom-right of the viewport */}
      <button
        onClick={() => setIsOpen(true)}
        title="Add Transaction"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-finance-primary hover:bg-finance-primary/90 active:scale-95 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Plus size={18} />
        Add Transaction
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Transaction"
      >
        <AddTransactionForm
          onSubmit={handleSubmit}
          onCancel={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
}
