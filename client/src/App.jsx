import { useEffect, useState, useCallback } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await api.get("/api/data", {
          params: {
            page: page,
            per_page: 50,
          },
        });

        const { entities, totalPages: total, currentPage } = response.data;

        if (currentPage === 1) {
          setData(entities);
          if (entities && entities.length > 0) {
            const dynamicHeaders = Object.keys(entities[0]);
            setHeaders(dynamicHeaders);
            setSelectedColumns(dynamicHeaders);
          }
        } else {
          setData((prevData) => [...prevData, ...entities]);
        }

        setTotalPages(total);
        setHasMore(currentPage < total);
        setCurrentPage(currentPage);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    },
    [setData, setLoading, setHeaders, setSelectedColumns, setError]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(currentPage + 1);
    }
  }, [loading, hasMore, currentPage, fetchData]);

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

      <DataTable
        data={data || []}
        selectedColumns={selectedColumns || []}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />

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
