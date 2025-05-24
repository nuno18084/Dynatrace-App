import { useState } from "react";

export default function useShowAllColumns(initialState = false) {
  const [showAllColumns, setShowAllColumns] = useState(initialState);

  const toggleShowColumns = () => {
    setShowAllColumns((prev) => !prev);
  };

  return { showAllColumns, setShowAllColumns, toggleShowColumns };
}
