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
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-finance-primary hover:bg-finance-primary/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
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
