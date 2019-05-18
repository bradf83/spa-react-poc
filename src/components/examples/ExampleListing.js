import React from 'react';
import Container from "reactstrap/es/Container";
import {NavLink} from "react-router-dom";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ExampleCard = (params) => {
    const themes = [
        undefined,
        'bg-dark',
        'bg-danger',
        'bg-primary',
        'bg-secondary',
        'bg-success',
        'bg-warning',
        'bg-info',
    ];
    // Random card theme.  This could be better!
    const themeColour = themes[Math.floor(Math.random() * themes.length)];

    return (
        <div className={"card" + (themeColour ? " text-white " + themeColour : "")}>
            <div className="d-flex justify-content-between card-header">
                <div>{params.title}</div>
                <div>
                    <NavLink to={params.location}>
                        <FontAwesomeIcon className={themeColour ? "text-white" : ""} icon={faLink} size="sm"/>
                    </NavLink>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{params.description}</p>
            </div>
        </div>
    )
};

const ExampleList = () => {
    const examples = [
        {title: 'Model or Process with Side Menu', location: '/examples/summary', description: 'When you have a model or process that can be broken up and saved in smaller chunks.'},
        {title: 'Error Handling In a Form', location: '/examples/products/create', description: 'Different ways to handle errors in a form. Globally at the top. Inline with the form fields.'},
        {title: 'Creating a List of Objects', location: '/examples/products/', description: 'A list of objects that you may create more, delete or edit from.'},
        {title: 'Profile Example', location: '/examples/owner', description: 'A profile example that needs a lot of work!'},
    ];

    // Using the title as the key here, would use a better key if this was not an example.
    const exampleCards = examples.map(example => <ExampleCard key={example.title} {...example} />);
    return (
        <Container>
            <div className="alert alert-info">
                <h6>TODO</h6>
                <ul>
                    <li>Make this searchable</li>
                </ul>
            </div>

            <h4>Examples</h4>
            <p>Click on an example to see the example.</p>

            <div className="card-columns">
                {exampleCards}
            </div>
        </Container>
    )
};

export default ExampleList;