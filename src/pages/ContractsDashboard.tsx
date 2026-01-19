// src/pages/ContractsDashboard.tsx
import { useContracts } from "../context/ContractContext";
import { useBlueprints } from "../context/BlueprintContext";
import { canTransition } from "../utils/lifecycle";
import type { Contract, ContractStatus } from "../types/contract";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";

const statuses: ContractStatus[] = [
  "CREATED",
  "APPROVED",
  "SENT",
  "SIGNED",
  "LOCKED",
  "REVOKED",
];

export default function ContractsDashboard() {
  const { contracts, updateContractStatus } = useContracts();
  const { blueprints } = useBlueprints();

  const getBlueprintName = (blueprintId: string) => {
    const blueprint = blueprints.find(b => b.id === blueprintId);
    return blueprint ? blueprint.name : "Unknown";
  };

  const changeStatus = (id: string, nextStatus: ContractStatus) => {
    updateContractStatus(id, nextStatus);
  };

  const getAvailableActions = (currentStatus: ContractStatus) => {
    return statuses.filter(status => canTransition(currentStatus, status));
  };

  const viewContract = (contract: Contract) => {
    alert(`Viewing contract: ${contract.name}\nStatus: ${contract.status}\nCreated: ${new Date(contract.createdAt).toLocaleDateString()}`);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <Card>
        <h2 style={{ marginBottom: "20px", color: "#111827" }}>Contracts Dashboard</h2>

        {contracts.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "40px",
            color: "#6b7280" 
          }}>
            <p style={{ fontSize: "16px" }}>
              No contracts yet. Create a contract to see it here.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th align="left" style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", color: "#374151" }}>
                    Contract Name
                  </th>
                  <th align="left" style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", color: "#374151" }}>
                    Blueprint
                  </th>
                  <th align="left" style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", color: "#374151" }}>
                    Status
                  </th>
                  <th align="left" style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", color: "#374151" }}>
                    Created Date
                  </th>
                  <th align="left" style={{ padding: "12px", borderBottom: "2px solid #e5e7eb", color: "#374151" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {contracts.map((c: Contract) => {
                  const availableActions = getAvailableActions(c.status);
                  
                  return (
                    <tr key={c.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "12px", color: "#111827" }}>
                        <div style={{ fontWeight: "500" }}>{c.name}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          ID: {c.id.slice(0, 8)}...
                        </div>
                      </td>
                      <td style={{ padding: "12px", color: "#4b5563" }}>
                        {getBlueprintName(c.blueprintId)}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <StatusBadge status={c.status} />
                      </td>
                      <td style={{ padding: "12px", color: "#6b7280" }}>
                        {new Date(c.createdAt).toLocaleDateString()}
                        <div style={{ fontSize: "12px" }}>
                          {new Date(c.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <button
                            onClick={() => viewContract(c)}
                            style={{
                              padding: "6px 12px",
                              fontSize: "12px",
                              borderRadius: "6px",
                              border: "1px solid #d1d5db",
                              background: "white",
                              color: "#374151",
                              cursor: "pointer"
                            }}
                          >
                            View
                          </button>
                          
                          {availableActions.map((nextStatus) => (
                            <button
                              key={nextStatus}
                              onClick={() => changeStatus(c.id, nextStatus)}
                              style={{
                                padding: "6px 12px",
                                fontSize: "12px",
                                borderRadius: "6px",
                                border: "none",
                                background: "#111827",
                                color: "white",
                                cursor: "pointer"
                              }}
                            >
                              Mark as {nextStatus}
                            </button>
                          ))}
                          
                          {(c.status === "CREATED" || c.status === "SENT") && (
                            <button
                              onClick={() => changeStatus(c.id, "REVOKED")}
                              style={{
                                padding: "6px 12px",
                                fontSize: "12px",
                                borderRadius: "6px",
                                border: "none",
                                background: "#ef4444",
                                color: "white",
                                cursor: "pointer"
                              }}
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {contracts.length > 0 && (
          <div style={{ 
            marginTop: "20px", 
            padding: "12px",
            backgroundColor: "#f9fafb",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#6b7280"
          }}>
            <strong>Summary:</strong> {contracts.length} contract{contracts.length !== 1 ? 's' : ''} total • 
            CREATED: {contracts.filter(c => c.status === "CREATED").length} • 
            APPROVED: {contracts.filter(c => c.status === "APPROVED").length} • 
            SENT: {contracts.filter(c => c.status === "SENT").length} • 
            SIGNED: {contracts.filter(c => c.status === "SIGNED").length}
          </div>
        )}
      </Card>
    </div>
  );
}