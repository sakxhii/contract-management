import { createContext, useContext, useState } from "react";
import type { Contract } from "../types/contract";

const ContractContext = createContext<any>(null);

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

export const useContracts = () => useContext(ContractContext);
