// TODO Convert to a hook?
import React from "react";
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {withAuth} from '@okta/okta-react';

class AddCompany extends React.Component {

    emptyCompany = {
        code: '',
        name: '',
    };

    constructor(props){
        super(props);
        this.state = {
            company: this.emptyCompany
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    // TODO: This is handling perfect path, what about errors and such
    // TODO: Use React Router to push history and forward to the companies list page.  Example here: (https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot)
    async handleSubmit(event){
        event.preventDefault();
        let company = {...this.state.company};
        const token = await this.props.auth.getAccessToken();
        await fetch('/companies', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(company)
        });
    }

    render(){
        const {company} = this.state;
        return (
            <Container>
                <h3>Add Company</h3>
                <Alert color="warning">
                    This no longer works as I need to implement an owner selector.
                </Alert>
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
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/companies">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

export default withAuth(AddCompany);