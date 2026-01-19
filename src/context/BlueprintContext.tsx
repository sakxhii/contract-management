// src/context/BlueprintContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { Blueprint } from "../types/blueprint";

interface BlueprintContextType {
  blueprints: Blueprint[];
  addBlueprint: (blueprint: Blueprint) => void;
  deleteBlueprint: (id: string) => void;
  updateBlueprint: (id: string, blueprint: Partial<Blueprint>) => void;
}

const STORAGE_KEY = 'contract-platform-blueprints';

const BlueprintContext = createContext<BlueprintContextType | null>(null);

export const BlueprintProvider = ({ children }: { children: React.ReactNode }) => {
  const [blueprints, setBlueprints] = useState<Blueprint[]>(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever blueprints change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blueprints));
  }, [blueprints]);

  const addBlueprint = (blueprint: Blueprint) => {
    setBlueprints(prev => [...prev, blueprint]);
  };

  const deleteBlueprint = (id: string) => {
    setBlueprints(prev => prev.filter(b => b.id !== id));
  };

  const updateBlueprint = (id: string, updates: Partial<Blueprint>) => {
    setBlueprints(prev =>
      prev.map(b => b.id === id ? { ...b, ...updates } : b)
    );
  };

  return (
    <BlueprintContext.Provider value={{ 
      blueprints, 
      addBlueprint, 
      deleteBlueprint,
      updateBlueprint 
    }}>
      {children}
    </BlueprintContext.Provider>
  );
};

export const useBlueprints = () => {
  const context = useContext(BlueprintContext);
  if (!context) throw new Error("useBlueprints must be used within BlueprintProvider");
  return context;
};