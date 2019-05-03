import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Container, ListGroup, ListGroupItem, FormGroup, FormText} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {withAuth} from '@okta/okta-react';
import { useToken } from '../../hooks/useAuth';

/**
 * This is a protected component class that retrieves companies from the API and displays them in a list
 *
 * The if(accessToken) is needed for the following reason.  1st render useToken and useEffect called, useToken returns
 * and updates state which fires a second render and this time the access token is there so fires the fetch and updates
 * state
 */
const Companies = ({auth}) => {
    const accessToken = useToken(auth);
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState([]);
    useEffect(() => {
        // Since the accessToken call above is its own useEffect, it may not be here yet.
        if(accessToken){
            //TODO: Probably want to have a catch on these promises
            fetch("/companies/search/findByCodeContainsOrNameContainsAllIgnoreCase?search=" + search, {headers: {"Authorization": "Bearer " + accessToken}})
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    setCompanies(json._embedded.companies);
                });
        }
    }, [accessToken, search]);

    const handleSearchEnter = event => {
      if(event.keyCode === 13){
          setSearch(event.target.value);
      }
    };

    return (
        <Container>
            <h3>
                <FontAwesomeIcon icon={faBuilding} size="sm" className="mr-1"/>
                Companies
            </h3>

            <FormGroup>
                <input type="search" className="form-control" autoFocus onKeyDown={handleSearchEnter} />
                <FormText>Start typing to filter companies by code and name.</FormText>
            </FormGroup>

            <ListGroup>
                {companies && companies.map(company =>
                    <ListGroupItem className="list-group-item-action" key={company._links.self.href}>
                        <a href={company._links.self.href} className="mr-1" title="Click to edit the company">
                            <FontAwesomeIcon icon={faPencilAlt} size="sm"/>
                        </a>{company.code}
                        <div className="small">{company.name}</div>
                    </ListGroupItem>
                )}
            </ListGroup>
        {/*    TODO: If there are no companies display a message*/}
        </Container>
    );
};

Companies.propTypes = {
    auth: PropTypes.object.isRequired,
};

export default withAuth(Companies);