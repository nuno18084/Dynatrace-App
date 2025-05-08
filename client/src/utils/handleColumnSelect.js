export const handleColumnSelect = (
  column,
  selectedColumns,
  setSelectedColumns,
  headers
) => {
  // Log for debugging
  console.log("Selected Columns Before:", selectedColumns);
  console.log("Column Being Toggled:", column);

  setSelectedColumns((prev) => {
    // Check if the column is already selected
    const isColumnSelected = prev.includes(column);

    if (isColumnSelected) {
      // Remove the column from selectedColumns
      const updatedColumns = prev.filter((col) => col !== column);
      console.log("Updated Columns After Removal:", updatedColumns);
      return updatedColumns;
    } else {
      // Add the column at the correct position in headers array
      const columnIndex = headers.indexOf(column);
      if (columnIndex !== -1) {
        // Check if the column exists in headers
        const updatedColumns = [...prev];
        updatedColumns.splice(columnIndex, 0, column); // Insert at the original index
        console.log("Updated Columns After Adding:", updatedColumns);
        return updatedColumns;
      }

      console.log("Column Index Not Found, Returning Previous:", prev);
      return prev; // Return previous state if column not found in headers
    }
  });
};
