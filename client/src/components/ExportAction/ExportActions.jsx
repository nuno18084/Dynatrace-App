import React from "react";
import { FiCheckSquare, FiGrid } from "react-icons/fi";
import "./ExportActions.css";

const ExportActions = ({ selectedRows, onExportSelected, onExportAll }) => {
  return (
    <div className="export-actions">
      <button
        className="export-button"
        onClick={onExportSelected}
        disabled={!selectedRows.length}
        title={
          selectedRows.length
            ? `Export ${selectedRows.length} selected rows`
            : "Select rows to export"
        }
      >
        <FiCheckSquare className="icon" />
        Export Selected
      </button>
      <button
        className="export-button"
        onClick={onExportAll}
        title="Export all visible rows"
      >
        <FiGrid className="icon" />
        Export All
      </button>
    </div>
  );
};

export default ExportActions;
