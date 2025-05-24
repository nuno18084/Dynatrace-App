export const useCSVExport = () => {
  const generateCSV = (dataToExport, columns) => {
    const header = columns.join(",");
    const rows = dataToExport.map((item) =>
      columns
        .map((col) => {
          const value = item[col];
          if (typeof value === "object") {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          return `"${value}"`;
        })
        .join(",")
    );
    return [header, ...rows].join("\n");
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExport = (data, columns, filename) => {
    const csvContent = generateCSV(data, columns);
    downloadCSV(csvContent, filename);
  };

  return {
    handleExport,
  };
};
