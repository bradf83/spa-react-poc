import React, {useState, useEffect} from 'react';
import {Container} from 'reactstrap';
import { withAuth } from '@okta/okta-react';
import {withRouter} from "react-router-dom";

// Component

// TODO: Allows us to view the product for now, implement the manage part (create/edit).

const ProductManage = ({auth, history, match, location}) => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [etag, setEtag ] = useState (null);

    useEffect(() => {
        if(product !== null){
            setLoading(false);
        }
    }, [product]);

    useEffect(() => {
        const loadProduct = async () => {
            const token = await auth.getAccessToken();
            const response = await fetch(location.state.product._links.self.href, {header:{Authorization: `Bearer ${token}`}});
            const body = await response.json();
            console.log(body);
            // Store product response
            setProduct(body);
            // Store etag version
            setEtag(response.headers.get('etag'));
        };
        loadProduct();
    }, [auth, location]);

    if(loading === true){
        return (
            <Container>
                <div className="alert alert-info">
                    Loading!
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <h3>Manage Product - {product.name}</h3>
            <div>Price: {product.price}</div>
            <p>{product.comments}</p>
        </Container>
    )
};

export default withAuth(withRouter(ProductManage));