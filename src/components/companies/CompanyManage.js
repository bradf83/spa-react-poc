import React, {useState, useEffect} from 'react';
import {Button, Container, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import { withAuth } from '@okta/okta-react';
import {Link, withRouter} from "react-router-dom";
import API from "../../api";
import {toast} from "react-toastify";

// Helpers that need to be extracted

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

const initialState = () => ({
    code: '',
    name: '',
    owner: '',
});

// Component

const CompanyManage = ({auth, history, match}) => {
    const [formState, setFormState] = useState(initialState());
    const [errors, setErrors] = useState([]);

    const [owners, setOwners] = useState([]);
    useEffect(() => {
        const {loadOwners} = API(auth);
        const loadData = async () => {
            try{
                const response = await loadOwners();
                const body = await response.json();
                setOwners(body._embedded.owners);
            } catch(error){
                //TODO: What to do with error?
            }
        };
        loadData();
    }, [auth]);

    //TODO: Is this the right way to do this?  Could useCallback help?.
    useEffect(() => {
        if(owners.length > 0){
            const filtered = owners.filter(own => own._links.self.href === formState.owner);
            // TODO: What should we do if the value is not found?  Clear the value?  Set it to first element?
            if(filtered.length === 0){
                let newState = {...formState};
                newState.owner = owners[0]._links.self.href;
                setFormState(newState);
            }
        }

    }, [owners, formState]);

    useEffect(() => {
        if(match.params.id){
            const {loadCompany} = API(auth);
            const loadData = async () => {
                try{
                    const response = await loadCompany(match.params.id);
                    const body = await response.json();
                    const newState = {
                        code: body.code,
                        name: body.name,
                        owner: body._links.ownerLink.href
                    };
                    setFormState(newState);
                } catch(error){
                    //TODO: What to do with error?
                }
            };
            loadData();
        }
    }, [auth, match]);

    const handleSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        const {saveCompany} = API(auth);
        try{
            const response = await saveCompany(formState, match.params.id);

            if(response.ok){
                // Forward to list screen
                toast.success("Success!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                history.push('/companies');
            } else {
                const body = await response.json();
                setErrors(body.errors);
            }
        } catch(error){
            // An unexpected error occurred.
            // TODO: log or do something
        }
    };

    const handleChange = ({target}) => {
        let newState = {...formState};
        newState[target.name] = target.value;
        setFormState(newState);
    };

    return (
        <Container>
            <h3>Create Company</h3>

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="code">Code</Label>
                    <Input type="text" name="code" id="code" value={formState.code} onChange={handleChange} invalid={hasFieldErrors("code", errors)}/>
                    <FieldErrors field="code" errors={errors}/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={formState.name} onChange={handleChange} invalid={hasFieldErrors("name", errors)}/>
                    <FieldErrors field="name" errors={errors}/>
                </FormGroup>
                <FormGroup>
                    <Label for="owner">Owner</Label>
                    <Input type="select" name="owner" value={formState.owner} onChange={handleChange} invalid={hasFieldErrors("owner", errors)}>
                        {owners && owners.map(({ firstName, _links}) => (
                            <option key={_links.self.href} value={_links.self.href}>
                                {firstName}
                            </option>
                        ))}
                    </Input>
                    <FieldErrors field="owner" errors={errors}/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/companies">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    )
};

export default withAuth(withRouter(CompanyManage));