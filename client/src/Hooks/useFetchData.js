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
      console.log("Fetching data for page:", page);
      try {
        const response = await api.get("/api/data", {
          params: {
            page,
            per_page: 50,
            columns: selectedColumns,
          },
        });

        console.log("API Response:", response.data);
        const { entities, currentPage, totalPages } = response.data;

        if (!entities || entities.length === 0) {
          console.log("No entities returned");
          return { currentPage: page, hasMore: false };
        }

        if (page === 1) {
          console.log("Setting initial data");
          setData(entities);
          if (entities && entities.length > 0) {
            const dynamicHeaders = Object.keys(entities[0]);
            setHeaders(dynamicHeaders);
            if (!selectedColumns || selectedColumns.length === 0) {
              setSelectedColumns(dynamicHeaders);
            }
          }
        } else {
          console.log("Appending data, current page:", page);
          setData((prevData) => {
            const newData = [...prevData, ...entities];
            console.log("New data length:", newData.length);
            return newData;
          });
        }

        const hasMore = currentPage < totalPages;
        console.log(
          "Has more data:",
          hasMore,
          "Current page:",
          currentPage,
          "Total pages:",
          totalPages
        );
        return { currentPage, hasMore, totalPages };
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Error loading data");
        return { error: true, currentPage: page, hasMore: false };
      }
    },
    [selectedColumns, setData, setHeaders, setSelectedColumns, setError]
  );
};
