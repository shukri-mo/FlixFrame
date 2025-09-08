import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  const maxVisiblePages = 7;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  // Adjust if we're near the beginning or end
  if (endPage - startPage < maxVisiblePages - 1) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    } else {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={`p-2 rounded-lg border transition-colors ${
          canGoPrevious
            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* First page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border transition-colors ${
            page === currentPage
              ? 'border-blue-500 bg-blue-600 text-white'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`p-2 rounded-lg border transition-colors ${
          canGoNext
            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};