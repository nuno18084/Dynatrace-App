import React from "react";
import "./DataTable.css";

const DataTable = ({ data = [], selectedColumns = [] }) => {
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
      <table>
        <thead>
          <tr>
            {selectedColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
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
                    {typeof value === "object" ? JSON.stringify(value) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
