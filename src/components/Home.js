import {Container} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Home = () => {
    return (
        <Container>
            <h3>
                <FontAwesomeIcon icon={faHome} size="sm" className="mr-1"/>
                Welcome
            </h3>
            <p>To the React POC application utilizing React, React Router, Bootstrap and Spring Boot!</p>
        </Container>
    )
};

export default Home