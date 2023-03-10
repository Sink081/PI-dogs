import React from "react";
import style from "./Paginado.module.css";

export default function Pagination({
  dogsPerPage,
  currentPage,
  allDogs,
  pagination,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (currentPage === pageNumbers.length + 1) {
    pagination(1);
  }
  if (pageNumbers.length === 1){
    return null
  }

  return (
    <div className={style.buttonCont}>
    <nav className={style.btnPag}>
      <button
        onClick={() =>
          pagination(currentPage === 1 ? pageNumbers.length : currentPage - 1)
        }
      >
        «««{" "}
      </button>

      {pageNumbers &&
        pageNumbers.map((number) => (
          <button key={number} onClick={() => pagination(number)}>
            {currentPage === number ? <b>{number}</b> : number}
          </button>
        ))}
      <button
        onClick={() =>
          pagination(currentPage === 0 ? currentPage : currentPage + 1)
        }
      >
        »»»{" "}
      </button>
    </nav>
    </div>
  );
}