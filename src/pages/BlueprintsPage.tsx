// src/pages/BlueprintsPage.tsx
import { useState } from "react";
import { useBlueprints } from "../context/BlueprintContext";
import type { Blueprint, FieldType, Field } from "../types/blueprint";
import Card from "../components/Card";

const fieldTypes: FieldType[] = ["text", "date", "signature", "checkbox"];

export default function BlueprintsPage() {
  const { addBlueprint, blueprints } = useBlueprints();

  const [name, setName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState<FieldType>("text");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const addField = () => {
    if (!label) return;

    const newField: Field = {
      id: crypto.randomUUID(),
      label,
      type,
      position: { x, y }
    };

    setFields(prev => [...prev, newField]);
    setLabel("");
    setX(0);
    setY(0);
  };

  const removeField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Card>
        <h2 style={{ marginBottom: "20px", color: "#111827" }}>Create Blueprint</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Blueprint name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              marginBottom: "10px"
            }}
          />
        </div>

        <Card style={{ backgroundColor: "#f9fafb" }}>
          <h3 style={{ marginBottom: "16px", color: "#374151" }}>Add Field</h3>
          
          <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <input
              placeholder="Field label"
              value={label}
              onChange={e => setLabel(e.target.value)}
              style={{
                padding: "8px",
                border: "1px solid #d1d5db",
                borderRadius: "6px"
              }}
            />
            
            <select 
              value={type} 
              onChange={e => setType(e.target.value as FieldType)}
              style={{
                padding: "8px",
                border: "1px solid #d1d5db",
                borderRadius: "6px"
              }}
            >
              {fieldTypes.map(t => (
                <option key={t} value={t}>{t.toUpperCase()}</option>
              ))}
            </select>
            
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="number"
                placeholder="X"
                value={x}
                onChange={e => setX(parseInt(e.target.value) || 0)}
                style={{
                  width: "60px",
                  padding: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px"
                }}
              />
              <input
                type="number"
                placeholder="Y"
                value={y}
                onChange={e => setY(parseInt(e.target.value) || 0)}
                style={{
                  width: "60px",
                  padding: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px"
                }}
              />
            </div>
            
            <button
              onClick={addField}
              style={{
                padding: "8px 16px",
                backgroundColor: "#111827",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Add Field
            </button>
          </div>
        </Card>

        {fields.length > 0 && (
          <Card style={{ marginTop: "20px" }}>
            <h3 style={{ marginBottom: "16px", color: "#374151" }}>Added Fields ({fields.length})</h3>
            <div style={{ 
              position: "relative", 
              minHeight: "200px", 
              border: "1px dashed #d1d5db",
              borderRadius: "8px",
              backgroundColor: "#f8fafc"
            }}>
              {fields.map(field => (
                <div
                  key={field.id}
                  style={{
                    position: "absolute",
                    left: `${field.position.x}px`,
                    top: `${field.position.y}px`,
                    padding: "8px 12px",
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "4px",
                    fontSize: "14px",
                    cursor: "move",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>{field.label}</span>
                  <span style={{ 
                    fontSize: "12px", 
                    color: "#6b7280",
                    backgroundColor: "#f3f4f6",
                    padding: "2px 6px",
                    borderRadius: "4px"
                  }}>
                    {field.type}
                  </span>
                  <button
                    onClick={() => removeField(field.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={saveBlueprint}
            disabled={!name || fields.length === 0}
            style={{
              padding: "10px 20px",
              backgroundColor: (!name || fields.length === 0) ? "#9ca3af" : "#111827",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: (!name || fields.length === 0) ? "not-allowed" : "pointer"
            }}
          >
            Save Blueprint
          </button>
        </div>
      </Card>

      <Card style={{ marginTop: "20px" }}>
        <h2 style={{ marginBottom: "20px", color: "#111827" }}>Saved Blueprints</h2>
        {blueprints.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No blueprints created yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "12px" }}>
            {blueprints.map((b: Blueprint) => (
              <div
                key={b.id}
                style={{
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  backgroundColor: "#f9fafb"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: 0, color: "#111827" }}>{b.name}</h4>
                    <p style={{ margin: "4px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                      {b.fields.length} field{b.fields.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    ID: {b.id.slice(0, 8)}...
                  </div>
                </div>
                <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {b.fields.map(f => (
                    <span
                      key={f.id}
                      style={{
                        fontSize: "12px",
                        backgroundColor: "#e5e7eb",
                        padding: "4px 8px",
                        borderRadius: "4px"
                      }}
                    >
                      {f.label} ({f.type})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}