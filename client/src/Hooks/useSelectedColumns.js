// hooks/useSelectedColumns.js
import { useState } from "react";

export default function useSelectedColumns(initialValue = []) {
  const [selectedColumns, setSelectedColumns] = useState(initialValue);
  return { selectedColumns, setSelectedColumns };
}
