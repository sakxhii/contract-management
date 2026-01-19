import { useContracts } from "../context/ContractContext";
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

  const changeStatus = (id: string, nextStatus: ContractStatus) => {
    updateContractStatus(id, nextStatus);
  };

  return (
  <Card>
    <h2>Contracts Dashboard</h2>

    {contracts.length === 0 ? (
      <p style={{ color: "#6b7280" }}>
        No contracts yet. Create a contract to see it here.
      </p>
    ) : (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "16px",
        }}
      >
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Status</th>
            <th align="left">Created</th>
            <th align="left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {contracts.map((c: Contract) => (
            <tr key={c.id} style={{ borderTop: "1px solid #e5e7eb" }}>
              <td>{c.name}</td>
              <td>
                <StatusBadge status={c.status} />
              </td>
              <td>{new Date(c.createdAt).toLocaleDateString()}</td>

              <td>
                {statuses.map((nextStatus) => {
                  const allowed = canTransition(c.status, nextStatus);

                  return (
                    <button
                      key={nextStatus}
                      onClick={() => changeStatus(c.id, nextStatus)}
                      disabled={!allowed}
                      style={{
                        marginRight: "6px",
                        marginBottom: "4px",
                        padding: "6px 10px",
                        fontSize: "12px",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        background: allowed ? "#111827" : "#f3f4f6",
                        color: allowed ? "#fff" : "#9ca3af",
                        cursor: allowed ? "pointer" : "not-allowed",
                      }}
                    >
                      {nextStatus}
                    </button>
                  );
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Card>
);
}
