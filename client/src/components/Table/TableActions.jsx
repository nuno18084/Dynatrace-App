import React from "react";
import { FiCheckSquare, FiGrid } from "react-icons/fi";
import "./TableActions.css";

const TableActions = ({ selectedRows, onExportSelected, onExportAll }) => {
  const handleExportSelected = () => {
    if (selectedRows?.length === 0) {
      alert("Please select rows to export");
      return;
    }
    onExportSelected(selectedRows);
  };

  return (
    <div className="table-actions">
      <button
        className="export-button"
        onClick={handleExportSelected}
        disabled={!selectedRows?.length}
        data-tooltip={
          !selectedRows?.length
            ? "Select rows to export"
            : `Export ${selectedRows.length} selected rows`
        }
      >
        <FiCheckSquare className="icon" />
        <span>Export Selected</span>
      </button>
      <button className="export-button" onClick={onExportAll}>
        <FiGrid className="icon" />
        <span>Export All</span>
      </button>
    </div>
  );
};

export default TableActions;
