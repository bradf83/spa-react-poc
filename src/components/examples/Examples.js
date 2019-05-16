import React from 'react';
import ListGroup from "reactstrap/es/ListGroup";
import {Container} from "reactstrap";
import {Route, Switch, NavLink} from 'react-router-dom'
import ListGroupItem from "reactstrap/es/ListGroupItem";

// TODO: I made my first example inline, make this the landing page with links to individual examples, extract this current one out.

const Examples = () => {
    return (
        <Container>
            <div className="row">
                <div className="col-sm-3">
                    <ListGroup>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/summary">Summary</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/info">Info</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/list">List</NavLink>
                    </ListGroup>
                </div>
                <div className="col-sm-9">
                    <Switch>
                        <Route path="/examples/summary" component={Summary}/>
                        <Route path="/examples/info" component={Info}/>
                        <Route path="/examples/list" component={List}/>
                    </Switch>
                </div>
            </div>
        </Container>
    )
};

// Used for this example so left in this file.

const Summary = () => {
    return(
        <div>
            <h4>Summary</h4>
            <p>Some summary information</p>
        </div>
    )
};

const Info = () => {
    return (
        <div>
            <div className="alert alert-info">
                Coming soon to an example near you!
            </div>
        </div>
    )
};

const List = () => {
    return (
        <ListGroup>
            <ListGroupItem>List Item 1</ListGroupItem>
            <ListGroupItem>List Item 2</ListGroupItem>
            <ListGroupItem>List Item 3</ListGroupItem>
            <ListGroupItem>List Item 4</ListGroupItem>
        </ListGroup>
    )
};

export default Examples;