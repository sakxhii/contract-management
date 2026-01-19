import { useState } from "react";
import BlueprintsPage from "./pages/BlueprintsPage";
import CreateContractPage from "./pages/CreateContractPage";
import ContractsDashboard from "./pages/ContractsDashboard";
import Layout from "./components/Layout";

type View = "blueprint" | "create" | "dashboard";

function App() {
  const [view, setView] = useState<View>("blueprint");

  const buttonStyle = (active: boolean) => ({
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: active ? "#111827" : "#fff",
    color: active ? "#fff" : "#111827",
    cursor: "pointer",
    marginRight: "8px",
  });

  return (
    <Layout>
      {/* Navigation */}
      <div style={{ marginBottom: "24px" }}>
        <button style={buttonStyle(view === "blueprint")} onClick={() => setView("blueprint")}>
          Blueprints
        </button>
        <button style={buttonStyle(view === "create")} onClick={() => setView("create")}>
          Create Contract
        </button>
        <button style={buttonStyle(view === "dashboard")} onClick={() => setView("dashboard")}>
          Dashboard
        </button>
      </div>

      {/* Pages */}
      {view === "blueprint" && <BlueprintsPage />}
      {view === "create" && <CreateContractPage />}
      {view === "dashboard" && <ContractsDashboard />}
    </Layout>
  );
}

export default App;
