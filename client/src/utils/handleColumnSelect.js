export const handleColumnSelect = (
  column,
  selectedColumns,
  setSelectedColumns,
  headers
) => {
  console.log("Selected Columns Before:", selectedColumns);
  console.log("Column Being Toggled:", column);

  if (column === "ALL_SELECT") {
    console.log("Selecting All Headers:", headers);
    setSelectedColumns(headers);
    return;
  }

  if (column === "ALL_DESELECT") {
    console.log("Deselecting All Headers");
    setSelectedColumns([]);
    return;
  }

  setSelectedColumns((prev) => {
    const isColumnSelected = prev.includes(column);

    if (isColumnSelected) {
      const updatedColumns = prev.filter((col) => col !== column);
      console.log("Updated Columns After Removal:", updatedColumns);
      return updatedColumns;
    } else {
      const columnIndex = headers.indexOf(column);
      if (columnIndex !== -1) {
        const updatedColumns = [...prev];
        updatedColumns.splice(columnIndex, 0, column);
        console.log("Updated Columns After Adding:", updatedColumns);
        return updatedColumns;
      }

      console.log("Column Index Not Found, Returning Previous:", prev);
      return prev;
    }
  });
};
