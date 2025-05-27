import React from "react";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import useData from "../../Hooks/useData";
import useLoadingState from "../../Hooks/useLoadingState";
import useHeaders from "../../Hooks/useHeaders";
import { useFetchData } from "../../Hooks/useFetchData";
import { useSelector, useDispatch } from "react-redux";
import { setColumns } from "../../store/filtersSlice";
import DataTable from "../../components/DataTable/DataTable";
import "./DataExport.css";

function DataExport() {
  const { t } = useTranslation();
  const { data, setData } = useData();
  const { loading, error, startLoading, stopLoading, setLoadingError } =
    useLoadingState(false);
  const { setHeaders } = useHeaders();
  const selectedColumns = useSelector((state) => state.filters.columns);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchData = useFetchData(
    setData,
    () => {}, // Loading is handled locally now
    setHeaders,
    (columns) => dispatch(setColumns(columns)),
    () => {}, // Errors are handled locally now
    selectedColumns
  );

  useEffect(() => {
    const initializeFetch = async () => {
      if (isInitialized) return;

      console.log("Initializing data fetch");
      startLoading();
      try {
        const result = await fetchData(1);
        console.log("Initial fetch result:", result);
        if (!result.error) {
          setCurrentPage(1);
          setHasMore(result.hasMore);
          setTotalPages(result.totalPages);
          setIsInitialized(true);
          stopLoading();
        } else {
          setLoadingError(t("Failed to initialize data"));
        }
      } catch (error) {
        console.error("Error initializing data:", error);
        setLoadingError(error?.message || t("Failed to load initial data"));
      }
    };
    initializeFetch();
  }, [fetchData, isInitialized, startLoading, stopLoading, setLoadingError, t]);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) {
      console.log(
        "Skipping load more - loading:",
        loading,
        "hasMore:",
        hasMore
      );
      return;
    }

    console.log("Load more clicked", {
      currentPage,
      loading,
      hasMore,
      dataLength: data?.length || 0,
      totalPages,
    });

    startLoading();
    try {
      const nextPage = currentPage + 1;
      console.log("Fetching page:", nextPage);
      const result = await fetchData(nextPage);
      console.log("Load more result:", result);

      if (!result.error) {
        setCurrentPage(nextPage);
        setHasMore(result.hasMore);
        setTotalPages(result.totalPages);
        stopLoading();
      } else {
        setLoadingError(t("Failed to load more data"));
      }
    } catch (error) {
      console.error("Error loading more data:", error);
      setLoadingError(error?.message || t("Failed to load more data"));
    }
  }, [
    currentPage,
    loading,
    hasMore,
    fetchData,
    data,
    totalPages,
    startLoading,
    stopLoading,
    setLoadingError,
    t,
  ]);

  console.log("DataExport render state:", {
    dataLength: data?.length || 0,
    loading,
    hasMore,
    currentPage,
    totalPages,
    error: error || "none",
    isInitialized,
  });

  if (error) return <div className="error">{error}</div>;
  if (!isInitialized || !data || !selectedColumns)
    return <div className="loading">{t("Initializing...")}</div>;

  return (
    <div className="home">
      <h1 className="title">{t("Data Export")}</h1>
      <DataTable
        data={data || []}
        selectedColumns={selectedColumns || []}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}

export default DataExport;
