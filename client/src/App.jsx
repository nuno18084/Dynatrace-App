import { useEffect } from "react";
import useData from "./hooks/useData";
import useLoading from "./hooks/useLoading";
import useError from "./hooks/useError";
import useHeaders from "./hooks/useHeaders";
import useSelectedColumns from "./hooks/useSelectedColumns";
import { handleColumnSelect } from "./utils/handleColumnSelect";
import { downloadCSV } from "./utils/downloadCSV";
import api from "./utils/api";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DataTable from "./components/DataTable/DataTable";
import DownloadButton from "./components/Button/Button";

function App() {
  const { data, setData } = useData();
  const { loading, setLoading } = useLoading();
  const { error, setError } = useError();
  const { headers, setHeaders } = useHeaders();
  const { selectedColumns, setSelectedColumns } = useSelectedColumns();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/data");
        const entities = response.data.entities;

        if (entities && entities.length > 0) {
          setData(entities);
          const dynamicHeaders = Object.keys(entities[0]);
          setHeaders(dynamicHeaders);
          setSelectedColumns(dynamicHeaders); // Select all by default
        } else {
          setError("No data received from server");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData, setLoading, setHeaders, setSelectedColumns, setError]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data || !selectedColumns)
    return <div className="loading">Initializing...</div>;

  // Function to handle column selection
  const handleColumnSelection = (column) => {
    handleColumnSelect(column, selectedColumns, setSelectedColumns, headers);
  };

  // Function to download CSV
  const handleDownloadCSV = () => {
    if (data && data.length > 0) {
      downloadCSV(data, selectedColumns);
    }
  };

  return (
    <div className="app">
      <Navbar
        headers={headers || []}
        selectedColumns={selectedColumns || []}
        handleColumnSelect={handleColumnSelection}
      />
      <h1 className="title">Dynatrace Data</h1>

      <DataTable data={data || []} selectedColumns={selectedColumns || []} />

      <DownloadButton
        text="Download CSV"
        color="#029e7a"
        width="1200px"
        height="40px"
        onClick={handleDownloadCSV}
        marginBottom="100px"
      />
    </div>
  );
}

export default App;
