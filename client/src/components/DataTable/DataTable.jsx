import React, { useRef, useEffect, useState, useMemo } from "react";
import "./DataTable.css";
import TableActions from "../Table/TableActions";
import SearchBar from "../SearchBar/SearchBar";

const DataTable = ({
  data = [],
  selectedColumns = [],
  onLoadMore,
  hasMore,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const observerTarget = useRef(null);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter((item) => {
      return selectedColumns.some((col) => {
        const value = item[col];
        if (value == null) return false;

        if (typeof value === "object") {
          return JSON.stringify(value)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }

        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [data, searchQuery, selectedColumns]);

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

  const handleRowSelect = (item) => {
    setSelectedRows((prev) => {
      const itemId = item.entityId;
      if (prev.find((row) => row.entityId === itemId)) {
        return prev.filter((row) => row.entityId !== itemId);
      }
      return [...prev, item];
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleExportSelected = (selectedData) => {
    const csvContent = generateCSV(selectedData, selectedColumns);
    downloadCSV(csvContent, "selected_data.csv");
  };

  const handleExportAll = () => {
    const csvContent = generateCSV(filteredData, selectedColumns);
    downloadCSV(csvContent, "all_data.csv");
  };

  const generateCSV = (dataToExport, columns) => {
    const header = columns.join(",");
    const rows = dataToExport.map((item) =>
      columns
        .map((col) => {
          const value = item[col];
          if (typeof value === "object") {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          return `"${value}"`;
        })
        .join(",")
    );
    return [header, ...rows].join("\n");
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
                    setSelectedRows(e.target.checked ? filteredData : [])
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
                className={
                  selectedRows.find((row) => row.entityId === item.entityId)
                    ? "selected"
                    : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={
                      !!selectedRows.find(
                        (row) => row.entityId === item.entityId
                      )
                    }
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
      <TableActions
        selectedRows={selectedRows}
        onExportSelected={handleExportSelected}
        onExportAll={handleExportAll}
      />
    </div>
  );
};

export default DataTable;
