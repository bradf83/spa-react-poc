import React, {useState, useEffect} from 'react';
import {Button, Container, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import { withAuth } from '@okta/okta-react';
import {Link, withRouter} from "react-router-dom";

//TODO: Trying to do a few things
// Select the default relationship on load

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
        const loadOwners = async () => {
            const token = await auth.getAccessToken();
            try{
                const response = await fetch("/owners", {headers: {"Authorization": "Bearer " + token}});
                const body = await response.json();
                const retrievedOwners = body._embedded.owners;
                setOwners(retrievedOwners);
            } catch(error){
                //TODO: What to do with error?
            }
        };
        loadOwners();
    }, [auth]);

    //TODO: Is this the right way to do this?  I think I need to understand that useCallback hook.
    useEffect(() => {
        if(owners.length > 0){
            console.log(formState.owner);
            const filtered = owners.filter(own => own._links.self.href === formState.owner);
            if(filtered.length === 0){
                let newState = {...formState};
                newState.owner = owners[0]._links.self.href;
                setFormState(newState);
            }
        }

    }, [owners, formState]);

    useEffect(() => {
        // TODO: Not sure I like this pattern, but it seems to work.  Don't like that in this case there are two lookups
        //  for the company data.
        if(match.params.id){

            const loadCompany = async () => {
                const token = await auth.getAccessToken();
                try{
                    const response = await fetch("/companies/" + match.params.id ? match.params.id : '', {headers: {"Authorization": "Bearer " + token}});
                    return await response.json();
                } catch(error){
                    //TODO: What to do with error?
                }
            };

            const loadRelationship = async (ownerLink) => {
                const token = await auth.getAccessToken();
                try{
                    const response = await fetch(ownerLink, {headers: {"Authorization": "Bearer " + token}});
                    return await response.json();
                } catch(error){
                    //TODO: What to do with error?
                }
            };

            const loadData = async () => {
                const companyInfo = await loadCompany();
                const ownerInfo = await loadRelationship(companyInfo._links.owner.href);
                const newState = {
                    code: companyInfo.code,
                    name: companyInfo.name,
                    owner: ownerInfo._links.self.href
                };
                setFormState(newState);
            };

            loadData();
        }
    }, [auth, match]);

    const handleSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        const token = await auth.getAccessToken();
        try{
            // TODO: Clean this up, maybe a better way?
            // TODO: Remember the API does not validate anything on update only CREATE right now
            const response = await fetch('/companies/' + (match.params.id ? '/' + match.params.id : ''), {
                method: match.params.id ? 'PATCH' : 'POST',
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