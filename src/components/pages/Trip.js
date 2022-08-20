import React from 'react'
import {ReactComponent as FavoriteIcon} from '../../svgs/favorite.svg'
import {ReactComponent as AddToIcon} from '../../svgs/addTo.svg'
const TripPage = (props) => {
    return (
        <div className = "tripPage"> 
            <div className = "tripPageInfo">
                <div className = "tripPageImage">
                    <img src="https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" alt="pic"/>
                </div>
                <h1>Title</h1>
                <p>Authors</p>
                <button>Start Trip</button>
                <div className="icons">
                    <span className="iconsFavorite">
                        <FavoriteIcon/>
                    </span>
                    <span className="iconsDots">
                        <AddToIcon/>
                    </span>
                </div>
                <p>Trip Description</p>
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