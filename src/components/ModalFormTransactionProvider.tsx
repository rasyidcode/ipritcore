"use client";

import React, { useContext } from "react";

export type ModalFormTransactionType = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
};

const ModalFormTransactionContext =
  React.createContext<ModalFormTransactionType>({
    isOpen: false,
    handleClose: () => {},
    handleOpen: () => {},
  });

export function ModalFormTransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <ModalFormTransactionContext.Provider
      value={{ isOpen, handleClose, handleOpen }}
    >
      {children}
    </ModalFormTransactionContext.Provider>
  );
}

export function useModalFormTransaction() {
  return useContext(ModalFormTransactionContext);
}
