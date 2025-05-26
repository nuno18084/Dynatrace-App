import React, { useState } from "react";
import "./DataGovernance.css";
import useDarkMode from "../../Hooks/useDarkMode";

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
        {tab === "quality" && (
          <div className="section-placeholder">
            Data Quality Dashboard (charts, metrics, etc.)
          </div>
        )}
        {tab === "access" && (
          <div className="section-placeholder">
            Access Controls Table (users, roles, permissions)
          </div>
        )}
        {tab === "audit" && (
          <div className="section-placeholder">
            Audit Logs Table (user actions, filters)
          </div>
        )}
        {tab === "retention" && (
          <div className="section-placeholder">
            Retention Policy Editor (editable list/table)
          </div>
        )}
      </div>
    </div>
  );
}

export default DataGovernance;
