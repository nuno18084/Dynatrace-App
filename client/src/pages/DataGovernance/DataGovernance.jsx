import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./DataGovernance.css";
import useDarkMode from "../../Hooks/useDarkMode";
import DataQualityDashboard from "../../components/DataQualityDashboard/DataQualityDashboard";
import AccessControlsTable from "../../components/AccessControlsTable/AccessControlsTable";
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
  const { t } = useTranslation();

  return (
    <div className="data-governance-page">
      <h1 className="title">{t("Data Governance")}</h1>
      <div className="tabs">
        {TABS.map((tObj) => (
          <button
            key={tObj.key}
            className={tab === tObj.key ? "tab active" : "tab"}
            onClick={() => setTab(tObj.key)}
          >
            {t(tObj.label)}
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
