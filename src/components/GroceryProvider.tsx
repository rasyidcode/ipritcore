import { createContext, ReactNode, useContext, useState } from "react";

export type GroceryProviderType = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  item: {
    name: string;
    amount: number;
    price: number;
  } | null;
};

const GroceryContext = createContext<GroceryProviderType>({
  isOpen: false,
  handleClose: () => {},
  handleOpen: () => {},
  item: {
    name: "",
    amount: 1,
    price: 0,
  },
});

export function GroceryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<{
    name: string;
    amount: number;
    price: number;
  } | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <GroceryContext.Provider value={{ isOpen, handleClose, handleOpen, item }}>
      {children}
    </GroceryContext.Provider>
  );
}

export function useGroceryProvider() {
  return useContext(GroceryContext);
}
