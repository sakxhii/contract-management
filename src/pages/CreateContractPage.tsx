// src/pages/CreateContractPage.tsx
import { useState } from "react";
import { useBlueprints } from "../context/BlueprintContext";
import { useContracts } from "../context/ContractContext";
import type { Contract } from "../types/contract";
import type { Blueprint, Field } from "../types/blueprint";
import Card from "../components/Card";

export default function CreateContractPage() {
  const { blueprints } = useBlueprints();
  const { addContract } = useContracts();

  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>("");
  const [contractName, setContractName] = useState<string>("");
  const [fieldValues, setFieldValues] = useState<Record<string, string | boolean>>({});
  const [signatures, setSignatures] = useState<Record<string, boolean>>({});

  const selectedBlueprint = blueprints.find(b => b.id === selectedBlueprintId);

  const handleCreateContract = () => {
    if (!selectedBlueprint || !contractName) return;

    const contract: Contract = {
      id: crypto.randomUUID(),
      name: contractName,
      blueprintId: selectedBlueprint.id,
      fields: selectedBlueprint.fields.map(field => ({
        ...field,
        value: fieldValues[field.id] ?? (field.type === 'checkbox' ? false : '')
      })),
      status: "CREATED",
      createdAt: new Date().toISOString(),
    };

    addContract(contract);
    setContractName("");
    setSelectedBlueprintId("");
    setFieldValues({});
    setSignatures({});
  };

  const handleFieldChange = (fieldId: string, value: string | boolean) => {
    setFieldValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSign = (fieldId: string) => {
    setSignatures(prev => ({ ...prev, [fieldId]: true }));
    handleFieldChange(fieldId, "Signed");
  };

  const renderFieldInput = (field: Field) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={`Enter ${field.label}`}
            value={(fieldValues[field.id] as string) || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #d1d5db",
              borderRadius: "4px"
            }}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={(fieldValues[field.id] as string) || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #d1d5db",
              borderRadius: "4px"
            }}
          />
        );
      case 'checkbox':
        return (
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={(fieldValues[field.id] as boolean) || false}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
            />
            <span>{field.label}</span>
          </label>
        );
      case 'signature':
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                width: "200px",
                height: "100px",
                border: signatures[field.id] ? "2px solid #10b981" : "2px dashed #d1d5db",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9fafb"
              }}
            >
              {signatures[field.id] ? (
                <span style={{ color: "#10b981", fontWeight: "bold" }}>✓ SIGNED</span>
              ) : (
                <span style={{ color: "#6b7280" }}>Click to sign</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleSign(field.id)}
              disabled={signatures[field.id]}
              style={{
                padding: "6px 12px",
                backgroundColor: signatures[field.id] ? "#10b981" : "#111827",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: signatures[field.id] ? "default" : "pointer",
                width: "fit-content"
              }}
            >
              {signatures[field.id] ? "Signed" : "Sign Here"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Card>
        <h2 style={{ marginBottom: "20px", color: "#111827" }}>Create Contract</h2>
        
        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Contract name"
            value={contractName}
            onChange={(e) => setContractName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              marginBottom: "10px"
            }}
          />
          
          <select
            value={selectedBlueprintId}
            onChange={(e) => {
              setSelectedBlueprintId(e.target.value);
              setFieldValues({});
              setSignatures({});
            }}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "6px"
            }}
          >
            <option value="">Select Blueprint</option>
            {blueprints.map((b: Blueprint) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {selectedBlueprint && (
          <Card style={{ backgroundColor: "#f9fafb" }}>
            <h3 style={{ marginBottom: "16px", color: "#374151" }}>
              Fields from "{selectedBlueprint.name}"
            </h3>
            
            <div style={{ 
              position: "relative", 
              minHeight: "300px", 
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              backgroundColor: "white",
              padding: "20px"
            }}>
              {selectedBlueprint.fields.map(field => (
                <div
                  key={field.id}
                  style={{
                    position: "absolute",
                    left: `${field.position.x}px`,
                    top: `${field.position.y}px`,
                    width: "200px"
                  }}
                >
                  <label style={{ 
                    display: "block", 
                    marginBottom: "4px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151"
                  }}>
                    {field.label}:
                  </label>
                  {renderFieldInput(field)}
                </div>
              ))}
            </div>
          </Card>
        )}

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleCreateContract}
            disabled={!contractName || !selectedBlueprintId}
            style={{
              padding: "10px 20px",
              backgroundColor: (!contractName || !selectedBlueprintId) ? "#9ca3af" : "#111827",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: (!contractName || !selectedBlueprintId) ? "not-allowed" : "pointer"
            }}
          >
            Create Contract
          </button>
        </div>
      </Card>
    </div>
  );
}