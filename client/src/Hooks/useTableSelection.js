import { useState } from "react";

export const useTableSelection = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (item) => {
    setSelectedRows((prev) => {
      const itemId = item.entityId;
      if (prev.find((row) => row.entityId === itemId)) {
        return prev.filter((row) => row.entityId !== itemId);
      }
      return [...prev, item];
    });
  };

  const handleSelectAll = (data) => {
    setSelectedRows(data);
  };

  const isSelected = (itemId) => {
    return !!selectedRows.find((row) => row.entityId === itemId);
  };

  return {
    selectedRows,
    handleRowSelect,
    handleSelectAll,
    isSelected,
  };
};
