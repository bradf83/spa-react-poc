import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Container, ListGroup, FormGroup, FormText} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faFileExcel, faPlus} from "@fortawesome/free-solid-svg-icons";
import {withAuth} from '@okta/okta-react';
import API from "../../api";

const Companies = ({auth}) => {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        //TODO: Not sure I like this in here as I would need something like it in every useEffect
        const {searchCompanies} = API(auth);
        const loadData = async () => {
            try{
                const response = await searchCompanies(search);
                const body = await response.json();
                setCompanies(body._embedded.companies)
            } catch(error){
                //TODO: What to do with error?
            }
        };
        loadData();
    }, [search, auth]);

    const handleSearchEnter = event => {
      if(event.keyCode === 13){
          setSearch(event.target.value);
      }
    };

    const handleDownloadToExcel = () => {
        const {downloadCompaniesExcel} = API(auth);
        try{
            downloadCompaniesExcel();
        } catch (error) {
            // TODO: Handle error?
        }
    };

    return (
        <Container>
            <div className="align-items-center d-flex justify-content-between">
                <h3>
                    <FontAwesomeIcon icon={faBuilding} size="sm" className="mr-1"/>
                    Companies
                </h3>

                <div className="btn-group btn-group-sm">
                    <button type="button" className="btn btn-secondary" onClick={handleDownloadToExcel}>
                        <FontAwesomeIcon icon={faFileExcel}/>
                    </button>
                    <a className="btn btn-primary" href="/companies/create">
                        <FontAwesomeIcon icon={faPlus}/>
                    </a>
                </div>
            </div>

            <FormGroup>
                <input type="search" className="form-control" autoFocus onKeyDown={handleSearchEnter} />
                <FormText>Start typing to filter companies by code and name.</FormText>
            </FormGroup>

            <ListGroup>
                {companies && companies.map(company =>
                    <a href={company._links.self.href} className="list-group-item list-group-item-action" key={company._links.self.href}>
                        {company.code}
                        <div className="small">{company.name}</div>
                    </a>
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