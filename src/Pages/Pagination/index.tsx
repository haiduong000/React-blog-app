import React from "react";
import "./style.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <button onClick={() => paginate(number)} key={number}>
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
