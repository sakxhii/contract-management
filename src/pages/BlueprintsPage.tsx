import { useState } from "react";
import { useBlueprints } from "../context/BlueprintContext";
import type { Blueprint, FieldType } from "../types/blueprint";
import Card from "../components/Card";


const fieldTypes: FieldType[] = ["text", "date", "signature", "checkbox"];

export default function BlueprintsPage() {
  const { addBlueprint, blueprints } = useBlueprints();

  const [name, setName] = useState("");
  const [fields, setFields] = useState<any[]>([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState<FieldType>("text");

  const addField = () => {
    if (!label) return;

    setFields(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label,
        type,
        position: { x: 0, y: prev.length * 40 }
      }
    ]);

    setLabel("");
  };

  const saveBlueprint = () => {
    if (!name || fields.length === 0) return;

    const blueprint: Blueprint = {
      id: crypto.randomUUID(),
      name,
      fields
    };

    addBlueprint(blueprint);
    setName("");
    setFields([]);
  };

  return (
    <Card>
    <div style={{ padding: 20 }}>
      <h2>Create Blueprint</h2>

      <input
        placeholder="Blueprint name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <input
          placeholder="Field label"
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value as FieldType)}>
          {fieldTypes.map(t => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <button onClick={addField}>Add Field</button>
      </div>

      <ul>
        {fields.map(f => (
          <li key={f.id}>
            {f.label} ({f.type})
          </li>
        ))}
      </ul>

      <button onClick={saveBlueprint}>Save Blueprint</button>

      <hr />

      <h3>Saved Blueprints</h3>
      <ul>
        {blueprints.map((b: Blueprint) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
    </Card>
  );
}
