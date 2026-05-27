import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, alwaysShow = false }) => {
    if (totalPages <= 1 && !alwaysShow) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all shadow-sm ${
                        currentPage === i
                            ? 'bg-[#0A1629] text-white shadow-lg shadow-[#0A1629]/20'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-[#0A1629] hover:border-[#0A1629] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
            >
                <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2 hidden sm:flex">
                {renderPageNumbers()}
            </div>

            <div className="sm:hidden flex items-center bg-gray-50 text-[#0B132B] px-4 h-9 rounded-xl text-xs font-bold border border-gray-200 shadow-sm">
                <span className="opacity-60 mr-1.5 uppercase tracking-wider text-[10px]">Page</span> {currentPage} / {totalPages}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-[#0A1629] hover:border-[#0A1629] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default Pagination;