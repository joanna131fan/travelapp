import React from 'react'
import {ReactComponent as FavoriteIcon} from '../../svgs/favorite.svg'
import {ReactComponent as AddToIcon} from '../../svgs/addTo.svg'
// import dataTrips from '../../components/TripData'
import { useLocation } from 'react-router-dom'
const TripPage = props => {
    const location = useLocation();
    const state = location.state;
    return (
        <div className = "tripPage"> 
            <div className = "tripPageInfo">
                <div className = "tripPageImage">
                    <img src={ state.trip.img } alt="pic"/>
                </div>
                <h1>{ state.trip.name }</h1>
                <p>{ state.trip.authors }</p>
                <button>Start Trip</button>
                <div className="icons">
                    <span className="iconsFavorite">
                        <FavoriteIcon/>
                    </span>
                    <span className="iconsDots">
                        <AddToIcon/>
                    </span>
                </div>
                <p>{ state.trip.dates }</p>
            </div>
            <div className="tripItinerary">
                <ul>
                    <li>Event 1</li>
                    <li>Event 2</li>
                    <li>Event 3</li>
                    <li>Event 4</li>
                    <li>Event 5</li>
                </ul>
            </div>
        </div>
    )
}

export default TripPage