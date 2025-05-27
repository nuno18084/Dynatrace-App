import React from "react";
import "./DataTable.css";
import ExportActions from "../ExportAction/ExportActions";
import SearchBar from "../SearchBar/SearchBar";
import { useTableSearch } from "../../Hooks/useTableSearch";
import { useTableSelection } from "../../Hooks/useTableSelection";
import { useCSVExport } from "../../Hooks/useCSVExport";
import { useTranslation } from "react-i18next";

const DataTable = ({ data = [], selectedColumns = [], loading = false }) => {
  const { t } = useTranslation();
  const { setSearchQuery, filteredData } = useTableSearch(
    data,
    selectedColumns
  );
  const { selectedRows, handleRowSelect, handleSelectAll, isSelected } =
    useTableSelection();
  const { handleExport } = useCSVExport();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleExportSelected = () => {
    handleExport(selectedRows, selectedColumns, "selected_data.csv");
  };

  const handleExportAll = () => {
    handleExport(filteredData, selectedColumns, "all_data.csv");
  };

  // Always render the table, even if columns are empty
  const showSpinnerRow = loading;
  const showNoDataRow = !loading && filteredData.length === 0;
  const columnsToRender =
    selectedColumns && selectedColumns.length > 0
      ? selectedColumns
      : [t("Column")];
  const MIN_ROWS = 8;

  return (
    <div className="table-container">
      <SearchBar onSearch={handleSearch} />
      <div className="table-wrapper">
        <table className={loading ? "loading-table" : ""}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="select-all-rows"
                  name="select-all-rows"
                  onChange={(e) =>
                    handleSelectAll(e.target.checked ? filteredData : [])
                  }
                  checked={
                    selectedRows.length === filteredData.length &&
                    filteredData.length > 0
                  }
                  disabled={filteredData.length === 0}
                />
                <label htmlFor="select-all-rows" className="visually-hidden">
                  {t("Select all rows")}
                </label>
              </th>
              {columnsToRender.map((col, idx) => (
                <th key={col + idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {showSpinnerRow ? (
              <tr>
                <td
                  colSpan={columnsToRender.length + 1}
                  style={{ minHeight: "600px", padding: 0 }}
                >
                  <div className="loading-spinner-absolute-center">
                    <div className="spinner" />
                    <div className="loading-text">{t("Loading...")}</div>
                    <style>{`
                      .loading-spinner-absolute-center {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 600px;
                        width: 100%;
                      }
                      .spinner {
                        width: 64px;
                        height: 64px;
                        border: 7px solid #e0e0e0;
                        border-top: 7px solid #029e7a;
                        border-radius: 50% !important;
                        animation: spin 1s linear infinite;
                        margin-bottom: 18px;
                        box-sizing: border-box;
                        display: block;
                      }
                      @keyframes spin {
                        to { transform: rotate(360deg); }
                      }
                      .loading-text {
                        font-size: 1.2rem;
                        color: var(--text-primary, #222);
                        font-weight: 500;
                      }
                    `}</style>
                  </div>
                </td>
              </tr>
            ) : showNoDataRow ? (
              <tr>
                <td colSpan={columnsToRender.length + 1}>
                  {t("No data available")}
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr
                  key={item.entityId || index}
                  className={isSelected(item.entityId) ? "selected" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      id={`select-row-${item.entityId || index}`}
                      name={`select-row-${item.entityId || index}`}
                      checked={isSelected(item.entityId)}
                      onChange={() => handleRowSelect(item)}
                    />
                    <label
                      htmlFor={`select-row-${item.entityId || index}`}
                      className="visually-hidden"
                    >
                      {t("Select row", { index: item.entityId || index })}
                    </label>
                  </td>
                  {selectedColumns && selectedColumns.length > 0 ? (
                    selectedColumns.map((col) => {
                      let value = item[col];

                      if (
                        col === "firstSeenTimestamp" ||
                        col === "lastSeenTimestamp"
                      ) {
                        value = new Date(value).toLocaleString();
                      }

                      if (col === "fromRelationships" && value) {
                        return (
                          <td key={col}>
                            {Object.keys(value).map((k) => (
                              <div key={k}>
                                {k}: {JSON.stringify(value[k])}
                              </div>
                            ))}
                          </td>
                        );
                      }

                      if (col === "properties" && value) {
                        return (
                          <td key={col}>
                            {Object.keys(value).map((k) => (
                              <div key={k}>
                                {k}: {JSON.stringify(value[k])}
                              </div>
                            ))}
                          </td>
                        );
                      }

                      if (col === "tags" && Array.isArray(value)) {
                        return (
                          <td key={col}>
                            {value.map((tag, i) => (
                              <div key={i}>
                                {tag.key}: {tag.value}
                              </div>
                            ))}
                          </td>
                        );
                      }

                      return (
                        <td key={col}>
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : value}
                        </td>
                      );
                    })
                  ) : (
                    <td>{""}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ExportActions
        selectedRows={selectedRows}
        onExportSelected={handleExportSelected}
        onExportAll={handleExportAll}
      />
    </div>
  );
};

export default DataTable;
