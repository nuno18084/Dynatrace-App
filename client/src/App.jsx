import { useEffect, useState, useCallback } from "react";
import useData from "./hooks/useData";
import useLoading from "./hooks/useLoading";
import useError from "./hooks/useError";
import useHeaders from "./hooks/useHeaders";
import useSelectedColumns from "./hooks/useSelectedColumns";
import { handleColumnSelect } from "./utils/handleColumnSelect";
// import { downloadCSV } from "./utils/downloadCSV";
import api from "./utils/api";
import "./App.css";
import SideNav from "./components/SideNav/SideNav";
import TopNav from "./components/TopNav/TopNav";
import DataTable from "./components/DataTable/DataTable";

function App() {
  const { data, setData } = useData();
  const { loading, setLoading } = useLoading();
  const { error, setError } = useError();
  const { headers, setHeaders } = useHeaders();
  const { selectedColumns, setSelectedColumns } = useSelectedColumns();

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await api.get("/api/data", {
          params: {
            page: page,
            per_page: 50,
            columns: selectedColumns,
          },
        });

        const { entities, currentPage, totalPages } = response.data;

        if (page === 1) {
          setData(entities);
          if (entities && entities.length > 0) {
            const dynamicHeaders = Object.keys(entities[0]);
            setHeaders(dynamicHeaders);
            if (!selectedColumns.length) {
              setSelectedColumns(dynamicHeaders);
            }
          }
        } else {
          setData((prevData) => [...prevData, ...entities]);
        }

        setHasMore(currentPage < totalPages);
        setCurrentPage(currentPage);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    },
    [
      setData,
      setLoading,
      setHeaders,
      setSelectedColumns,
      setError,
      selectedColumns,
    ]
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

  // const handleDownloadCSV = () => {
  //   if (data && data.length > 0) {
  //     const filteredData = data.map((item) => {
  //       const filteredItem = {};
  //       selectedColumns.forEach((col) => {
  //         filteredItem[col] = item[col];
  //       });
  //       return filteredItem;
  //     });
  //     downloadCSV(filteredData, selectedColumns);
  //   }
  // };

  return (
    <div className="app">
      <TopNav />
      <SideNav
        headers={headers || []}
        selectedColumns={selectedColumns || []}
        handleColumnSelect={handleColumnSelect}
      />
      <h1 className="title">Dynatrace Data</h1>

      <DataTable
        data={data || []}
        selectedColumns={selectedColumns || []}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </div>
  );
}

export default App;
