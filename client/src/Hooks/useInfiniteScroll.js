import { useCallback } from "react";

export const useInfiniteScroll = (loading, hasMore, currentPage, fetchData) => {
  return useCallback(() => {
    if (!loading && hasMore) {
      fetchData(currentPage + 1);
    }
  }, [loading, hasMore, currentPage, fetchData]);
};
