import { useCallback } from "react";

export const useInfiniteScroll = (loading, hasMore, currentPage, fetchData) => {
  return useCallback(async () => {
    if (!loading && hasMore) {
      try {
        await fetchData(currentPage + 1);
      } catch (error) {
        console.error("Error loading more data:", error);
      }
    }
  }, [loading, hasMore, currentPage, fetchData]);
};
