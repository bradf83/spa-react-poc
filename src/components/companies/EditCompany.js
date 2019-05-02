import React from "react";
import {Container} from "reactstrap";
import {withAuth} from '@okta/okta-react';

class EditCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <Container>
                <h3>Edit Company</h3>
                <p>Implement Edit here!</p>
            </Container>
        )
    }
}

export default withAuth(EditCompany);