import { convertToCSV } from "./convertToCSV";

export const downloadCSV = (data, selectedColumns) => {
  const csvContent = convertToCSV(data, selectedColumns);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "entities_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
