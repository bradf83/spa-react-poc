import React from 'react';
import ListGroup from "reactstrap/es/ListGroup";
import {Container} from "reactstrap";
import {Route, Switch, NavLink, Link} from 'react-router-dom'
import ListGroupItem from "reactstrap/es/ListGroupItem";

// TODO: I made my first example inline, make this the landing page with links to individual examples, extract this current one out.

const Examples = () => {
    return (
        <Container>
            <div className="row">
                <div className="col-sm-3">
                    <ListGroup>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/summary">Summary</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/owner">Owner</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/taxes">Taxes</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/products">Products</NavLink>
                    </ListGroup>
                </div>
                <div className="col-sm-9">
                    <Switch>
                        <Route path="/examples/summary" component={Summary}/>
                        <Route path="/examples/owner" component={Owner}/>
                        <Route path="/examples/taxes" component={Taxes}/>
                        <Route path="/examples/products" exact component={Products}/>
                        <Route path="/examples/products/create" component={ProductCreate}/>
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
            <p>This could contain summary information for your model.  Let's use a company model as an example, this summary page
            could have annual sales, inception date, current owner.  Next let's talk about the additional actions in the
                side menu.  There could be the following pages as ideas:
            </p>
            <ul>
                <li>
                    An "Owner" page that shows the current information about the owner.
                </li>
                <li>
                    There could be a "Taxes" page that allows a user to change the tax information about the company.
                </li>
                <li>
                    There could be a "Products" page that allows a user to add/edit/delete products for a company.
                </li>
            </ul>
        </div>
    )
};

const Owner = () => {
    return (
        <div>
            <div className="d-flex w-100 justify-content-between mb-2">
                <div className="flex-fill mr-2">
                    <div className="d-flex justify-content-between w-100">
                        <div>
                            <h6>Name</h6>
                            <p>Some Owner</p>
                        </div>
                        <div>
                            <h6>Email</h6>
                            <p>some.owner@example.com</p>
                        </div>
                        <div>
                            <h6>Phone</h6>
                            <p>555-555-5555</p>
                        </div>
                    </div>
                    <div>
                        <h6>Comments</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consectetur culpa excepturi laboriosam libero nisi officia repellendus saepe suscipit veniam! Beatae eligendi ipsum molestias nemo nesciunt placeat praesentium quasi rerum!</p>
                    </div>
                </div>

                <div>
                    <svg className="rounded mx-auto d-block" width="250" height="250">
                        <rect width="100%" height="100%" fill="grey"/>
                        <text x="25%" y="50%" fill="white" dy=".3em">Owner Picture</text>
                    </svg>
                </div>
            </div>

            <div>
                <h6>Biography</h6>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut commodi fugit modi nam placeat
                    provident sapiente similique, sunt totam! Architecto libero obcaecati optio ratione. Beatae cumque
                    quidem reiciendis rerum?
                </div>
                <div>Accusamus aperiam aspernatur blanditiis deserunt dolorem doloribus enim eum eveniet ipsa ipsam,
                    laudantium molestias nemo nobis optio temporibus ut voluptatum? Dicta doloremque maxime nulla
                    repellat! Esse inventore numquam rerum temporibus!
                </div>
                <div>Cum dignissimos ea ex facere iure iusto, laborum nostrum nulla, numquam quam quidem similique
                    veritatis! Adipisci consequuntur fuga minima porro quibusdam quod voluptatum! Illo magni maiores
                    odit quidem similique? Assumenda.
                </div>
                <div>Doloremque doloribus esse iure odio optio? Aut commodi delectus error harum labore magni maxime
                    mollitia nemo, nisi officiis, omnis pariatur perferendis placeat possimus quia quis quo repellendus
                    sed tenetur veritatis.
                </div>
                <div>Aspernatur aut corporis culpa eveniet, explicabo, incidunt ipsum maiores placeat porro quibusdam
                    quod recusandae reiciendis. Cum dolore iusto sit. Amet deserunt, ipsum maxime nobis numquam quae qui
                    sequi voluptatem. Unde?
                </div>
            </div>
        </div>
    )
};

const Taxes = () => {
    return (
        <div>
            <div className="alert alert-info">
                <h6>Things To Do!</h6>
                <ul>
                    <li>Create a UI for setting tax settings</li>
                </ul>
            </div>
        </div>
    )
};

const ProductEntry = (props) => {
    return (
        <ListGroupItem>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{props.name}</h5>
                <small>{props.addedWhen}</small>
            </div>
            <p className="mb-1">{props.info}</p>
            <small>{props.addInfo}</small>
        </ListGroupItem>
    )
};

const Products = () => {

    const fakeProductList = [
        {name: 'Your Product Name', addedWhen: "Added When?", info: "Information about the product", addInfo: "Additional information about the product"},
        {name: 'Monopoly', addedWhen: "20 years ago", info: "The monopoly board game", addInfo: "A game that all children should play!"},
        {name: 'Jenga', addedWhen: "1 day ago", info: "Blocks!", addInfo: "Take a block from the middle and stack it on top.  Take a block from the middle and stack it on top."},
        {name: 'Nintendo', addedWhen: "15 years ago", info: "The classic Nintendo Entertainment System", addInfo: "Comes with Mario Bros and two controllers."},
    ];

    const productList = fakeProductList.map(product => <ProductEntry {...product} />);

    return (
        <div>
            <div className="text-right mb-2">
                <Link className="btn btn-outline-primary" to="/examples/products/create">Create Product</Link>
            </div>

            <ListGroup>
                {productList}
            </ListGroup>
        </div>
    )
};

const ProductCreate = () => {
    return (
        <div>
            <div className="alert alert-info">
                <h6>Things To Do:</h6>
                <ul>
                    <li>Create a form</li>
                    <li>Create some buttons
                        <ul>
                            <li>Submit</li>
                            <li>Submit with Model Errors</li>
                            <li>Submit with Global Errors</li>
                            <li>Cancel</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Examples;