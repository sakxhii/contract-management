// src/context/ContractContext.tsx
import { createContext, useContext, useState } from "react";
import type { Contract } from "../types/contract";

interface ContractContextType {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  updateContractStatus: (id: string, status: Contract["status"]) => void;
}

const ContractContext = createContext<ContractContextType | null>(null);

export const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const addContract = (contract: Contract) => {
    setContracts(prev => [...prev, contract]);
  };

  const updateContractStatus = (id: string, status: Contract["status"]) => {
    setContracts(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status } : c
      )
    );
  };

  return (
    <ContractContext.Provider value={{ contracts, addContract, updateContractStatus }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) throw new Error("useContracts must be used within ContractProvider");
  return context;
};