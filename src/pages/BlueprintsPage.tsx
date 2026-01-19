// src/pages/BlueprintsPage.tsx
import { useState } from "react";
import { useBlueprints } from "../context/BlueprintContext";
import type { Blueprint, FieldType, Field } from "../types/blueprint";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";


const fieldTypes: { value: FieldType; label: string; icon: string }[] = [
  { value: "text", label: "Text Field", icon: "✏️" },
  { value: "number", label: "Number", icon: "🔢" },
  { value: "date", label: "Date Picker", icon: "📅" },
  { value: "signature", label: "Signature", icon: "✍️" },
  { value: "checkbox", label: "Checkbox", icon: "☑️" },
  { value: "dropdown", label: "Dropdown", icon: "⬇️" },
  { value: "textarea", label: "Text Area", icon: "📝" },
];

export default function BlueprintsPage() {
  const { addBlueprint, blueprints } = useBlueprints();

  const [name, setName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState<FieldType>("text");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  
  // Additional state for field-specific settings
  const [numberSettings, setNumberSettings] = useState({ min: 0, max: 100, step: 1 });
  const [dateSettings, setDateSettings] = useState({ format: "MM/DD/YYYY", minDate: "", maxDate: "" });
  const [dropdownOptions, setDropdownOptions] = useState<string[]>(["Option 1", "Option 2"]);
  const [newOption, setNewOption] = useState("");

  // Function to get field preview content
  const getFieldPreview = (fieldType: FieldType, fieldLabel: string) => {
    switch (fieldType) {
      case "text":
        return `✏️ ${fieldLabel || "Text field"}`;
      case "number":
        return `🔢 ${fieldLabel || "Number"} (${numberSettings.min}-${numberSettings.max})`;
      case "date":
        return `📅 ${fieldLabel || "Date"} [${dateSettings.format}]`;
      case "signature":
        return "✍️ _______________ (Signature)";
      case "checkbox":
        return "☑️ [ ] Checkbox";
      case "dropdown":
        return `⬇️ ${fieldLabel || "Select"} [${dropdownOptions.length} options]`;
      case "textarea":
        return "📝 [Text Area - Multiple lines]";
      default:
        return `${fieldLabel || "Field"}`;
    }
  };

  const addField = () => {
    if (!label) return;

    // Prepare additional settings based on field type
    const additionalSettings: any = {};
    if (type === "number") additionalSettings.numberSettings = { ...numberSettings };
    if (type === "date") additionalSettings.dateSettings = { ...dateSettings };
    if (type === "dropdown") additionalSettings.options = [...dropdownOptions];

    const newField: Field = {
      id: crypto.randomUUID(),
      label,
      type,
      position: { x, y },
      ...additionalSettings
    };

    setFields(prev => [...prev, newField]);
    
    // Reset form
    setLabel("");
    setX(0);
    setY(0);
    setNumberSettings({ min: 0, max: 100, step: 1 });
    setDateSettings({ format: "MM/DD/YYYY", minDate: "", maxDate: "" });
    setDropdownOptions(["Option 1", "Option 2"]);
    setNewOption("");
  };

  const removeField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
  };

  const addDropdownOption = () => {
    if (newOption.trim()) {
      setDropdownOptions([...dropdownOptions, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeDropdownOption = (index: number) => {
    setDropdownOptions(dropdownOptions.filter((_, i) => i !== index));
  };

  const saveBlueprint = () => {
    if (!name || fields.length === 0) return;

    const blueprint: Blueprint = {
      id: crypto.randomUUID(),
      name,
      fields: fields.map(f => ({ ...f }))
    };

    addBlueprint(blueprint);
    setName("");
    setFields([]);
  };

  return (
    <div style={{ 
      maxWidth: "1400px", 
      margin: "0 auto", 
      padding: "20px",
      minHeight: "100vh" 
    }}>
      {/* Main Grid Layout */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "30px",
        width: "100%"
      }}>
        
        {/* Left Column - Create Blueprint */}
        <div>
          <Card 
            title="Create New Blueprint" 
            subtitle="Design reusable contract templates"
            gradient
            hoverable
            style={{ height: "100%" }}
          >
            <Input
              label="Blueprint Name"
              placeholder="Enter a descriptive name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon="📄"
              style={{ marginBottom: "20px" }}
            />

            <Card style={{ 
              backgroundColor: "rgba(249, 250, 251, 0.8)", 
              marginBottom: "20px",
              padding: "20px"
            }}>
              <h3 style={{ 
                margin: "0 0 16px 0", 
                fontSize: "16px", 
                fontWeight: "600",
                color: "var(--gray-700)" 
              }}>
                Add Field Configuration
              </h3>
              
              <div style={{ 
                display: "flex", 
                flexDirection: "column",
                gap: "12px",
                marginBottom: "16px"
              }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="Field label"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      icon="🏷️"
                    />
                  </div>
                  
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value as FieldType)}
                    style={{
                      padding: "12px",
                      border: "1px solid var(--gray-300)",
                      borderRadius: "var(--radius)",
                      fontSize: "14px",
                      color: "var(--gray-800)",
                      backgroundColor: "white",
                      minWidth: "140px",
                      cursor: "pointer"
                    }}
                  >
                    {fieldTypes.map(({ value, label, icon }) => (
                      <option key={value} value={value}>
                        {icon} {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional Settings Based on Field Type */}
                {type === "number" && (
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr 1fr", 
                    gap: "12px",
                    marginTop: "12px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                    padding: "16px",
                    borderRadius: "var(--radius)"
                  }}>
                    <Input
                      label="Min Value"
                      type="number"
                      value={numberSettings.min}
                      onChange={(e) => setNumberSettings({...numberSettings, min: Number(e.target.value)})}
                      icon="↘️"
                    />
                    <Input
                      label="Max Value"
                      type="number"
                      value={numberSettings.max}
                      onChange={(e) => setNumberSettings({...numberSettings, max: Number(e.target.value)})}
                      icon="↗️"
                    />
                    <Input
                      label="Step"
                      type="number"
                      value={numberSettings.step}
                      onChange={(e) => setNumberSettings({...numberSettings, step: Number(e.target.value)})}
                      icon="↕️"
                    />
                  </div>
                )}

                {type === "date" && (
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr 1fr", 
                    gap: "12px",
                    marginTop: "12px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                    padding: "16px",
                    borderRadius: "var(--radius)"
                  }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "var(--gray-600)", marginBottom: "4px", display: "block" }}>
                        Date Format
                      </label>
                      <select 
                        value={dateSettings.format}
                        onChange={(e) => setDateSettings({...dateSettings, format: e.target.value})}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid var(--gray-300)",
                          borderRadius: "var(--radius)",
                          fontSize: "14px",
                        }}
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="Month D, YYYY">Month D, YYYY</option>
                      </select>
                    </div>
                    <Input
                      label="Min Date"
                      type="date"
                      value={dateSettings.minDate}
                      onChange={(e) => setDateSettings({...dateSettings, minDate: e.target.value})}
                    />
                    <Input
                      label="Max Date"
                      type="date"
                      value={dateSettings.maxDate}
                      onChange={(e) => setDateSettings({...dateSettings, maxDate: e.target.value})}
                    />
                  </div>
                )}

                {type === "dropdown" && (
                  <div style={{ 
                    marginTop: "12px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                    padding: "16px",
                    borderRadius: "var(--radius)"
                  }}>
                    <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                      <Input
                        placeholder="Add new option"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <Button
                        onClick={addDropdownOption}
                        icon="➕"
                        variant="ghost"
                        style={{ minWidth: "80px" }}
                      >
                        Add
                      </Button>
                    </div>
                    
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {dropdownOptions.map((option, index) => (
                        <div key={index} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 12px",
                          backgroundColor: "white",
                          border: "1px solid var(--gray-200)",
                          borderRadius: "6px",
                          marginBottom: "6px"
                        }}>
                          <span>{option}</span>
                          <button
                            onClick={() => removeDropdownOption(index)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--danger)",
                              cursor: "pointer",
                              fontSize: "14px",
                              padding: "2px 6px"
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
                
              <Button
                onClick={addField}
                icon="➕"
                style={{ width: "100%" }}
                disabled={!label}
              >
                Add Field
              </Button>
            </Card>

            {fields.length > 0 && (
              <Card style={{ marginBottom: "20px" }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px"
                }}>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "var(--gray-700)" }}>
                    Field Preview ({fields.length})
                  </h3>
                  <span style={{ 
                    fontSize: "12px", 
                    color: "var(--gray-500)",
                    backgroundColor: "var(--gray-100)",
                    padding: "4px 8px",
                    borderRadius: "var(--radius-sm)"
                  }}>
                    Drag to reposition
                  </span>
                </div>
                
                <div style={{ 
                  position: "relative", 
                  minHeight: "300px", 
                  border: "2px dashed var(--gray-300)",
                  borderRadius: "var(--radius)",
                  backgroundColor: "var(--gray-50)",
                  padding: "20px"
                }}>
                  {fields.map(field => (
                    <div
                      key={field.id}
                      style={{
                        position: "absolute",
                        left: `${field.position.x}px`,
                        top: `${field.position.y}px`,
                        padding: "12px 16px",
                        backgroundColor: "white",
                        border: "2px solid var(--primary-light)",
                        borderRadius: "var(--radius)",
                        fontSize: "14px",
                        cursor: "grab",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        boxShadow: "var(--shadow-sm)",
                        transition: "all 0.2s ease",
                        minWidth: "180px"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "var(--shadow-md)";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <span>{fieldTypes.find(ft => ft.value === field.type)?.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "500", marginBottom: "2px" }}>{field.label}</div>
                        <div style={{ 
                          fontSize: "12px", 
                          color: "var(--gray-500)",
                        }}>
                          {field.type} • ({field.position.x}, {field.position.y})
                        </div>
                      </div>
                      <button
                        onClick={() => removeField(field.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--danger)",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "4px",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "24px",
                          height: "24px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--gray-100)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" }}>
              <Button
                onClick={() => {
                  setName("");
                  setFields([]);
                }}
                variant="ghost"
              >
                Clear All
              </Button>
              <Button
                onClick={saveBlueprint}
                disabled={!name || fields.length === 0}
                icon="💾"
                variant="primary"
              >
                Save Blueprint
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Blueprint Library */}
        <div>
          <Card 
            title="Blueprint Library" 
            subtitle={`${blueprints.length} template${blueprints.length !== 1 ? 's' : ''} available`}
            hoverable
            style={{ height: "100%" }}
          >
            {blueprints.length === 0 ? (
              <div style={{ 
                textAlign: "center", 
                padding: "60px 20px",
                color: "var(--gray-400)"
              }}>
                <div style={{ 
                  fontSize: "48px",
                  marginBottom: "16px",
                  opacity: 0.5
                }}>
                  📋
                </div>
                <h3 style={{ 
                  margin: "0 0 8px 0",
                  color: "var(--gray-600)",
                  fontSize: "18px",
                  fontWeight: "600"
                }}>
                  No blueprints yet
                </h3>
                <p style={{ 
                  margin: 0,
                  color: "var(--gray-500)",
                  fontSize: "14px"
                }}>
                  Create your first blueprint to get started
                </p>
              </div>
            ) : (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
                maxHeight: "70vh",
                overflowY: "auto",
                paddingRight: "10px"
              }}>
                {blueprints.map((blueprint: Blueprint) => (
                  <div
                    key={blueprint.id}
                    style={{
                      background: "white",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--gray-200)",
                      padding: "20px",
                      transition: "all 0.3s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "16px"
                    }}>
                      <div>
                        <h4 style={{ 
                          margin: "0 0 4px 0", 
                          fontSize: "16px", 
                          fontWeight: "600",
                          color: "var(--gray-900)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}>
                          <span>📄</span>
                          {blueprint.name}
                        </h4>
                        <p style={{ 
                          margin: 0, 
                          fontSize: "12px", 
                          color: "var(--gray-500)"
                        }}>
                          {blueprint.fields.length} field{blueprint.fields.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <span style={{ 
                        fontSize: "10px", 
                        color: "var(--gray-400)",
                        backgroundColor: "var(--gray-100)",
                        padding: "4px 8px",
                        borderRadius: "var(--radius-sm)"
                      }}>
                        ID: {blueprint.id.slice(0, 8)}
                      </span>
                    </div>
                    
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "20px"
                    }}>
                      {blueprint.fields.slice(0, 4).map(f => (
                        <span
                          key={f.id}
                          style={{
                            fontSize: "11px",
                            backgroundColor: "var(--gray-100)",
                            padding: "4px 8px",
                            borderRadius: "var(--radius-sm)",
                            color: "var(--gray-700)",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <span>{fieldTypes.find(ft => ft.value === f.type)?.icon}</span>
                          {f.label}
                        </span>
                      ))}
                      {blueprint.fields.length > 4 && (
                        <span style={{
                          fontSize: "11px",
                          backgroundColor: "var(--gray-100)",
                          padding: "4px 8px",
                          borderRadius: "var(--radius-sm)",
                          color: "var(--gray-500)"
                        }}>
                          +{blueprint.fields.length - 4} more
                        </span>
                      )}
                    </div>
                    
                    <div style={{ 
                      fontSize: "11px", 
                      color: "var(--gray-400)",
                      borderTop: "1px solid var(--gray-100)",
                      paddingTop: "12px",
                      display: "flex",
                      justifyContent: "space-between"
                    }}>
                      <span>Created template</span>
                      <span>Click to use</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}