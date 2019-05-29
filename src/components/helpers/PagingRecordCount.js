import React from "react";

const PagingRecordCount = ({currentRecordsSize, totalRecordsSize}) => {
    return (
        <small>{`Showing ${currentRecordsSize} of ${totalRecordsSize} records.`}</small>
    )
};

export default PagingRecordCount;