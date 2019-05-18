import React, {useState} from 'react';
import ListGroup from "reactstrap/es/ListGroup";
import {Button, Container, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {Route, Switch, NavLink, Link, withRouter} from 'react-router-dom'
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
                        <NavLink className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" to="/examples/products">
                            Products
                            <span className="badge badge-primary badge-pill">4</span>
                        </NavLink>
                    </ListGroup>
                </div>
                <div className="col-sm-9">
                    <Switch>
                        <Route path="/examples/summary" component={Summary}/>
                        <Route path="/examples/owner" component={Owner}/>
                        <Route path="/examples/taxes" component={Taxes}/>
                        <Route path="/examples/products" exact component={Products}/>
                        <Route path="/examples/products/create" component={withRouter(ProductCreate)}/>
                    </Switch>
                </div>
            </div>
        </Container>
    )
};

// Summary component

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

// Owner Component

const Owner = () => {
    return (
        <div>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <svg className="card-image" width="100%" height="100%">
                            <rect width="100%" height="100%" fill="grey"/>
                            <text x="25%" y="50%" fill="white" dy=".3em">Owner Picture</text>
                        </svg>
                        {/*<img src="..." className="card-img" alt="..."/>*/}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Some Owner</h5>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6>Email</h6>
                                    <p>some.owner@example.com</p>
                                </div>
                                <div>
                                    <h6>Phone</h6>
                                    <p>555-555-5555</p>
                                </div>
                            </div>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consectetur culpa excepturi laboriosam libero nisi officia repellendus saepe</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">

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
        </div>
    )
};

// Taxes Component

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

// Product Entry Component (Used in product list)

const ProductEntry = (props) => {
    return (
        <ListGroupItem>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{props.name}</h5>
                <small>{props.addedWhen}</small>
            </div>
            <div className="d-flex w-100 justify-content-between align-items-end">
                <div>
                    <p className="mb-1">{props.info}</p>
                    <small>{props.addInfo}</small>
                </div>
                <div>
                    <button className="btn btn-link text-danger p-0" onClick={() => {alert('Implement Delete Here.')}}>
                        Delete
                    </button>
                </div>
            </div>

        </ListGroupItem>
    )
};

// Product List Component

const Products = () => {

    const fakeProductList = [
        {name: 'Your Product Name', addedWhen: "Added When?", info: "Information about the product", addInfo: "Additional information about the product"},
        {name: 'Monopoly', addedWhen: "20 years ago", info: "The monopoly board game", addInfo: "A game that all children should play!"},
        {name: 'Jenga', addedWhen: "1 day ago", info: "Blocks!", addInfo: "Take a block from the middle and stack it on top.  Take a block from the middle and stack it on top."},
        {name: 'Nintendo', addedWhen: "15 years ago", info: "The classic Nintendo Entertainment System", addInfo: "Comes with Mario Bros and two controllers."},
    ];

    // Yes I am using the name as as key and its distinct in this example but would not normally be used as the key.
    const productList = fakeProductList.map(product => <ProductEntry key={product.name} {...product} />);

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

// Create Product Component

const ProductCreate = ({history}) => {

    const hasFieldErrors = (field, errors) => {
        return errors.filter(error => error.property === field).length > 0
    };

    const FieldErrors = ({field, errors}) => {
        const relevantErrors = errors.filter(error => error.property === field);
        if(relevantErrors.length > 0){
            const message = relevantErrors.map(({message}) => message).join(' ');
            return (
                <FormFeedback>{message}</FormFeedback>
            )
        } else {
            return null;
        }
    };

    const GlobalErrors = ({errors}) => {
        const relevantErrors = errors.filter(error => error.property === undefined || error.property === '');
        if(relevantErrors.length > 0){
            // Using the message as the key just for this, use a valid key if doing this for real.
            const message = relevantErrors.map(({message}) => <li key={message}>{message}</li>);
            return (
                <div className="alert alert-danger">
                    <h6>Errors:</h6>
                    <ul>
                        {message}
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    };

    const initialState = () => ({
        name: '',
        addedWhen: '',
        info: '',
        addInfo: ''
    });

    const [formState, setFormState] = useState(initialState());
    const [simulate, setSimulate] = useState('Submit');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Clear errors on submit;
        setErrors([]);

        switch(simulate){
            case 'Submit':
                alert('You are submitting the following information: ' + JSON.stringify(formState));
                history.push('/examples/products');
                break;
            case 'FormErrors':
                const fieldErrors = [
                    {
                        property: 'name',
                        message: 'There is something wrong with name!',
                    },
                    {
                        property: 'info',
                        message: 'Info has something wrong.'
                    }
                ];
                setErrors(fieldErrors);
                break;
            case 'GlobalErrors':
                const globalErrors = [
                    {
                        message: 'A global error has occurred.',
                    },
                    {
                        property: '',
                        message: 'A second global error has occurred.'
                    }
                ];
                setErrors(globalErrors);
                break;
            default:
                alert('Something went wrong.');
        }
    };

    const handleChange = ({target}) => {
        let newState = {...formState};
        newState[target.name] = target.value;
        setFormState(newState);
    };

    const handleSimulateChange = ({target}) => {
        setSimulate(target.value);
    };

    return (
        <div>
            <h3>Create</h3>
            <GlobalErrors errors={errors} />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={formState.name} onChange={handleChange} invalid={hasFieldErrors("name", errors)}/>
                    <FieldErrors field="name" errors={errors}/>
                </FormGroup>
                <FormGroup>
                    <Label for="addedWhen">Added When?</Label>
                    <Input type="text" name="addedWhen" id="addedWhen" value={formState.addedWhen} onChange={handleChange} invalid={hasFieldErrors("addedWhen", errors)}/>
                    <FieldErrors field="addedWhen" errors={errors}/>
                </FormGroup>
                <FormGroup>
                    <Label for="info">Info</Label>
                    <Input type="text" name="info" id="info" value={formState.info} onChange={handleChange} invalid={hasFieldErrors("info", errors)}/>
                    <FieldErrors field="info" errors={errors}/>
                </FormGroup>
                <FormGroup>
                    <Label for="addInfo">Additional Info</Label>
                    <Input type="text" name="addInfo" id="addInfo" value={formState.addInfo} onChange={handleChange} invalid={hasFieldErrors("addInfo", errors)}/>
                    <FieldErrors field="addInfo" errors={errors}/>
                </FormGroup>
                <FormGroup>
                    <h6>Submit Behaviour (Simulation)</h6>
                    {/* TODO: Could create a component for this radio box */}
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="simulate" id="js-simulate-submit" checked={simulate === 'Submit'} onChange={handleSimulateChange}
                               value="Submit"/>
                            <label className="form-check-label" htmlFor="js-simulate-submit" title='Simulate submitting the form and it being successful.'>Submit</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="simulate" id="js-simulate-form-errors" checked={simulate === 'FormErrors'} onChange={handleSimulateChange}
                               value="FormErrors" />
                            <label className="form-check-label" htmlFor="js-simulate-form-errors" title='Simulate submitting the form and there being form errors.'>Form Errors</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="simulate" id="js-simulate-global-errors" checked={simulate === 'GlobalErrors'} onChange={handleSimulateChange}
                               value="GlobalErrors" />
                            <label className="form-check-label" htmlFor="js-simulate-global-errors" title='Simulate submitting the form and there being global errors.'>Global Errors</label>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Button className="mr-2" color="primary" type="submit">Save</Button>
                    <Button color="secondary" tag={Link} to="/examples/products">Cancel</Button>
                </FormGroup>
            </Form>
        </div>
    )
};

export default Examples;