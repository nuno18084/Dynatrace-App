import { useMemo, useState } from "react";

export const useTableSearch = (data, selectedColumns) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter((item) => {
      return selectedColumns.some((col) => {
        const value = item[col];
        if (value == null) return false;

        if (typeof value === "object") {
          return JSON.stringify(value)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }

        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [data, searchQuery, selectedColumns]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
};
