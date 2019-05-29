import React from "react";

const PagingPageCount = ({currentPage, totalPages}) => {
    return (
        <small>{`Page ${currentPage} of ${totalPages}.`}</small>
    )
};

export default PagingPageCount;