// src/context/ContractContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { Contract } from "../types/contract";

interface ContractContextType {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  updateContractStatus: (id: string, status: Contract["status"]) => void;
  deleteContract: (id: string) => void;
  getContract: (id: string) => Contract | undefined;
}

const STORAGE_KEY = 'contract-platform-contracts';

const ContractContext = createContext<ContractContextType | null>(null);

export const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const [contracts, setContracts] = useState<Contract[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
  }, [contracts]);

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

  const deleteContract = (id: string) => {
    setContracts(prev => prev.filter(c => c.id !== id));
  };

  const getContract = (id: string) => {
    return contracts.find(c => c.id === id);
  };

  return (
    <ContractContext.Provider value={{ 
      contracts, 
      addContract, 
      updateContractStatus,
      deleteContract,
      getContract
    }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) throw new Error("useContracts must be used within ContractProvider");
  return context;
};