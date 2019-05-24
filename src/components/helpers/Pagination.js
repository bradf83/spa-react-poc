import React from 'react';
import {withRouter} from "react-router-dom";

const Pagination = ({history, match, pageInfo}) => {
    const handlePageChange = (page=0) => {
        history.push(match.url + '?pageNumber=' + page);
    };

    if(pageInfo === undefined || pageInfo === null){
        return null;
    }

    const currentPage = pageInfo.number;
    const previousPage = currentPage === 0 ? 0 : currentPage - 1;
    const nextPage = currentPage + 1 === pageInfo.totalPages ? currentPage : currentPage + 1;
    const disablePrevious = currentPage === previousPage;
    const disableNext = currentPage === nextPage;
    return (
        <nav>
            <ul className="pagination pagination-sm">
                <li className={`page-item ${disablePrevious ? "disabled" : ""}`}>
                    <button className="page-link" disabled={disablePrevious} onClick={() => handlePageChange(0)} aria-label="First">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                <li className={`page-item ${disablePrevious ? "disabled" : ""}`}>
                    <button className="page-link"  disabled={disablePrevious} onClick={() => handlePageChange(previousPage)} aria-label="Previous">
                        <span aria-hidden="true">&lt;</span>
                    </button>
                </li>
                <li className="page-item active"><span className="page-link">{currentPage + 1}</span></li>
                <li className={`page-item ${disableNext ? "disabled" : ""}`}>
                    <button className="page-link" disabled={disableNext} onClick={() => handlePageChange(nextPage)} aria-label="Next">
                        <span aria-hidden="true">&gt;</span>
                    </button>
                </li>
                <li className={`page-item ${disableNext ? "disabled" : ""}`}>
                    <button className="page-link" disabled={disableNext} onClick={() => handlePageChange(pageInfo.totalPages - 1)} aria-label="Last">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
};

export default withRouter(Pagination);