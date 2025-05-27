import React from "react";
import { FiCheckSquare, FiGrid } from "react-icons/fi";
import "./ExportActions.css";
import { useTranslation } from "react-i18next";

const ExportActions = ({ selectedRows, onExportSelected, onExportAll }) => {
  const { t } = useTranslation();
  return (
    <div className="export-actions">
      <button
        className="export-button"
        onClick={onExportSelected}
        disabled={!selectedRows.length}
        title={
          selectedRows.length
            ? t("Export Selected")
            : t("Select rows to export")
        }
      >
        <FiCheckSquare className="icon" />
        {t("Export Selected")}
      </button>
      <button
        className="export-button"
        onClick={onExportAll}
        title={t("Export all visible rows")}
      >
        <FiGrid className="icon" />
        {t("Export All")}
      </button>
    </div>
  );
};

export default ExportActions;
