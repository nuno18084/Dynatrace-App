import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./DataGovernance.css";
import useDarkMode from "../../Hooks/useDarkMode";
import DataQualityDashboard from "../../components/DataQualityDashboard/DataQualityDashboard";
import AccessControlsTable from "../../components/AccessControlsTable/AccessControlsTable";
import AuditLogsTable from "../../components/AuditLogsTable/AuditLogsTable";
import RetentionPolicyEditor from "../../components/RetentionPolicyEditor/RetentionPolicyEditor";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoToCharts = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/charts");
    }, 700);
  };

  return (
    <div className="data-governance-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="title">{t("Data Governance")}</h1>
        <Button
          text="Charts"
          color="#029e7a"
          onClick={handleGoToCharts}
          loading={loading}
        />
      </div>
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
