import React, {useState, useEffect} from 'react';
import {Button, Container, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import { withAuth } from '@okta/okta-react';
import {Link, withRouter} from "react-router-dom";

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

const CompanyCreate = ({auth, history}) => {
    const [formState, setFormState] = useState(initialState());
    const [errors, setErrors] = useState([]);

    const [owners, setOwners] = useState([]);
    useEffect(() => {
        const loadOwners = async () => {
            const token = await auth.getAccessToken();
            try{
                const response = await fetch("/owners", {headers: {"Authorization": "Bearer " + token}});
                const body = await response.json();
                const retrievedOwners = body._embedded.owners;

                // TODO: If this is reused for edit this will need to be smarter.
                // Set the owner select box to the first owner.
                if(retrievedOwners.length > 0 && formState.owner === ''){
                    let newState = {...formState};
                    newState.owner = retrievedOwners[0]._links.self.href;
                    setFormState(newState);
                    setOwners(retrievedOwners);

                } else {
                    setOwners(retrievedOwners);
                }
            } catch(error){
                //TODO: What to do with error?
            }
        };
        loadOwners();
    }, [auth, formState]);

    const handleSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        const token = await auth.getAccessToken();
        try{
            const response = await fetch('/companies', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            });

            if(response.ok){
                // Forward to list screen
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
                    <Input type="text" name="code" id="code" value={formState.code.value} onChange={handleChange} invalid={hasFieldErrors("code", errors)}/>
                    <FieldErrors field="code" errors={errors}/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={formState.name.value} onChange={handleChange} invalid={hasFieldErrors("name", errors)}/>
                    <FieldErrors field="name" errors={errors}/>
                </FormGroup>
                <FormGroup>
                    <Label for="owner">Owner</Label>
                    <Input type="select" name="owner" value={formState.owner.value} onChange={handleChange} invalid={hasFieldErrors("owner", errors)}>
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

export default withAuth(withRouter(CompanyCreate));