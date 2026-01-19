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

  const createContract = () => {
    const blueprint = blueprints.find(
      (b: Blueprint) => b.id === selectedBlueprintId
    );

    if (!blueprint || !contractName) return;

    const contract: Contract = {
      id: crypto.randomUUID(),
      name: contractName,
      blueprintId: blueprint.id,
      fields: blueprint.fields.map((f: Field) => ({ ...f })),
      status: "CREATED",
      createdAt: new Date().toISOString(),
    };

    addContract(contract);
    setContractName("");
  };

  return (
    <Card>
    <div style={{ padding: 20 }}>
      <h2>Create Contract</h2>

      <input
        placeholder="Contract name"
        value={contractName}
        onChange={(e) => setContractName(e.target.value)}
      />

      <select
        value={selectedBlueprintId}
        onChange={(e) => setSelectedBlueprintId(e.target.value)}
      >
        <option value="">Select Blueprint</option>

        {blueprints.map((b: Blueprint) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <button onClick={createContract}>Create Contract</button>
    </div>
    </Card>
  );
}
