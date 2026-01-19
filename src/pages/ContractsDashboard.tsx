// src/pages/ContractsDashboard.tsx
import { useState } from "react";
import { useContracts } from "../context/ContractContext";
import { useBlueprints } from "../context/BlueprintContext";
import { canTransition } from "../utils/lifecycle";
import type { Contract, ContractStatus } from "../types/contract";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import Modal from "../components/Modal";

// Define CSS variables if not defined elsewhere
const cssVariables = {
  '--gray-50': '#f9fafb',
  '--gray-100': '#f3f4f6',
  '--gray-200': '#e5e7eb',
  '--gray-300': '#d1d5db',
  '--gray-400': '#9ca3af',
  '--gray-500': '#6b7280',
  '--gray-600': '#4b5563',
  '--gray-700': '#374151',
  '--gray-800': '#1f2937',
  '--gray-900': '#111827',
  '--primary': '#4f46e5',
  '--primary-light': '#e0e7ff',
  '--success': '#10b981',
  '--danger': '#ef4444',
  '--warning': '#f59e0b',
  '--radius': '0.5rem',
  '--radius-sm': '0.375rem',
  '--radius-lg': '1rem',
  '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '--shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  '--shadow-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

export default function ContractsDashboard() {
  const { contracts, updateContractStatus } = useContracts();
  const { blueprints } = useBlueprints();
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBlueprintName = (blueprintId: string) => {
    const blueprint = blueprints.find(b => b.id === blueprintId);
    return blueprint ? blueprint.name : "Unknown Blueprint";
  };

  const viewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const changeStatus = (id: string, nextStatus: ContractStatus) => {
    updateContractStatus(id, nextStatus);
    if (selectedContract?.id === id) {
      setSelectedContract(prev => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  const getAvailableActions = (contract: Contract) => {
    return (['APPROVED', 'SENT', 'SIGNED', 'LOCKED', 'REVOKED'] as ContractStatus[])
      .filter(status => canTransition(contract.status, status));
  };

  const getAvailableActionsForTable = (status: ContractStatus) => {
    return (['APPROVED', 'SENT', 'SIGNED', 'LOCKED', 'REVOKED'] as ContractStatus[])
      .filter(s => canTransition(status, s));
  };

  const renderContractDetails = (contract: Contract) => {
    const blueprint = blueprints.find(b => b.id === contract.blueprintId);
    const availableActions = getAvailableActions(contract);

    return (
      <div>
        {/* Contract Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--gray-200)'
        }}>
          <div>
            <h3 style={{
              margin: '0 0 8px 0',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--gray-900)'
            }}>
              {contract.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <StatusBadge status={contract.status} size="lg" />
              <span style={{
                fontSize: '14px',
                color: 'var(--gray-500)',
                backgroundColor: 'var(--gray-100)',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)'
              }}>
                ID: {contract.id.slice(0, 8)}
              </span>
            </div>
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--gray-500)',
            textAlign: 'right'
          }}>
            <div>Created</div>
            <div style={{ fontWeight: '500', color: 'var(--gray-700)' }}>
              {new Date(contract.createdAt).toLocaleDateString()}
            </div>
            <div style={{ fontSize: '12px' }}>
              {new Date(contract.createdAt).toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Contract Information Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <Card style={{ backgroundColor: 'var(--gray-50)' }}>
            <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px' }}>
              Template
            </div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gray-900)' }}>
              {getBlueprintName(contract.blueprintId)}
            </div>
            {blueprint && (
              <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px' }}>
                {blueprint.fields.length} fields
              </div>
            )}
          </Card>

          <Card style={{ backgroundColor: 'var(--gray-50)' }}>
            <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px' }}>
              Fields Completed
            </div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gray-900)' }}>
              {contract.fields.filter(f => f.value && String(f.value).trim() !== '').length} / {contract.fields.length}
            </div>
            <div style={{ 
              width: '100%', 
              height: '4px',
              backgroundColor: 'var(--gray-200)',
              borderRadius: '2px',
              marginTop: '8px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(contract.fields.filter(f => f.value && String(f.value).trim() !== '').length / contract.fields.length) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--primary)',
                borderRadius: '2px'
              }} />
            </div>
          </Card>

          <Card style={{ backgroundColor: 'var(--gray-50)' }}>
            <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px' }}>
              Current Status
            </div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
              <StatusBadge status={contract.status} />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
              {availableActions.length} possible next actions
            </div>
          </Card>
        </div>

        {/* Contract Fields Preview */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--gray-800)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>📋</span>
            Contract Fields
          </h4>
          <div style={{
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius)',
            padding: '16px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              {contract.fields.map((field) => (
                <div
                  key={field.id}
                  style={{
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--gray-200)',
                    fontSize: '13px'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '4px'
                  }}>
                    <span style={{ fontWeight: '500', color: 'var(--gray-700)' }}>
                      {field.label}
                    </span>
                    <span style={{ 
                      fontSize: '10px', 
                      color: 'var(--gray-400)',
                      backgroundColor: 'var(--gray-100)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {field.type}
                    </span>
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: field.value ? 'var(--gray-900)' : 'var(--gray-400)',
                    fontStyle: field.value ? 'normal' : 'italic'
                  }}>
                    {field.value ? String(field.value) : 'Not filled'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div>
          <h4 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--gray-800)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚡</span>
            Available Actions
          </h4>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px'
          }}>
            {availableActions.map((action) => (
              <Button
                key={action}
                onClick={() => changeStatus(contract.id, action)}
                variant={
                  action === 'REVOKED' ? 'danger' : 
                  action === 'SIGNED' ? 'success' : 'primary'
                }
                icon={
                  action === 'APPROVED' ? '✅' :
                  action === 'SENT' ? '📤' :
                  action === 'SIGNED' ? '✍️' :
                  action === 'LOCKED' ? '🔒' :
                  '🚫'
                }
              >
                {action === 'REVOKED' ? 'Revoke Contract' : `Mark as ${action}`}
              </Button>
            ))}
          </div>

          {/* Status Explanation */}
          <div style={{
            fontSize: '12px',
            color: 'var(--gray-500)',
            padding: '12px',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius)',
            borderLeft: '3px solid var(--primary)'
          }}>
            <strong>Note:</strong> {contract.status === 'LOCKED' 
              ? 'This contract is locked and cannot be modified.'
              : contract.status === 'REVOKED'
              ? 'This contract has been revoked and cannot proceed further.'
              : 'You can update the contract status using the buttons above.'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
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
                    const availableActions = getAvailableActionsForTable(c.status);
                    
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
                              👁️ View
                            </button>
                            
                            {availableActions.map((action) => (
                              <button
                                key={action}
                                onClick={() => updateContractStatus(c.id, action)}
                                style={{
                                  padding: "6px 12px",
                                  fontSize: "12px",
                                  borderRadius: "6px",
                                  border: "none",
                                  background: 
                                    action === 'REVOKED' ? '#ef4444' :
                                    action === 'SIGNED' ? '#10b981' :
                                    '#111827',
                                  color: "white",
                                  cursor: "pointer"
                                }}
                              >
                                {action === 'REVOKED' ? 'Revoke' : action}
                              </button>
                              
                            ))}
                            
                
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
              SIGNED: {contracts.filter(c => c.status === "SIGNED").length} • 
              LOCKED: {contracts.filter(c => c.status === "LOCKED").length} • 
              REVOKED: {contracts.filter(c => c.status === "REVOKED").length}
            </div>
          )}
        </Card>
      </div>

      {/* Contract View Modal */}
      {selectedContract && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Contract: ${selectedContract.name}`}
          size="lg"
        >
          {renderContractDetails(selectedContract)}
        </Modal>
      )}
    </>
  );
}