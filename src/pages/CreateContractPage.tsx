// src/pages/CreateContractPage.tsx
import { useState, useEffect } from "react";
import { useBlueprints } from "../context/BlueprintContext";
import { useContracts } from "../context/ContractContext";
import type { Contract } from "../types/contract";
import type { Blueprint, Field } from "../types/blueprint";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

// Simple drag handler - separate from hook for debugging
interface DraggableFieldProps {
  field: Field & { value?: string | boolean };
  fieldValues: Record<string, string | boolean>;
  signatures: Record<string, boolean>;
  onFieldChange: (fieldId: string, value: string | boolean) => void;
  onSign: (fieldId: string) => void;
  onPositionChange?: (fieldId: string, x: number, y: number) => void;
}

// Update the DraggableField component in CreateContractPage.tsx

function DraggableField({
  field,
  fieldValues,
  signatures,
  onFieldChange,
  onSign,
  onPositionChange
}: DraggableFieldProps) {
  const [position, setPosition] = useState(field.position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isInputActive, setIsInputActive] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start drag if clicking on input or checkbox
    const target = e.target as HTMLElement;
    const isInputElement = 
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.tagName === 'BUTTON';
    
    if (isInputElement || (field.type === 'signature' && signatures[field.id])) {
      return;
    }
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Constrain to canvas bounds
      const constrainedX = Math.max(0, Math.min(newX, 600));
      const constrainedY = Math.max(0, Math.min(newY, 400));
      
      setPosition({ x: constrainedX, y: constrainedY });
      onPositionChange?.(field.id, constrainedX, constrainedY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, field.id, onPositionChange]);

  const getFieldStyle = () => {
    const baseStyle = {
      position: "absolute" as const,
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: "250px",
      padding: "16px",
      backgroundColor: "white",
      border: "2px solid var(--primary-light)",
      borderRadius: "var(--radius)",
      boxShadow: isDragging ? "var(--shadow-lg)" : "var(--shadow-sm)",
      zIndex: isDragging ? 1000 : 1,
      cursor: isDragging ? "grabbing" : 
               (field.type === 'signature' && signatures[field.id]) ? "default" : "grab",
      transition: isDragging ? "none" : "all 0.2s ease",
      userSelect: "none" as const
    };

    if (field.type === 'signature' && signatures[field.id]) {
      return {
        ...baseStyle,
        border: "2px solid var(--success)",
        backgroundColor: "rgba(16, 185, 129, 0.05)",
        cursor: "default"
      };
    }

    return baseStyle;
  };

  const renderFieldContent = () => {
    switch (field.type) {
      case 'text':
        return (
          <>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
              cursor: "move",
              userSelect: "none"
            }}
            onMouseDown={handleMouseDown}
            >
              <label style={{ 
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--gray-700)"
              }}>
                {field.label}:
              </label>
              <span style={{
                fontSize: "10px",
                color: "var(--gray-400)",
                backgroundColor: "var(--gray-100)",
                padding: "2px 6px",
                borderRadius: "4px"
              }}>
                Drag
              </span>
            </div>
            <input
              type="text"
              placeholder={`Enter ${field.label.toLowerCase()}`}
              value={(fieldValues[field.id] as string) || ''}
              onChange={(e) => onFieldChange(field.id, e.target.value)}
              onFocus={() => setIsInputActive(true)}
              onBlur={() => setIsInputActive(false)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid var(--gray-300)",
                borderRadius: "var(--radius)",
                fontSize: "14px",
                cursor: "text"
              }}
            />
          </>
        );
      
      case 'date':
        return (
          <>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
              cursor: "move",
              userSelect: "none"
            }}
            onMouseDown={handleMouseDown}
            >
              <label style={{ 
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--gray-700)"
              }}>
                {field.label}:
              </label>
              <span style={{
                fontSize: "10px",
                color: "var(--gray-400)",
                backgroundColor: "var(--gray-100)",
                padding: "2px 6px",
                borderRadius: "4px"
              }}>
                Drag
              </span>
            </div>
            <input
              type="date"
              value={(fieldValues[field.id] as string) || ''}
              onChange={(e) => onFieldChange(field.id, e.target.value)}
              onFocus={() => setIsInputActive(true)}
              onBlur={() => setIsInputActive(false)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid var(--gray-300)",
                borderRadius: "var(--radius)",
                fontSize: "14px",
                cursor: "text"
              }}
            />
          </>
        );
      
      case 'checkbox':
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="checkbox"
              id={`checkbox-${field.id}`}
              checked={(fieldValues[field.id] as boolean) || false}
              onChange={(e) => onFieldChange(field.id, e.target.checked)}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer"
              }}
            />
            <div 
              style={{ 
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "move",
                userSelect: "none"
              }}
              onMouseDown={handleMouseDown}
            >
              <label 
                htmlFor={`checkbox-${field.id}`}
                style={{ 
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "var(--gray-700)",
                  cursor: "pointer"
                }}
              >
                {field.label}
              </label>
              <span style={{
                fontSize: "10px",
                color: "var(--gray-400)",
                backgroundColor: "var(--gray-100)",
                padding: "2px 6px",
                borderRadius: "4px"
              }}>
                Drag
              </span>
            </div>
          </div>
        );
      
      case 'signature':
        return (
          <>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
              cursor: signatures[field.id] ? "default" : "move",
              userSelect: "none"
            }}
            onMouseDown={signatures[field.id] ? undefined : handleMouseDown}
            >
              <label style={{ 
                fontSize: "14px",
                fontWeight: "600",
                color: signatures[field.id] ? "var(--success)" : "var(--gray-700)"
              }}>
                {field.label}:
              </label>
              {!signatures[field.id] && (
                <span style={{
                  fontSize: "10px",
                  color: "var(--gray-400)",
                  backgroundColor: "var(--gray-100)",
                  padding: "2px 6px",
                  borderRadius: "4px"
                }}>
                  Drag
                </span>
              )}
            </div>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "12px",
              alignItems: "center"
            }}>
              <div
                style={{
                  width: "200px",
                  height: "80px",
                  border: signatures[field.id] 
                    ? "2px solid var(--success)" 
                    : "2px dashed var(--gray-300)",
                  borderRadius: "var(--radius)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: signatures[field.id] 
                    ? "rgba(16, 185, 129, 0.1)" 
                    : "var(--gray-50)",
                  fontSize: signatures[field.id] ? "20px" : "14px",
                  color: signatures[field.id] ? "var(--success)" : "var(--gray-500)",
                  fontWeight: signatures[field.id] ? "bold" : "normal"
                }}
              >
                {signatures[field.id] ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontSize: "24px" }}>✓</div>
                    <div>SIGNED</div>
                  </div>
                ) : (
                  "Click to sign below"
                )}
              </div>
              {!signatures[field.id] && (
                <Button
                  onClick={() => onSign(field.id)}
                  variant="primary"
                  size="sm"
                  style={{ width: "100%" }}
                >
                  Sign Here
                </Button>
              )}
            </div>
          </>
        );
      
      default:
        return <div>Unknown field type</div>;
    }
  };

  return (
    <div
      style={getFieldStyle()}
    >
      {renderFieldContent()}
      {!isInputActive && !isDragging && field.type !== 'signature' && (
        <div style={{ 
          fontSize: "11px", 
          color: "var(--gray-400)",
          marginTop: "8px",
          display: "flex",
          justifyContent: "space-between",
          userSelect: "none"
        }}>
          <span>Position: {position.x}, {position.y}</span>
          <span>Click label to drag</span>
        </div>
      )}
    </div>
  );
}

export default function CreateContractPage() {
  const { blueprints } = useBlueprints();
  const { addContract } = useContracts();

  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>("");
  const [contractName, setContractName] = useState<string>("");
  const [fieldValues, setFieldValues] = useState<Record<string, string | boolean>>({});
  const [signatures, setSignatures] = useState<Record<string, boolean>>({});
  const [fieldPositions, setFieldPositions] = useState<Record<string, { x: number; y: number }>>({});

  const selectedBlueprint = blueprints.find(b => b.id === selectedBlueprintId);

  // Initialize form when blueprint is selected
  useEffect(() => {
    if (selectedBlueprint) {
      console.log("Blueprint selected:", selectedBlueprint.name);
      
      const initialValues: Record<string, string | boolean> = {};
      const initialPositions: Record<string, { x: number; y: number }> = {};
      
      selectedBlueprint.fields.forEach(field => {
        initialValues[field.id] = field.type === 'checkbox' ? false : '';
        initialPositions[field.id] = { ...field.position };
      });
      
      setFieldValues(initialValues);
      setFieldPositions(initialPositions);
      setSignatures({});
    } else {
      console.log("No blueprint selected");
    }
  }, [selectedBlueprint]);

  const handleCreateContract = () => {
    if (!selectedBlueprint || !contractName) {
      alert("Please select a blueprint and enter a contract name");
      return;
    }

    console.log("Creating contract...");

    const contract: Contract = {
      id: crypto.randomUUID(),
      name: contractName,
      blueprintId: selectedBlueprint.id,
      fields: selectedBlueprint.fields.map(field => ({
        ...field,
        position: fieldPositions[field.id] || field.position,
        value: fieldValues[field.id] ?? (field.type === 'checkbox' ? false : '')
      })),
      status: "CREATED",
      createdAt: new Date().toISOString(),
    };

    console.log("Contract created:", contract);

    addContract(contract);
    
    // Show success message
    alert(`✅ Contract "${contractName}" created successfully!\nStatus: ${contract.status}`);
    
    // Reset form
    setContractName("");
    setSelectedBlueprintId("");
    setFieldValues({});
    setSignatures({});
    setFieldPositions({});
  };

  const handleFieldChange = (fieldId: string, value: string | boolean) => {
    console.log("Field changed:", fieldId, value);
    setFieldValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSign = (fieldId: string) => {
    console.log("Signing field:", fieldId);
    setSignatures(prev => ({ ...prev, [fieldId]: true }));
    handleFieldChange(fieldId, "✓ Signed");
  };

  const handlePositionChange = (fieldId: string, x: number, y: number) => {
    setFieldPositions(prev => ({
      ...prev,
      [fieldId]: { x, y }
    }));
  };

  // Count completed fields
  const completedFields = selectedBlueprint 
    ? selectedBlueprint.fields.filter(field => {
        const value = fieldValues[field.id];
        if (field.type === 'checkbox') {
          return value === true;
        } else if (field.type === 'signature') {
          return signatures[field.id] === true;
        } else {
          return value && String(value).trim() !== '';
        }
      }).length
    : 0;

  return (
    <div style={{ 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: "20px",
      minHeight: "calc(100vh - 100px)"
    }}>
      <Card 
        title="Create New Contract" 
        subtitle="Generate contracts from existing templates"
        gradient
        hoverable
      >
        {/* Contract Name and Blueprint Selection */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "20px",
          marginBottom: "30px"
        }}>
          <div>
            <Input
              label="Contract Name"
              placeholder="e.g., Alex Johnson - Employment Contract"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              icon="📄"
              required
            />
          </div>
          
          <div>
            <label style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--gray-700)"
            }}>
              Select Template
            </label>
            <select
              value={selectedBlueprintId}
              onChange={(e) => {
                console.log("Blueprint selected:", e.target.value);
                setSelectedBlueprintId(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--gray-300)",
                borderRadius: "var(--radius)",
                fontSize: "14px",
                color: "var(--gray-800)",
                backgroundColor: "white",
                cursor: "pointer"
              }}
            >
              <option value="">-- Choose a template --</option>
              {blueprints.map((b: Blueprint) => (
                <option key={b.id} value={b.id}>
                  📋 {b.name} ({b.fields.length} fields)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contract Preview Section - Only show if blueprint selected */}
        {selectedBlueprint ? (
          <Card style={{ 
            backgroundColor: "rgba(249, 250, 251, 0.9)",
            marginBottom: "30px",
            position: "relative"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: "18px", 
                  fontWeight: "600",
                  color: "var(--gray-900)"
                }}>
                  Contract Preview
                </h3>
                <p style={{ 
                  margin: "4px 0 0 0", 
                  fontSize: "14px", 
                  color: "var(--gray-500)"
                }}>
                  Template: <strong>{selectedBlueprint.name}</strong> • 
                  Fields: <strong>{selectedBlueprint.fields.length}</strong> • 
                  Completed: <strong style={{ color: "var(--success)" }}>{completedFields}</strong>
                </p>
              </div>
              <div style={{ 
                fontSize: "12px", 
                color: "var(--gray-400)",
                backgroundColor: "var(--gray-100)",
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)"
              }}>
                💡 Drag fields to reposition
              </div>
            </div>

            {/* Contract Canvas */}
            <div style={{ 
              position: "relative", 
              minHeight: "500px", 
              border: "2px solid var(--gray-200)",
              borderRadius: "var(--radius)",
              backgroundColor: "white",
              padding: "40px",
              overflow: "hidden"
            }}>
              {/* Grid background */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  linear-gradient(to right, var(--gray-100) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--gray-100) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                opacity: 0.3,
                pointerEvents: "none"
              }} />
              
              {/* Canvas size indicator */}
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                fontSize: "12px",
                color: "var(--gray-400)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "4px 8px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--gray-200)"
              }}>
                Canvas: 800px × 500px
              </div>

              {/* Render all fields */}
              {selectedBlueprint.fields.map((field) => (
                <DraggableField
                  key={field.id}
                  field={{
                    ...field,
                    value: fieldValues[field.id],
                    position: fieldPositions[field.id] || field.position
                  }}
                  fieldValues={fieldValues}
                  signatures={signatures}
                  onFieldChange={handleFieldChange}
                  onSign={handleSign}
                  onPositionChange={handlePositionChange}
                />
              ))}
            </div>

            {/* Progress indicator */}
            <div style={{ 
              marginTop: "20px",
              padding: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "var(--radius)",
              border: "1px solid var(--gray-200)"
            }}>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: "14px", 
                    color: "var(--gray-600)",
                    marginBottom: "8px"
                  }}>
                    Completion: {completedFields} of {selectedBlueprint.fields.length} fields
                  </div>
                  <div style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "var(--gray-200)",
                    borderRadius: "4px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${(completedFields / selectedBlueprint.fields.length) * 100}%`,
                      height: "100%",
                      backgroundColor: "var(--primary)",
                      borderRadius: "4px",
                      transition: "width 0.3s ease"
                    }} />
                  </div>
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  color: "var(--gray-500)",
                  marginLeft: "20px",
                  textAlign: "right"
                }}>
                  Signatures: {Object.keys(signatures).length}
                </div>
              </div>
            </div>
          </Card>
        ) : (
          // Show placeholder when no blueprint selected
          <Card style={{ 
            backgroundColor: "rgba(249, 250, 251, 0.9)",
            marginBottom: "30px",
            textAlign: "center",
            padding: "60px 20px"
          }}>
            <div style={{ 
              fontSize: "48px",
              marginBottom: "20px",
              opacity: 0.5
            }}>
              📋
            </div>
            <h3 style={{ 
              margin: "0 0 12px 0",
              fontSize: "20px",
              fontWeight: "600",
              color: "var(--gray-700)"
            }}>
              No Template Selected
            </h3>
            <p style={{ 
              margin: "0 auto",
              fontSize: "14px",
              color: "var(--gray-500)",
              maxWidth: "400px",
            }}>
              Select a blueprint template from the dropdown above to start creating your contract.
            </p>
          </Card>
        )}

        {/* Action Buttons */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "20px",
          borderTop: "1px solid var(--gray-200)"
        }}>
          <div style={{ fontSize: "14px", color: "var(--gray-500)" }}>
            {selectedBlueprint ? (
              <>
                📊 Ready to create: <strong>{contractName || "Unnamed Contract"}</strong>
              </>
            ) : (
              "Select a template to begin"
            )}
          </div>
          
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              onClick={() => {
                setContractName("");
                setSelectedBlueprintId("");
                setFieldValues({});
                setSignatures({});
                setFieldPositions({});
              }}
              variant="ghost"
            >
              Reset Form
            </Button>
            <Button
              onClick={handleCreateContract}
              disabled={!contractName || !selectedBlueprintId}
              variant="primary"
              icon="🚀"
              size="lg"
            >
              Create Contract
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}