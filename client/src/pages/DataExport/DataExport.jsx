import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DataTable from "../../components/DataTable/DataTable";
import "./DataExport.css";

function DataExport() {
  const { t } = useTranslation();
  const { entities, columns, loading, error } = useSelector(
    (state) => state.data
  );

  if (error) return <div className="error">{error}</div>;
  if (loading && (!entities || entities.length === 0))
    return (
      <div className="loading-spinner-absolute-center">
        <div className="spinner" />
        <div className="loading-text">{t("Loading...")}</div>
        <style>{`
          .loading-spinner-absolute-center {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            background: transparent;
          }
          .spinner {
            width: 80px;
            height: 80px;
            border: 8px solid #e0e0e0;
            border-top: 8px solid #029e7a;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 24px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .loading-text {
            font-size: 1.5rem;
            color: var(--text-primary, #222);
            font-weight: 600;
            letter-spacing: 0.05em;
          }
        `}</style>
      </div>
    );

  return (
    <div className="home">
      <h1 className="title">{t("Data Export")}</h1>
      <DataTable
        data={entities || []}
        selectedColumns={columns || []}
        loading={loading}
      />
    </div>
  );
}

export default DataExport;
