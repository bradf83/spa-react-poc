import React, { useState, useEffect } from 'react';
import v4 from 'uuid';
import {Link, Route, Switch} from "react-router-dom";

// The wife asking for an app to help her track what she needs for camping so here goes.
// Use local storage, turn this into a mobile app after.

// Functionality
// Select Camping Trip
// Create a new trip
// Remove a trip
// Add a list to a trip
// Remove a list from trip
// Add items to a list
// Remove items from a list
// Toggle item in list
// Edit item in list
// Save items to local storage


const sampleDataStructure = [{
    id: '1',
    name: 'Sample Trip',
    description: 'Sample Description',
    lists: [
        {
            id: '1',
            name: 'Sample List 1',
            description: 'Sample Description',
            items: [
                {id: '1', type: 'item', name: 'Stove', quantity: 1, completed: false},
                {id: '2', type: 'item', name: 'Axe', quantity: 1, completed: false},
            ]
        },
        {
            id: '2',
            name: 'Sample List 2',
            description: 'Sample Description 2',
            items: [
                {id: '3', type: 'item', name: 'Food', quantity: 1, completed: false},
                {id: '4', type: 'task', name: 'Do Dishes', quantity: 1, completed: false},
            ]
        }
    ]
}];


const CampingApp = ({match}) => {
    return (
        <div className="container">
            <h2>Camping App</h2>
            <p>The camping trip app made just for my wife :D</p>
            <Switch>
                <Route path={`${match.url}/trip/:tripId`} component={Trip}/>
                <Route component={Trips}/>
            </Switch>
        </div>
    )
};

const Trips = ({match}) => {
    return (
        <>
            <h3>Trips</h3>
            <div className="list-group">
                {sampleDataStructure.map( trip =>
                    <Link key={trip.id} to={`${match.url}/trip/${trip.id}`} className="list-group-item list-group-item-action">
                        <strong>{trip.name}</strong>
                    </Link>
                )}
            </div>
        </>
    )
};

const Trip = ({match: {params: {tripId}}}) => {
    const [trip, setTrip] = useState(null);
    const [selectedList, setSelectedList] = useState(sampleDataStructure[0].lists[1].id);

    useEffect(() => {
        setTrip(sampleDataStructure.find(element => element.id === tripId))
    }, [tripId]);

    const handleListChange = ({target: {value}}) => {
        setSelectedList(value);
    };

    return (
        <>
            {trip && (
                <>
                    <h2>{trip.name}</h2>
                    <select name="selectedList" className="form-control" value={selectedList} onChange={handleListChange}>
                        {trip.lists.map(list =>
                            <option key={list.id} value={list.id}>{list.name}</option>
                        )}
                    </select>
                    <h3>Items</h3>
                    <p>{selectedList}</p>
                </>
            )}
        </>
    )
};

export default CampingApp;