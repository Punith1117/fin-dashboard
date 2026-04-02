import React from 'react';
import { Modal } from '../Common/Modal';
import { EditTransactionForm } from './EditTransactionForm';
import { useTransactionStore } from '../../store/useTransactionStore';

export function EditTransactionModal({ transaction, isOpen, onClose }) {
  const editTransaction = useTransactionStore((state) => state.editTransaction);

  const handleSubmit = (updatedData) => {
    editTransaction(transaction.id, updatedData);
    onClose();
  };

  if (!transaction) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Edit Transaction"
    >
      <EditTransactionForm 
        initialData={transaction}
        onSubmit={handleSubmit} 
        onCancel={onClose} 
      />
    </Modal>
  );
}
