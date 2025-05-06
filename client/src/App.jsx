import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Importa o CSS

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/data");
        const entities = response.data.entities;
        setData(entities);
        setLoading(false);

        if (entities && entities.length > 0) {
          const dynamicHeaders = Object.keys(entities[0]);
          setHeaders(dynamicHeaders);
          setSelectedColumns(dynamicHeaders); // Select all by default
        }
      } catch (err) {
        setError("Erro ao carregar dados", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleColumnSelect = (column) => {
    setSelectedColumns((prev) => {
      // Se a coluna já está selecionada, remove-a, mantendo a ordem original
      if (prev.includes(column)) {
        return prev.filter((col) => col !== column);
      }
      // Caso contrário, insere a coluna na posição original
      else {
        const columnIndex = headers.indexOf(column);
        const newSelectedColumns = [...prev];
        newSelectedColumns.splice(columnIndex, 0, column); // Insere na posição original
        return newSelectedColumns;
      }
    });
  };

  const convertToCSV = (data) => {
    const header = selectedColumns;
    const rows = data.map((item) =>
      selectedColumns.map((col) => {
        const value = item[col];
        return typeof value === "object" ? JSON.stringify(value) : value;
      })
    );
    return [header, ...rows].map((row) => row.join(",")).join("\n");
  };

  const downloadCSV = () => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "entities_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <h1 className="title">Dynatrace Data</h1>

      <div className="column-selector">
        <h2>Select Columns:</h2>
        <div className="checkbox-grid">
          {headers.map((header) => (
            <div key={header} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedColumns.includes(header)}
                onChange={() => handleColumnSelect(header)}
              />
              <label>{header}</label>
            </div>
          ))}
        </div>
      </div>

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
      </div>

      <button className="download-btn" onClick={downloadCSV}>
        Download CSV
      </button>
    </div>
  );
}

export default App;
