import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Container, ListGroup} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxes} from "@fortawesome/free-solid-svg-icons";
import {withAuth} from '@okta/okta-react';
import API from "../../api";
import {Link} from "react-router-dom";
import PagingPageSelector from "../helpers/PagingPageSelector";
import PagingPageSize from "../helpers/PagingPageSize";
import PagingRecordCount from "../helpers/PagingRecordCount";
import PagingPageCount from "../helpers/PagingPageCount";

//TODO: Extract this so that it can be shared.
/**
 * Take a response from Spring Data rest and make a nice paging object from it.
 * @param links
 * @param page
 * @returns {{next, last, prev, first}}
 */
const createPagingObject = (links, page, itemsOnPage) => {
    // Open to better ways of doing this but basically get the link if its there otherwise default to undefined.
    const {
        first: {href: first} = {},
        prev: {href: prev} = {},
        next: {href: next} = {},
        last: {href: last} = {},
    } = links;

    return {first, prev, next, last, itemsOnPage, ...page};
};

const Products = ({auth}) => {
    const [products, setProducts] = useState([]);
    const [dataURL, setDataURL] = useState(null); // TODO: Default page for now
    const [pageInfo, setPageInfo] = useState(null);
    const [pageSize, setPageSize] = useState("3");

    useEffect( () => {
        setDataURL('/products?size=' + pageSize);
    }, [pageSize]);

    useEffect(() => {
        if(dataURL !== null){
            const {loadPage} = API(auth);
            const loadData = async () => {
                try{
                    //TODO: PagingPageSize Component
                    const response = await loadPage(dataURL);
                    const body = await response.json();
                    setProducts(body._embedded.products);
                    setPageInfo(createPagingObject(body._links, body.page, body._embedded.products.length));
                } catch(error){
                    //TODO: What to do with error?
                }
            };
            loadData();
        }
    }, [auth, dataURL]);

    return (
        <Container>
            <h3>
                {/*TODO: New Icon*/}
                <FontAwesomeIcon icon={faBoxes} size="sm" className="mr-1"/>
                Products
            </h3>
            <div className="d-flex justify-content-between">
                <div className="w-auto">
                    <PagingPageSize pageSize={pageSize} handlePageSizeChange={setPageSize}/>
                </div>
                <PagingPageSelector pageInfo={pageInfo} handlePageChange={setDataURL}/>
            </div>

            <ListGroup>
                {products && products.map(product =>
                    <Link key={product._links.self.href} className="list-group-item list-group-item-action" to={{
                        pathname: '/products/manage',
                        state: {
                            product: product
                        }
                    }}>
                        {product.name}
                        <div className="small">{product.price}</div>
                    </Link>
                )}
            </ListGroup>
            {pageInfo &&
                <div className="d-flex justify-content-between">
                    <PagingRecordCount currentRecordsSize={pageInfo.itemsOnPage} totalRecordsSize={pageInfo.totalElements}/>
                    <PagingPageCount currentPage={pageInfo.number + 1} totalPages={pageInfo.totalPages} />
                </div>
            }
        </Container>
    );
};

Products.propTypes = {
    auth: PropTypes.object.isRequired,
};

export default withAuth(Products);