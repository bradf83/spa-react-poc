import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {ImplicitCallback, SecureRoute, Security, withAuth} from '@okta/okta-react';
import config from './config';
import './App.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, ListGroup, ListGroupItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';


const App = () => {
    return (
        <Router>
            <Security issuer={config.auth.issuerURL} client_id={config.auth.clientId}
                      redirect_uri={window.location.origin + '/implicit/callback'}>
                <SiteNavigation/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <SecureRoute path="/companies" component={withAuth(Companies)}/>
                    <Route path='/implicit/callback' component={ImplicitCallback}/>
                    {/*<Route component={NotFound}/>*/}
                </Switch>
            </Security>
        </Router>
    )
};

const Home = () => {
    return (
        <div className="container">
            <h3>
                <FontAwesomeIcon icon={faHome} size="sm" className="mr-1"/>
                Welcome
            </h3>
            <p>To the React POC application utilizing React, React Router, Bootstrap and Spring Boot!</p>
        </div>
    )
};

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
            <div className="container">
                <h3>
                    <FontAwesomeIcon icon={faBuilding} size="sm" className="mr-1"/>
                    Companies
                </h3>
                <ListGroup className="list-group-flush">
                    {companies.map(company =>
                        <ListGroupItem key={company._links.self.href}>
                            <p>{company.code}</p>
                            <small>{company.officialName}</small>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </div>
        )
    }
}

// TODO: Investigate Further
class SiteNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="mb-1">
                <Navbar color="light" light expand="md">
                    <div className="container">
                        <NavbarBrand href="/">React POC</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/companies">Companies</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}

// --------------------------------------------------------- Code that needs work

//TODO: Async Await here I believe is broken

// TODO: Consider using a class based component and working backwards from there.

// const Protected = async (props) => {
// const Protected = (props) => {
//     console.log(props);
//     console.log(props.auth.getAccessToken());
//
//     const [companies, setCompanies] = useState({});
//
//     useEffect( () => {
//         async function fetchData(){
//             const data = await fetch("/companies", {headers: {"Authorization": "Bearer " + await props.auth.getAccessToken()}})
//             // fetch("/companies")
//                 .then((response) => {
//                     return response.json();
//                 })
//                 .then((json) => {
//                     // console.log(json);
//                     // console.log(JSON.stringify(json));
//                     return json;
//                 });
//             return data;
//         }
//         fetchData();
//     }, []);
//
//     // // await fetch("/companies", {headers: {"Authorization": "Bearer " + await props.auth.getAccessToken()}})
//     // fetch("/companies")
//     //     .then((response) => {
//     //         return response.json();
//     //     })
//     //     .then((json) => {
//     //         console.log(json);
//     //         console.log(JSON.stringify(json));
//     //     });
//
//     return <h3>Protected</h3>
// };

// const NotFound = () => {
//     return <h3>Page Not Found</h3>
// };

export default App;
