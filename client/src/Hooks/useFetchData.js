import { useCallback } from "react";
import api from "../utils/api";

export const useFetchData = (
  setData,
  setLoading,
  setHeaders,
  setSelectedColumns,
  setError,
  selectedColumns
) => {
  return useCallback(
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

        return { currentPage, hasMore: currentPage < totalPages };
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Error loading data");
        return { error: true };
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
};
