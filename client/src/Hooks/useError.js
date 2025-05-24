// hooks/useError.js
import { useState, useCallback } from "react";

export default function useError(initialValue = null) {
  const [error, setError] = useState(initialValue);

  const handleError = useCallback((errorMessage) => {
    setError(errorMessage || "An error occurred");
  }, []);

  return { error, setError: handleError };
}
