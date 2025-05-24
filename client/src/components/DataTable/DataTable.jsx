import React, { useRef, useEffect } from "react";
import "./DataTable.css";
import ExportActions from "../ExportAction/ExportActions";
import SearchBar from "../SearchBar/SearchBar";
import { useTableSearch } from "../../Hooks/useTableSearch";
import { useTableSelection } from "../../Hooks/useTableSelection";
import { useCSVExport } from "../../Hooks/useCSVExport";

const DataTable = ({
  data = [],
  selectedColumns = [],
  onLoadMore,
  hasMore,
}) => {
  const { setSearchQuery, filteredData } = useTableSearch(
    data,
    selectedColumns
  );
  const { selectedRows, handleRowSelect, handleSelectAll, isSelected } =
    useTableSelection();
  const { handleExport } = useCSVExport();
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [onLoadMore, hasMore]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleExportSelected = () => {
    handleExport(selectedRows, selectedColumns, "selected_data.csv");
  };

  const handleExportAll = () => {
    handleExport(filteredData, selectedColumns, "all_data.csv");
  };

  if (
    !data ||
    !selectedColumns ||
    data.length === 0 ||
    selectedColumns.length === 0
  ) {
    return (
      <div className="table-container">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <SearchBar onSearch={handleSearch} />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleSelectAll(e.target.checked ? filteredData : [])
                  }
                  checked={selectedRows.length === filteredData.length}
                />
              </th>
              {selectedColumns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item.entityId || index}
                className={isSelected(item.entityId) ? "selected" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected(item.entityId)}
                    onChange={() => handleRowSelect(item)}
                  />
                </td>
                {selectedColumns.map((col) => {
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
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={observerTarget} className="loading-more">
          {hasMore ? "Loading data..." : "No more data"}
        </div>
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
