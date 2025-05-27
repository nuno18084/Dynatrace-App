import React, { useState, useRef, useEffect } from "react";
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
  loading,
}) => {
  const { setSearchQuery, filteredData } = useTableSearch(
    data,
    selectedColumns
  );
  const { selectedRows, handleRowSelect, handleSelectAll, isSelected } =
    useTableSelection();
  const { handleExport } = useCSVExport();
  const [isSearching, setIsSearching] = useState(false);

  // Create refs for intersection observer
  const loadingRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "150px", // Trigger a bit earlier before reaching bottom
      threshold: 0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading && !isSearching) {
        console.log("Near bottom, loading more data");
        onLoadMore();
      }
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    // Only observe if we have data and there's more to load
    if (loadingRef.current && hasMore && !isSearching) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, onLoadMore, isSearching]);

  const handleSearch = (query) => {
    setIsSearching(!!query);
    setSearchQuery(query);
  };

  const handleExportSelected = () => {
    handleExport(selectedRows, selectedColumns, "selected_data.csv");
  };

  const handleExportAll = () => {
    handleExport(filteredData, selectedColumns, "all_data.csv");
  };

  console.log("DataTable render:", {
    dataLength: data.length,
    filteredDataLength: filteredData.length,
    hasMore,
    isSearching,
    loading,
  });

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
                  id="select-all-rows"
                  name="select-all-rows"
                  onChange={(e) =>
                    handleSelectAll(e.target.checked ? filteredData : [])
                  }
                  checked={selectedRows.length === filteredData.length}
                />
                <label htmlFor="select-all-rows" className="visually-hidden">
                  Select all rows
                </label>
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
                    id={`select-row-${item.entityId || index}`}
                    name={`select-row-${item.entityId || index}`}
                    checked={isSelected(item.entityId)}
                    onChange={() => handleRowSelect(item)}
                  />
                  <label
                    htmlFor={`select-row-${item.entityId || index}`}
                    className="visually-hidden"
                  >
                    Select row {item.entityId || index}
                  </label>
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
        {/* Invisible element for intersection observer */}
        <div ref={loadingRef} style={{ height: "1px" }} />
        {/* Only show loading indicator when actually loading */}
        {loading && (
          <div className="loading-indicator">Loading more data...</div>
        )}
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
