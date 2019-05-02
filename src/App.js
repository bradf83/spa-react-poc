import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ImplicitCallback, SecureRoute, Security} from '@okta/okta-react';
import config from './config';
import './App.css';
import SiteNavigation from './components/SiteNavigation';
import Home from './components/Home';
import Companies from './components/companies/Companies';
import AddCompany from './components/companies/AddCompany';
import EditCompany from './components/companies/EditCompany';
import {Container} from 'reactstrap';


const App = () => {
    return (
        <Router>
            <Security issuer={config.auth.issuerURL} client_id={config.auth.clientId}
                      redirect_uri={window.location.origin + '/implicit/callback'}>
                <SiteNavigation/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <SecureRoute exact path="/companies" component={Companies}/>
                    <SecureRoute path="/companies/add" component={AddCompany}/>
                    <SecureRoute path="/companies/:id" component={EditCompany}/>
                    <Route path='/implicit/callback' component={ImplicitCallback}/>
                    <Route render={() => {return <Container><h3>Not Found</h3></Container>}}/>
                </Switch>
            </Security>
        </Router>
    )
};

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
