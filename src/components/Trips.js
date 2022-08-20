import React from 'react'
import { Link } from 'react-router-dom'
import dataTrips from './TripData'

const Trips = (props) => {

    const matchedTrips = dataTrips.filter(trip => trip.category_id === props.category_id)
    return(
        <div>                   
        <div className = "horizontalCards">
            {matchedTrips.map((trip, id) => (
            <Link to={`/trip/` + trip.id} 
                state={{ trip: trip }} className = 'link'>
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