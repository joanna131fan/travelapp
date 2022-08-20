import React from 'react'
import { Link } from 'react-router-dom'

const Trips = (props) => {
    const dataTrips = [
        {
            id: 101,
            category_id: 1,
            name: 'Trip to Hawaii',
            img: 'https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
            dates: '6/13-6/21'
        },
        {
            id: 102,
            category_id: 1,
            name: 'Trip to Cancun',
            img: 'https://images.unsplash.com/photo-1552074283-095fd4e8dfc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            dates: '8/05-8/11'
        },
        {
            id: 104,
            category_id: 1,
            name: 'Trip to Tahoe',
            img: 'https://images.unsplash.com/photo-1577416026704-0fe2d48a0f20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            dates: '10/13-10/29'
        },
        {
            id: 103,
            category_id: 2,
            name: 'Trip to New York City',
            img: 'https://images.unsplash.com/photo-1567363607237-5d186116333c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80https://images.unsplash.com/photo-1567363607237-5d186116333c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
            dates: '10/13-10/16'
        },
        {
            id: 105,
            category_id: 3,
            name: 'Trip to Florence',
            img: 'https://images.unsplash.com/photo-1543429258-cc721a300e8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            dates: '9/13-9/20'
        },
        {
            id: 106,
            category_id: 3,
            name: 'Trip to Barcelona',
            img: 'https://images.unsplash.com/photo-1593368858664-a7fe556ab936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJhcmNlbG9uYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
            dates: '12/2-12/11'
        },
    ]

    const matchedTrips = dataTrips.filter(trip => trip.category_id === props.category_id)
    return(
        <div>                   
        <div className = "horizontalCards">
            {matchedTrips.map((trip, id) => (
            <Link to={`/trip/` + trip.id + trip.name} className = 'link'>
                <div className="card" key={id}>
                    <div className="cardImage">
                        <img src={trip.img} alt = "Trip"/>
                    </div>
                    <div className="cardContent">
                        <h3>{trip.name}</h3>
                        <h5>{trip.dates}</h5>
                    </div>
                </div>
            </Link>
            ))}
            
        </div>
        </div>
    )
}

export default Trips