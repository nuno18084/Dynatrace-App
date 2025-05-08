import { useEffect } from "react";
import useData from "./hooks/useData";
import useLoading from "./hooks/useLoading";
import useError from "./hooks/useError";
import useHeaders from "./hooks/useHeaders";
import useSelectedColumns from "./hooks/useSelectedColumns";
import { handleColumnSelect } from "./utils/handleColumnSelect";
import { downloadCSV } from "./utils/downloadCSV";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { data, setData } = useData();
  const { loading, setLoading } = useLoading();
  const { error, setError } = useError();
  const { headers, setHeaders } = useHeaders();
  const { selectedColumns, setSelectedColumns } = useSelectedColumns();

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
  }, [setData, setLoading, setHeaders, setSelectedColumns, setError]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Function to handle column selection
  const handleColumnSelection = (column) => {
    handleColumnSelect(column, selectedColumns, setSelectedColumns, headers);
  };

  // Function to download CSV
  const handleDownloadCSV = () => {
    downloadCSV(data, selectedColumns);
  };

  return (
    <div className="app">
      <Navbar
        headers={headers}
        selectedColumns={selectedColumns}
        handleColumnSelect={handleColumnSelection}
      />
      <h1 className="title">Dynatrace Data</h1>

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

      <button className="download-btn" onClick={handleDownloadCSV}>
        Download CSV
      </button>
    </div>
  );
}

export default App;
