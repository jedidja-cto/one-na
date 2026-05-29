import { useState } from 'react';
import { BIZ } from '../data/data.js';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openModal = (id) => {
    const business = BIZ.find(b => b.id === id);
    setSelectedBusiness(business);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedBusiness(null);
  };

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return {
    isOpen, selectedBusiness, openModal, closeModal,
    isFormOpen, openForm, closeForm,
  };
}
