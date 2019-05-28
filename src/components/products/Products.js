import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Container, ListGroup} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxes} from "@fortawesome/free-solid-svg-icons";
import {withAuth} from '@okta/okta-react';
import API from "../../api";
import Pagination from "../helpers/Pagination";
import {Link} from "react-router-dom";

const Products = ({auth, location, match, history}) => {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageInfo, setPageInfo] = useState(null);

    useEffect(() => {
        let searchParams = new URLSearchParams(location.search);
        let pageNbr = searchParams.get('pageNumber') == null ? 0 : searchParams.get('pageNumber');
        setPageNumber(pageNbr);
    }, [location.search]);

    useEffect(() => {
        const {loadProducts} = API(auth);
        const loadData = async () => {
            try{
                //TODO: PageSize Component
                const response = await loadProducts(pageNumber, 3);
                const body = await response.json();
                setProducts(body._embedded.products);
                setPageInfo(body.page);
            } catch(error){
                //TODO: What to do with error?
            }
        };
        loadData();
    }, [auth, pageNumber]);

    return (
        <Container>
            <div className="d-flex justify-content-between">

                <h3>
                    {/*TODO: New Icon*/}
                    <FontAwesomeIcon icon={faBoxes} size="sm" className="mr-1"/>
                    Products
                </h3>

                <div>
                    {/* TODO: Not sure I like this pagination implementation, it works but does not follow the spirit of HAL*/}
                    <Pagination pageInfo={pageInfo}/>
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