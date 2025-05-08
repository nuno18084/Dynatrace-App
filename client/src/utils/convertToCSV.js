export const convertToCSV = (data, selectedColumns) => {
  const header = selectedColumns;
  const rows = data.map((item) =>
    selectedColumns.map((col) => {
      const value = item[col];
      return typeof value === "object" ? JSON.stringify(value) : value;
    })
  );
  return [header, ...rows].map((row) => row.join(",")).join("\n");
};
