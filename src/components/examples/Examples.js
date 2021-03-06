import React, { useState, useReducer } from 'react';
import ListGroup from "reactstrap/es/ListGroup";
import {Button, Container, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {Route, Switch, NavLink, Link, withRouter} from 'react-router-dom'
import ListGroupItem from "reactstrap/es/ListGroupItem";
import {toast} from "react-toastify";
import v4 from "uuid/v4";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                        <NavLink className="list-group-item list-group-item-action" to="/examples/toasts">Toasts</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/nestedState">Nested State</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/todoExample">Todo Example</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/crudExample">Crud List Example</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/childrenExample">Children Example</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/errorBoundaryExample">Error Boundary Example</NavLink>
                        <NavLink className="list-group-item list-group-item-action" to="/examples/authorizationExample">Authorization Example</NavLink>
                    </ListGroup>
                </div>
                <div className="col-sm-9">
                    <Switch>
                        <Route path="/examples/summary" component={Summary}/>
                        <Route path="/examples/owner" component={Owner}/>
                        <Route path="/examples/taxes" component={Taxes}/>
                        <Route path="/examples/products" exact component={Products}/>
                        <Route path="/examples/products/create" component={withRouter(ProductCreate)}/>
                        <Route path="/examples/toasts" component={Toasts}/>
                        <Route path="/examples/nestedState" component={NestedState}/>
                        <Route path="/examples/todoExample" component={TodoExample}/>
                        <Route path="/examples/crudExample" component={CrudExample}/>
                        <Route path="/examples/childrenExample" component={ChildrenExample}/>
                        <Route path="/examples/errorBoundaryExample" component={ErrorBoundaryExample}/>
                        <Route path="/examples/authorizationExample" component={AuthorizationExample}/>
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

// Toasts Example

const Toasts = () => {
    const handleSuccessToast = () => {toast.success('Success!', {position: toast.POSITION.TOP_RIGHT})};
    const handleInfoToast = () => {toast.info('Info?', {position: toast.POSITION.TOP_CENTER})};
    const handleErrorToast = () => {toast.error('Error!', {position: toast.POSITION.BOTTOM_RIGHT})};
    return (
        <div>
            <div className="alert alert-info">
                Toasts using React-Toastify
            </div>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-success" onClick={handleSuccessToast}>Success Top Right</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-info" onClick={handleInfoToast}>Info Top Middle</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-danger" onClick={handleErrorToast}>Error Bottom Right</button>
                </div>
            </div>
        </div>
    )
};

// Update Nested State

const NestedState = () => {
    const [nested, setNested] = useState({active: true, name: "Some Shallow Name", nester: {active: false, name: "Some Name"}});

    const updateState = () => {

        // Example of some fancy console logging supported by chrome

        // if(console.group) to disable this type of logging when needed
        // if(process.env.NODE_ENV !== 'production') to only run a certain piece of code outside of production

        console.group("Update State");
        console.log('%c Before Message', 'color: orange');
        setNested(nest =>{
            return {...nest, nester:{...nest.nester, name: 'Some Other Name'}}
        });
        console.log('%c After Message', 'color: green');
        console.groupEnd("Update State");
    };

    return (
        <div>
            <p>An example of updating an object with nested properties.  A few things to remember:</p>
            <ul>
                <li>The spread operator does a shallow clone, anything nested is by reference.  Make sure you set nested properties like shown above</li>
                <li>Consider using a library for deep cloning such as lodash.deepClone</li>
                <li>React DOES NOT update when setState is called with mutated state, if you want to forceUpdate there is a hack to do that listed on the React Hooks FAQ.</li>
            </ul>
            <button type="button" onClick={updateState}>Update State</button>
            <br/>
            {`Shallow Active: ${nested.active}`}
            <br/>
            {`Shallow Name: ${nested.name}`}
            <br/>
            {`Deep Active: ${nested.nester.active}`}
            <br/>
            {`Deep Name: ${nested.nester.name}`}
        </div>
    )
};

// TODO with useReducer Example

const initialTodos = [
    {id: v4(), task: 'Learn useReducer', complete: false},
    {id: v4(), task: 'Learn Redux', complete: false}
];

const todoReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TODO':
            return state.concat({
                id: v4(),
                task: action.task,
                complete: false
            });
        case 'TOGGLE_TODO':
            return state.map(todo => {
               if(todo.id === action.id){
                   return {...todo, complete: !todo.complete};
               } else {
                   return todo;
               }
            });
        case 'REMOVE_TODO':
            return state.filter( todo =>
                todo.id !== action.id
            );
        default:
            return state;
    }
};

const TodoExample = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialTodos);

    const handleToggle = (todo) => {
        dispatch({id: todo.id, type: 'TOGGLE_TODO'});
    };

    const handleAddTodo = (event) => {
        if(event.keyCode === 13){
            const task = event.target.value;
            if(task === undefined || task === ''){
                alert('You need to enter a description for the task.')
            } else {
                dispatch({
                    type: 'ADD_TODO',
                    task: event.target.value
                });
                event.target.value = '';
            }
        }
    };

    const handleRemoveTodo = (todo) => {
        dispatch({type: 'REMOVE_TODO', id: todo.id});
    };

    return (
        <>
            <h2>TODOs ({todos.length})</h2>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} onClick={() => handleToggle(todo)}>
                        {todo.task} - {todo.complete ? 'Complete' : 'Outstanding'}
                        <button type="button" className="btn btn-sm btn-outline-danger ml-1" onClick={() => handleRemoveTodo(todo)}>
                            <FontAwesomeIcon icon={faTrash} size="sm" fixedWidth={true}/>
                        </button>
                    </li>
                ))}
                {todos.length === 0 && (
                    <li>No TODOs, add some below</li>
                )}
            </ul>
            <input type="text" className="form-control" autoFocus onKeyDown={handleAddTodo} placeholder="Add a todo here and press enter."
                   title={"Enter a task description and press enter."}/>
        </>
    )
};

// Crud Example

const crudObjects = [
    {id: v4(), name: 'First Object', booleanOne: false, booleanTwo: false, booleanThree: false, _deepObject: [{label: 'One', text: 'Two'},{label:'Three', text: 'Four'}]},
    {id: v4(), name: 'Second Object', booleanOne: false, booleanTwo: true, booleanThree: false, _deepObject: [{label: 'One', text: 'Two'},{label:'Three', text: 'Four'}]},
    {id: v4(), name: 'Third Object', booleanOne: true, booleanTwo: true, booleanThree: true, _deepObject: [{label: 'One', text: 'Two'},{label:'Three', text: 'Four'}]},
];

const itemReducer = (state, action) => {
    switch(action.type){
        case 'TOGGLE_FLAG':
            return state.map(item => {
                if(item.id === action.id){
                    return {...item, [action.name]: !item[action.name]};
                } else {
                    return item;
                }
            });
        default:
            return state;
    }
};

const CrudExample = () => {
    const [items, dispatch] = useReducer(itemReducer, crudObjects);

    const logState = () => {
        console.log(items);
    };

    return (
        <>
            <h2>Crud List Example</h2>
            <p>This example was to challenge myself to keep state at the top level component and not set any state when
            passing params.  Things I noticed:</p>
            <ul>
                <li>When I updated a toggle React renders the entire list again due to the state change.</li>
            </ul>
            <div className="text-right mb-2">
                <button type="button" className="btn btn-sm btn-outline-info" onClick={logState}>Log State</button>
            </div>
            <div className="list-group">
                {items.map(item =>
                    <CrudExampleItem key={item.id} item={item} dispatch={dispatch} />
                )}
            </div>
        </>
    )
};

const CrudExampleItem = ({item, dispatch}) => {
    return (
        <div className="list-group-item">
            {item.name}
            <hr/>
            <div className="form form-inline align-items-center d-flex justify-content-between">
                <CrudExampleItemToggle id={item.id} name={"booleanOne"} label={"Boolean One?"} value={item.booleanOne} dispatch={dispatch}/>
                <CrudExampleItemToggle id={item.id} name={"booleanTwo"} label={"Boolean Two?"} value={item.booleanTwo} dispatch={dispatch}/>
                <CrudExampleItemToggle id={item.id} name={"booleanThree"} label={"Boolean Three?"} value={item.booleanThree} dispatch={dispatch}/>
            </div>
        </div>
    )
};

const CrudExampleItemToggle = ({id, name, value, label, dispatch}) => {
    const handleToggle = () => {
        dispatch({
            type: 'TOGGLE_FLAG',
            id,
            name
        });
    };
    return (
        <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id={`js-${name}-${id}`} onChange={handleToggle} checked={value}/>
            <label className="custom-control-label" htmlFor={`js-${name}-${id}`}>{label}</label>
        </div>
    )
};

const initialErrorState = [
    {message: 'Error 1', property: 'name'},
    {message: 'Error 2', property: 'name'},
    {message: 'Error 3', property: 'email'},
];


const ChildrenExample = () => {
    const [errors, setErrors] = useState([initialErrorState]);
    const [fake, setFake] = useState('');

    return (
        <>
            <button type="button" className="btn btn-sm btn-outline-info" onClick={() => setErrors([])}>Remove Errors</button>
            <button type="button" className="btn btn-sm btn-outline-danger ml-2" onClick={() => setErrors(initialErrorState)}>Add Errors</button>
            <MyFormGroup errors={errors} property="name">
                <label htmlFor="me">Label</label>
                <input type="text" className="form-control" id="me" name="name" value={fake} onChange={(evt) => setFake(evt.target.value)}/>
                <div className="form-text">
                    Some Help Text
                </div>
            </MyFormGroup>
        </>
    )
};

const MyFormGroup = ({children, errors, property}) => {

    const filteredErrors = errors.filter(error => error.property === property);

    const newChildren = React.Children.map(children, (child) => {

        let additionalClass = "";
        switch(child.type){
            case "label":
                additionalClass = errors.length > 0 ? "text-danger" : "";
                break;
            case "input":
                additionalClass = errors.length > 0 ? "is-invalid" : "";
                break;
            case "div":
                additionalClass = errors.length > 0 ? "invalid-feedback" : "";
                break;
            default:
                additionalClass = "";
        }

        return React.cloneElement(child, {...child.props, className:  filteredErrors.length > 0 ? child.props.className + " " + additionalClass : child.props.className});
    });

  return (
    <div>
        {newChildren}
        {filteredErrors && filteredErrors.length > 0 && (
            <div>
                <ul>
                    {filteredErrors.map(error =>
                        <li>{error.message}</li>
                    )}
                </ul>
            </div>
        )}
    </div>
  )
};

const ErrorBoundaryExample = () => {
    const [innerError, setInnerError] = useState(false);
    const [outerError, setOuterError] = useState(false);

    const handleHandlerError = () => {
        throw Error('Handler Error');
    };

    if(innerError){
        throw Error('Inner Error');
    }

    if(outerError){
        throw Error('chuck it');
    }

    return (
        <div>
            <h2>Error Boundary Example</h2>
            <p>This shows an example of using error boundaries.  I currently have an inner boundary and outer boundary
            in place.  The buttons below help test the boundaries.  Remember to press the 'X' on the React development
            error page so that you can see the boundary result (fallback UI).</p>
            <p>Take note of the following:</p>
            <ul>
                <li>The first two buttons throw errors outside of handler methods and are caught by the boundary.  The third button throws an error in a handler method and is not caught by either boundary.</li>
            </ul>

            <button type="button" className="btn btn-warning" onClick={() => setInnerError(true)}>Test Inner Boundary</button>
            <button type="button" className="btn btn-danger ml-2" onClick={() => setOuterError(true)}>Test Outer Boundary</button>
            <button type="button" className="btn btn-info ml-2" onClick={handleHandlerError}>Test Handler Error</button>
        </div>
    )
};

const hasRole = (user, roles) => {
    if(!(roles instanceof Array)){
        throw Error('The roles parameter must be an array of Strings');
    }
    return roles.some(role => user.roles.includes(role));
};

const AuthorizationExample = () => {

    const normalUser = {
        roles: ['Everyone']
    };

    const adminUser = {
        roles: ['Everyone', 'Admin']
    };

    return (
        <>
            <h2>Authorization Example</h2>
            <p>There are libraries out there that do authorization for React, but in most cases this is a simple check
            based on roles/abilities and rendering/allowing an action based on that.  In this case I have implemented
            a simple hasRole function to demonstrate authorization.  This method can be adapted to most use cases.</p>
            <hr/>
            <h4>User with Everyone Role</h4>
            <AuthComponent user={normalUser}/>
            <hr/>
            <h4>User with Admin Role</h4>
            <AuthComponent user={adminUser}/>
        </>
    )
};

const AuthComponent = ({user}) => {
    return (
        <>
            {hasRole(user, ['Everyone']) && (
                <div>This user has the everyone role.</div>
            )}
            {hasRole(user, ['Admin']) && (
                <div>This user has the admin role.</div>
            )}
        </>
    )
};

export default Examples;