import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ImplicitCallback, SecureRoute, Security} from '@okta/okta-react';
import config from './config';
import './App.css';
import SiteNavigation from './components/SiteNavigation';
import Home from './components/Home';
import Companies from './components/companies/Companies';
import CompanyManage from './components/companies/CompanyManage';
import Examples from './components/examples/Examples';
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
                    <SecureRoute path="/companies/create" component={CompanyManage}/>
                    <SecureRoute path="/companies/:id" component={CompanyManage}/>
                    <Route path='/implicit/callback' component={ImplicitCallback}/>
                    <Route path='/examples' component={Examples}/>
                    <Route render={() => {return <Container><h3>Not Found</h3></Container>}}/>
                </Switch>
            </Security>
        </Router>
    )
};

export default App;
