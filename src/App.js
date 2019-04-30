import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {ImplicitCallback, SecureRoute, Security, withAuth} from '@okta/okta-react';
import config from './config';
import './App.css';
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, ListGroup, ListGroupItem, Form, FormGroup, Label, Input, Button
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
                    <SecureRoute exact path="/companies" component={withAuth(Companies)}/>
                    <SecureRoute path="/companies/add" component={withAuth(AddCompany)}/>
                    <SecureRoute path="/companies/:id" component={withAuth(EditCompany)}/>
                    <Route path='/implicit/callback' component={ImplicitCallback}/>
                    {/*<Route component={NotFound}/>*/}
                </Switch>
            </Security>
        </Router>
    )
};

const Home = () => {
    return (
        <Container>
            <h3>
                <FontAwesomeIcon icon={faHome} size="sm" className="mr-1"/>
                Welcome
            </h3>
            <p>To the React POC application utilizing React, React Router, Bootstrap and Spring Boot!</p>
        </Container>
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
            <Container>
                <h3>
                    <FontAwesomeIcon icon={faBuilding} size="sm" className="mr-1"/>
                    Companies
                </h3>
                <ListGroup className="list-group-flush">
                    {companies.map(company =>
                        <ListGroupItem key={company._links.self.href}>
                            {company.code}
                            <div className="small">{company.officialName}</div>
                            <a href={company._links.self.href}>Edit 2</a>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Container>
        )
    }
}

// TODO Convert to a hook?
class AddCompany extends React.Component {

    emptyCompany = {
        code: '',
        officialName: '',
        commonName: ''
    };

    constructor(props){
        super(props);
        this.state = {
            company: this.emptyCompany
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * On Change update the company with the changes
     * @param event
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let company = {...this.state.company};
        company[name] = value;
        this.setState({company});
    }

    // TODO: This is handling perfect path, what about errors and such
    // TODO: Use React Router to push history and forward to the companies list page.  Example here: (https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot)
    async handleSubmit(event){
        event.preventDefault();
        let company = {...this.state.company};
        const token = await this.props.auth.getAccessToken();
        await fetch('/companies', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(company)
        });
    }

    render(){
        const {company} = this.state;
        return (
            <Container>
                <h3>Add Company</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="code">Code</Label>
                        <Input type="text" name="code" id="code" value={company.code || ''} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="officialName">Official Name</Label>
                        <Input type="text" name="officialName" id="officialName" value={company.officialName || ''} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="commonName">Common Name</Label>
                        <Input type="text" name="commonName" id="commonName" value={company.commonName || ''} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/companies">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

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
                    <Container>
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
                                <NavItem>
                                    <NavLink href="/companies/add">Add Company</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
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
