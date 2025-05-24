import { useState, useCallback } from "react";

export default function useLoadingState(initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const setLoadingError = useCallback((error) => {
    setError(error?.message || error);
    setLoading(false);
  }, []);

  const resetState = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    resetState,
  };
}
