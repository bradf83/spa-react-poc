import React from "react";
import {Container} from "reactstrap";
import {withAuth} from '@okta/okta-react';

const EditCompany = () => {
    return (
        <Container>
            <h3>Edit Company</h3>
            <p>Implement Edit here!</p>
        </Container>
    );
};

export default withAuth(EditCompany);