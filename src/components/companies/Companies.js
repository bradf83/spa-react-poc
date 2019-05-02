import React from "react";
import {Container, ListGroup, ListGroupItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {withAuth} from '@okta/okta-react';

/**
 * This is a protected component class that retrieves companies from the API and displays them in a list
 *
 * TODO: Convert this to a hook instead of a class.  Consider the token async call
 * TODO: Get the ID back from the service.
 */
class Companies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
        };
    }

    async componentDidMount() {
        const token = await this.props.auth.getAccessToken();
        fetch("/companies", {headers: {"Authorization": "Bearer " + token}})
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    companies: json._embedded.companies
                });
            });
    }

    render() {
        const {companies} = this.state;
        return (
            <Container>
                <h3>
                    <FontAwesomeIcon icon={faBuilding} size="sm" className="mr-1"/>
                    Companies
                </h3>
                <ListGroup className="list-group-flush">
                    {companies.map(company =>
                        <ListGroupItem key={company._links.self.href}>
                            {company.code}
                            <div className="small">{company.name}</div>
                            <a href={company._links.self.href}>Edit 2</a>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Container>
        )
    }
}

export default withAuth(Companies);