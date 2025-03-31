"use client";

import { Transaction } from "@prisma/client";
import React from "react";

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

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleSetTransaction(t: Transaction) {
    setTransaction(t);
  }

  return (
    <ModalFormTransactionContext.Provider
      value={{
        isOpen,
        handleClose,
        handleOpen,
        transaction,
        handleSetTransaction,
      }}
    >
      {children}
    </ModalFormTransactionContext.Provider>
  );
}

export function useModalFormTransaction() {
  return React.useContext(ModalFormTransactionContext);
}
