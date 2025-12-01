import { useCallback, useEffect, useMemo, useState } from "react";

interface UsePaginationParams {
  totalItems: number;
  pageSize: number;
  initialPage?: number;
}

export const usePagination = ({
  totalItems,
  pageSize,
  initialPage = 1,
}: UsePaginationParams) => {
  const [page, setPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    if (pageSize <= 0) return 0;
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const goToPage = useCallback(
    (p: number) => {
      if (p < 1 || p > totalPages) return;
      setPage(p);
    },
    [totalPages]
  );

  const next = useCallback(() => {
    if (page < totalPages) setPage(page + 1);
  }, [page, totalPages]);

  const prev = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  return { page, totalPages, goToPage, next, prev };
};
