// TODO Convert to a hook?
import React from "react";
import {Alert, Button, Container, Form, FormGroup, Input, Label, FormFeedback} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import {withAuth} from '@okta/okta-react';

// TODO: I think I will want an object that holds the entire form for the following reasons:
// 1. Clearing errors before POST (incase there were errors from a previous attempt)
// 2. Taking the state and building a POST body
class FormControlState {
    constructor(value = ''){
        this.value = value;
        this.errors = [];
    }

    isValid() {return this.errors.length === 0}

    clearErrors() {this.errors = [];}

    /**
     * It does not look like Bootstrap 4 allows multiple FormFeedback under the input so need to combine multiple error
     * messages into one.
     * @returns {string}
     */
    buildErrorMessage(){
        return this.errors.map(({message}) => message).join(' ');
    }

}

class AddCompany extends React.Component {

    // Initial State
    emptyCompany = {
        code: new FormControlState(''),
        name: new FormControlState(''),
        owner: new FormControlState(''),
    };

    constructor(props){
        super(props);
        this.state = {
            company: this.emptyCompany,
            errors: [],
            owners: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const token = await this.props.auth.getAccessToken();
        try{
            const response = await fetch("/owners", {headers: {"Authorization": "Bearer " + token}});
            const body = await response.json();
            const owners = body._embedded.owners;

            // TODO: If this is reused for edit this will need to be smarter.
            // Set the owner select box to the first owner.
            if(owners.length > 0){
                let company = {...this.state.company};
                company.owner.value = owners[0]._links.self.href;
                this.setState({owners: owners, company: company});
            } else {
                this.setState({owners: owners});
            }


        } catch(error){
            //TODO: What to do with error?
        }
    }

    /**
     * On Change update the company with the changes
     * @param event
     */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let company = {...this.state.company};
        // TODO: I notice Ben surrounds his name attribute in quotes, I do not, which way is better?
        company[name].value = value;
        this.setState({company});
    }

    async handleSubmit(event){
        event.preventDefault();
        let formCompany = {...this.state.company};

        //TODO: Need to clear errors before posting, ideally a form object would provide this behavior through a single method call.
        formCompany.code.clearErrors();
        formCompany.name.clearErrors();
        formCompany.owner.clearErrors();

        //TODO: A form object should provide a method toPostBody() or something
        let company = {code: formCompany.code.value, name: formCompany.name.value, owner: formCompany.owner.value};

        const token = await this.props.auth.getAccessToken();
        try{
            const response = await fetch('/companies', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(company)
            });

            if(response.ok){
                // Forward to list screen
                this.props.history.push('/companies');
            } else {
                const body = await response.json();
                // Place the errors into the FormControlState
                // TODO: could there be errors that don't relate to a field?
                // Props: entity, property, invalidValue, message
                let formCompany = {...this.state.company};
                body.errors.forEach(function(error){
                    formCompany[error.property].errors.push(error);
                });
                this.setState({company: formCompany});
            }
        } catch(error){
            // An unexpected error occurred.
            // TODO: log or do something
        }
    }

    render(){
        const {company, owners} = this.state;
        const {code, name, owner} = company;

        return (
            <Container>
                <h3>Add Company</h3>
                <Alert color="warning">
                    This is a work in progress, on save it works (check network) or displays errors.  Does not clear the form on success though.
                </Alert>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="code">Code</Label>
                        <Input type="text" name="code" id="code" value={code.value} onChange={this.handleChange} invalid={!code.isValid()}/>
                        {!code.isValid() && (
                            <FormFeedback>{code.buildErrorMessage()}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={name.value} onChange={this.handleChange} invalid={!name.isValid()}/>
                        {!name.isValid() && (
                            <FormFeedback>{name.buildErrorMessage()}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="owner">Owner</Label>
                        <Input type="select" name="owner" value={owner.value} onChange={this.handleChange} invalid={!owner.isValid()}>
                            {owners && owners.map(({ firstName, _links}) => (
                                <option key={_links.self.href} value={_links.self.href}>
                                    {firstName}
                                </option>
                            ))}
                        </Input>
                        {!owner.isValid() && (
                            <FormFeedback>{owner.buildErrorMessage()}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/companies">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

export default withAuth(withRouter(AddCompany));