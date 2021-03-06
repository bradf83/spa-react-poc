import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ImplicitCallback, SecureRoute, Security} from '@okta/okta-react';
import config from './config';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SiteNavigation from './components/SiteNavigation';
import Home from './components/Home';
import Companies from './components/companies/Companies';
import CompanyManage from './components/companies/CompanyManage';
import Examples from './components/examples/Examples';
import {Container} from 'reactstrap';
import ExampleListing from "./components/examples/ExampleListing";
import CodeGenerator from "./components/generator/CodeGenerator";
import Products from "./components/products/Products";
import {ToastContainer} from "react-toastify";
import ProductManage from "./components/products/ProductManage";
import CampingApp from "./components/camping/CampingApp";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import InnerErrorBoundary from "./components/errors/InnerErrorBoundary";
import Secure from "./components/secure/Secure";

const oktaConfig = { ...config.auth, redirect_uri: window.location.origin + '/implicit/callback'};

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <Security {...oktaConfig}>
                    <SiteNavigation/>
                    <InnerErrorBoundary>
                        <ToastContainer />
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <SecureRoute exact path="/companies" component={Companies}/>
                            <SecureRoute path="/companies/create" component={CompanyManage}/>
                            <SecureRoute path="/companies/:id" component={CompanyManage}/>
                            <SecureRoute path="/products/manage" component={ProductManage}/>
                            <SecureRoute exact path="/products" component={Products}/>
                            <SecureRoute exact path="/secure" component={Secure}/>
                            <Route path='/examples' component={Examples}/>
                            <Route path='/exampleList' component={ExampleListing}/>
                            <Route path='/codeGenerator' component={CodeGenerator}/>
                            <Route path='/campingApp' component={CampingApp}/>
                            <Route path='/implicit/callback' component={ImplicitCallback}/>
                            <Route render={() => {return <Container><h3>Not Found</h3></Container>}}/>
                        </Switch>
                    </InnerErrorBoundary>
                </Security>
            </Router>
        </ErrorBoundary>
    )
};

export default App;
