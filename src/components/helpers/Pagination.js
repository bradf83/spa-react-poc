import React from 'react';

const Pagination = ({pageInfo, handlePageChange}) => {
    if(pageInfo === null){
        return null;
    }
    const firstDisabled = pageInfo.number === 0 || pageInfo.first === undefined;
    const lastDisabled = (pageInfo.number + 1) === pageInfo.totalPages || pageInfo.last === undefined;
    return (
        <nav>
            <ul className="pagination pagination-sm">
                <li className={`page-item ${firstDisabled ? "disabled" : ""}`}>
                    <button className="page-link" disabled={firstDisabled} onClick={() => handlePageChange(pageInfo.first)} aria-label="First">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                <li className={`page-item ${pageInfo.prev ? "" : "disabled"}`}>
                    <button className="page-link"  disabled={pageInfo.prev === undefined} onClick={() => handlePageChange(pageInfo.prev)} aria-label="Previous">
                        <span aria-hidden="true">&lt;</span>
                    </button>
                </li>
                <li className="page-item active"><span className="page-link">{pageInfo.number + 1}</span></li>
                <li className={`page-item ${pageInfo.next ? "" : "disabled"}`}>
                    <button className="page-link" disabled={pageInfo.next === undefined} onClick={() => handlePageChange(pageInfo.next)} aria-label="Next">
                        <span aria-hidden="true">&gt;</span>
                    </button>
                </li>
                <li className={`page-item ${lastDisabled ? "disabled" : ""}`}>
                    <button className="page-link" disabled={lastDisabled} onClick={() => handlePageChange(pageInfo.last)} aria-label="Last">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;