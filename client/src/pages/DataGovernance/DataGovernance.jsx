import React, { useState } from "react";
import "./DataGovernance.css";
import useDarkMode from "../../Hooks/useDarkMode";
import DataQualityDashboard from "../../components/DataQualityDashboard/DataQualityDashboard";
import AccessControlsTable from "../../components/DataQualityDashboard/AccessControlsTable";
import AuditLogsTable from "../../components/AuditLogsTable/AuditLogsTable";
import RetentionPolicyEditor from "../../components/RetentionPolicyEditor/RetentionPolicyEditor";

const TABS = [
  { key: "quality", label: "Data Quality" },
  { key: "access", label: "Access Controls" },
  { key: "audit", label: "Audit Logs" },
  { key: "retention", label: "Retention Policies" },
];

function DataGovernance() {
  const [tab, setTab] = useState("quality");
  useDarkMode(); // Just to trigger theme, don't need values here

  return (
    <div className="data-governance-page">
      <h1 className="title">Data Governance</h1>
      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={tab === t.key ? "tab active" : "tab"}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tab === "quality" && <DataQualityDashboard />}
        {tab === "access" && <AccessControlsTable />}
        {tab === "audit" && <AuditLogsTable />}
        {tab === "retention" && <RetentionPolicyEditor />}
      </div>
    </div>
  );
}

export default DataGovernance;
