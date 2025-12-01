import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | "...";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const createPageItems = (): PageItem[] => {
    const pages: PageItem[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
    return pages;
  };

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const pageItems = createPageItems();

  return (
    <div className="flex justify-center items-center gap-2 mt-6 text-sm">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md border transition ${
          currentPage === 1
            ? "border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed"
            : "border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      {pageItems.map((item, index) =>
        item === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => handleClick(item)}
            className={`w-8 h-8 rounded-md border flex items-center justify-center transition ${
              currentPage === item
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md border transition ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed"
            : "border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
