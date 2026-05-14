"use client";

import React from "react";
import { TransactionWithCategory } from "@/types/transaction";

export type ModalFormTransactionType = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  transaction: TransactionWithCategory | null;
  handleSetTransaction: (t: TransactionWithCategory) => void;
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
  const [transaction, setTransaction] =
    React.useState<TransactionWithCategory | null>(null);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setTransaction(null);
  }, []);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleSetTransaction = React.useCallback(
    (t: TransactionWithCategory) => {
      setTransaction(t);
    },
    []
  );

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
