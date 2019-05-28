import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Container, ListGroup} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxes} from "@fortawesome/free-solid-svg-icons";
import {withAuth} from '@okta/okta-react';
import API from "../../api";
import {Link} from "react-router-dom";
import Pagination from "../helpers/Pagination";

//TODO: Extract this so that it can be shared.
/**
 * Take a response from Spring Data rest and make a nice paging object from it.
 * @param links
 * @param page
 * @returns {{next, last, prev, first}}
 */
const createPagingObject = (links, page) => {
    // Open to better ways of doing this but basically get the link if its there otherwise default to undefined.
    const {
        first: {href: first} = {},
        prev: {href: prev} = {},
        next: {href: next} = {},
        last: {href: last} = {},
    } = links;

    return {first, prev, next, last, ...page};
};

const Products = ({auth}) => {
    const [products, setProducts] = useState([]);
    const [dataURL, setDataURL] = useState('/products?size=3'); // TODO: Default page for now
    const [pageInfo, setPageInfo] = useState(null);

    useEffect(() => {
        const {loadPage} = API(auth);
        const loadData = async () => {
            try{
                //TODO: PageSize Component
                const response = await loadPage(dataURL);
                const body = await response.json();
                setProducts(body._embedded.products);
                setPageInfo(createPagingObject(body._links, body.page));
            } catch(error){
                //TODO: What to do with error?
            }
        };
        loadData();
    }, [auth, dataURL]);

    return (
        <Container>
            <div className="d-flex justify-content-between">

                <h3>
                    {/*TODO: New Icon*/}
                    <FontAwesomeIcon icon={faBoxes} size="sm" className="mr-1"/>
                    Products
                </h3>

                <div>
                    <Pagination pageInfo={pageInfo} handlePageChange={setDataURL}/>
                </div>

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
        </Container>
    );
};

Products.propTypes = {
    auth: PropTypes.object.isRequired,
};

export default withAuth(Products);