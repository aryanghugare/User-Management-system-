import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        className="flex justify-center items-center w-10 h-10 border-none rounded-lg bg-gray-100 text-gray-800 font-medium cursor-pointer transition-all duration-300 hover:bg-primary-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-800"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          className={`flex justify-center items-center w-10 h-10 border-none rounded-lg font-medium cursor-pointer transition-all duration-300 ${
            currentPage === page 
              ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white' 
              : 'bg-gray-100 text-gray-800 hover:bg-primary-500 hover:text-white'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      <button
        className="flex justify-center items-center w-10 h-10 border-none rounded-lg bg-gray-100 text-gray-800 font-medium cursor-pointer transition-all duration-300 hover:bg-primary-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-800"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
