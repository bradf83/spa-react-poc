import {Input} from "reactstrap";
import React from "react";

const PagingPageSize = ({handlePageSizeChange, pageSize}) => {
    return (
        <Input type="select" bsSize="sm" title="How many items should be displayed at once?" value={pageSize} onChange={({target}) => {handlePageSizeChange(target.value)}}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </Input>
    )
};

export default PagingPageSize;