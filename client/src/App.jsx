import { useEffect, useState } from "react";
import useData from "./Hooks/useData";
import useLoading from "./Hooks/useLoading";
import useError from "./Hooks/useError";
import useHeaders from "./Hooks/useHeaders";
import useSelectedColumns from "./Hooks/useSelectedColumns";
import { useFetchData } from "./Hooks/useFetchData";
import { useInfiniteScroll } from "./Hooks/useInfiniteScroll";
import { handleColumnSelect } from "./utils/handleColumnSelect";
// import { downloadCSV } from "./utils/downloadCSV";
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

  const fetchData = useFetchData(
    setData,
    setLoading,
    setHeaders,
    setSelectedColumns,
    setError,
    selectedColumns
  );

  useEffect(() => {
    const initializeFetch = async () => {
      const result = await fetchData(1);
      if (!result.error) {
        setCurrentPage(result.currentPage);
        setHasMore(result.hasMore);
      }
    };
    initializeFetch();
  }, [fetchData]);

  const handleLoadMore = useInfiniteScroll(
    loading,
    hasMore,
    currentPage,
    async (nextPage) => {
      const result = await fetchData(nextPage);
      if (!result.error) {
        setCurrentPage(result.currentPage);
        setHasMore(result.hasMore);
      }
    }
  );

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
