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
