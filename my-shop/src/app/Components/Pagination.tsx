import Link from "../../../node_modules/next/link";
import React, { useState } from 'react';

interface totalProductsInterface {
  totalProducts: any;
  countProducts: any;
  paginate: any;
}

export const Pagination: React.FC<totalProductsInterface> = (
  { totalProducts, paginate, countProducts }) => {
  const [activePage, setActivePage] = useState(1);

  const pagenumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / countProducts); i++) {
    pagenumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => {
    setActivePage(pageNumber);
    paginate(pageNumber);
  };

  return (
    <div className="pagination-mainBlock">
      <ul className="pagination-container">
        {pagenumbers.map(number => (
          <li key={number} className="pageProducts-items">
            <button 
              className={`pageProducts-link${number === activePage ? ' active' : ''}`}
              onClick={() => handlePageClick(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
