import { createContext, useContext, useState } from "react";
import type { Blueprint } from "../types/blueprint";

interface BlueprintContextType {
  blueprints: Blueprint[];
  addBlueprint: (blueprint: Blueprint) => void;
}

const BlueprintContext = createContext<BlueprintContextType | null>(null);


export const BlueprintProvider = ({ children }: { children: React.ReactNode }) => {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);

  const addBlueprint = (blueprint: Blueprint) => {
    setBlueprints(prev => [...prev, blueprint]);
  };

  return (
    <BlueprintContext.Provider value={{ blueprints, addBlueprint }}>
      {children}
    </BlueprintContext.Provider>
  );
};

export const useBlueprints = () => {
  const context = useContext(BlueprintContext);
  if (!context) throw new Error("useBlueprints must be used within BlueprintProvider");
  return context;
};

