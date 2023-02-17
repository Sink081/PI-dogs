import React from "react";

export default function Pagination ({
    dogsPerPage,
    currentPage,
    allDogs,
    pagination,
}) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i);
    }
    if (currentPage === pageNumber.length === 1){
        pagination(1);
    }
    return (
        <div>
            <nav>
                <button onClick={() => 
                    pagination(currentPage === 1 ? pageNumber.length : currentPage - 1)
                }>
                    «««{" "}
                </button>
                {pageNumber && pageNumber.map((number) => (
                    <button key={number} onClick={() => pagination(number)}>
                        {currentPage === number ?<b>{number}</b> : number}
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
    )
}