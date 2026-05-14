"use client";

import React from "react";
import { Transaction } from "@prisma/client";

export type ModalFormTransactionType = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  transaction: Transaction | null;
  handleSetTransaction: (t: Transaction) => void;
};

const ModalFormTransactionContext =
  React.createContext<ModalFormTransactionType>({
    isOpen: false,
    handleClose: () => {},
    handleOpen: () => {},
    transaction: null,
    handleSetTransaction: () => {},
  });

export function ModalFormTransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [transaction, setTransaction] = React.useState<Transaction | null>(
    null
  );

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setTransaction(null);
  }, []);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleSetTransaction = React.useCallback((t: Transaction) => {
    setTransaction(t);
  }, []);

  const value = React.useMemo(
    () => ({
      isOpen,
      handleClose,
      handleOpen,
      transaction,
      handleSetTransaction,
    }),
    [handleClose, handleOpen, handleSetTransaction, isOpen, transaction]
  );

  return (
    <ModalFormTransactionContext.Provider value={value}>
      {children}
    </ModalFormTransactionContext.Provider>
  );
}

export function useModalFormTransaction() {
  return React.useContext(ModalFormTransactionContext);
}
