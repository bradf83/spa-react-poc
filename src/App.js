import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {ImplicitCallback, SecureRoute, Security, withAuth} from '@okta/okta-react';
import config from './config';
import './App.css';

const App = () => {
    return (
        <Router>
            <Security issuer={config.auth.issuerURL} client_id={config.auth.clientId}
                      redirect_uri={window.location.origin + '/implicit/callback'}>
                <Links/>
                <h2>Routes Below</h2>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/about' component={About}/>
                    <SecureRoute path="/companies" component={withAuth(Companies)}/>
                    <Route path='/implicit/callback' component={ImplicitCallback}/>
                    {/*<Route component={NotFound}/>*/}
                </Switch>
            </Security>
        </Router>
    )
};

const Links = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {/*<Link to="/dsafdsfds">Not There</Link>*/}
            <Link to={"/companies"}>Companies</Link>
        </nav>
    )
};

const Home = () => {
    return <h3>Home</h3>
};

const About = () => {
    return <h3>About</h3>
};

/**
 * This is a protected component class that retrieves companies from the API and displays them in a list
 *
 * TODO: Convert this to a hook instead of a class.  Consider the token async call
 * TODO: Get the ID back from the service.
 */
class Companies extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            companies: [],
        };
    }

    async componentDidMount() {
        const token = await this.props.auth.getAccessToken();
        fetch("/companies", {headers: {"Authorization": "Bearer " + token}})
            .then((response) => {return response.json();})
            .then((json) => {
                this.setState({
                    companies: json._embedded.companies
                });
            });
    }

    render(){
        const { companies } = this.state;
        return (
            <div>
                <h3>Companies</h3>
                <ul>
                    {companies.map(company =>
                        <li key={company.code}>
                            {company.code}
                        </li>
                    )}
                </ul>
            </div>
        )
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
