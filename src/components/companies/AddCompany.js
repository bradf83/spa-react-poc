// TODO Convert to a hook?
import React from "react";
import {Alert, Button, Container, Form, FormGroup, Input, Label, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";
import {withAuth} from '@okta/okta-react';

class AddCompany extends React.Component {

    emptyCompany = {
        code: '',
        name: '',
        owner: '',
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
            this.setState({owners: body._embedded.owners});
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
        company[name] = value;
        this.setState({company});
    }

    // TODO: Use React Router to push history and forward to the companies list page.  Example here: (https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot)
    async handleSubmit(event){
        event.preventDefault();
        let company = {...this.state.company};
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
                console.log('process errors')
            } else {
                const body = await response.json();
                // Props: entity, property, invalidValue, message
                this.setState({errors: body.errors});
            }
        } catch(error){
            // An unexpected error occurred.
            // TODO: log or do something
        }
    }

    render(){
        const {company, errors, owners} = this.state;
        return (
            <Container>
                <h3>Add Company</h3>
                <Alert color="warning">
                    This no longer works as I need to implement an owner selector.  It displays errors now in a rudimentary form.
                </Alert>
                {errors.length > 0 &&
                    <Alert color="danger">
                        <ul>
                            {errors.map(error =>
                                <li key={error.entity + "" + error.property + "" + error.message}>{error.message}</li>
                            )}
                        </ul>
                    </Alert>
                }

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="code">Code</Label>
                        <Input type="text" name="code" id="code" value={company.code || ''} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={company.name || ''} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="owner">Owner</Label>
                        <Input type="select" name="owner" value={company.owner || ''} onChange={this.handleChange}>
                            {owners && owners.map(({ firstName, _links}) => (
                                <option key={_links.self.href} value={_links.self.href}>
                                    {firstName}
                                </option>
                            ))}
                        </Input>
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

export default withAuth(AddCompany);