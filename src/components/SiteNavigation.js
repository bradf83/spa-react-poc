import React from "react";
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

class SiteNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="mb-2">
                <Navbar color="light" light expand="md">
                    <Container>
                        <NavbarBrand href="/">React POC</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/companies">Companies</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/products">Products</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/exampleList">Examples</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/campingApp">Camping App</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/codeGenerator">Code Generator</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default SiteNavigation;