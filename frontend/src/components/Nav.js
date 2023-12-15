import React from 'react'
import {ReactComponent as HomeIcon} from '../svgs/home.svg'
import {ReactComponent as SearchIcon} from '../svgs/search.svg'
import {ReactComponent as ItineraryIcon} from '../svgs/itinerary.svg'
import {ReactComponent as Logo} from '../svgs/logo.svg'
import { Link } from 'react-router-dom'

// function openTab(evt) {
//   // Declare all variables
//   var i, tablinks;

//   // Get all elements with class="tablinks" and remove the class "active"
//   tablinks = document.getElementsByClassName("tablinks");
//   for (i = 0; i < tablinks.length; i++) {
//     // tablinks[i].style.background = "black";
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }
//   evt.currentTarget.className += " active";
//   // evt.currentTarget.style.background = "#282828";
//   return
// }
// function addListeners() {
//   const home = document.getElementById("home");
//   home.addEventListener("click", openTab.bind(this));
//   const search = document.getElementById("search");
//   search.addEventListener("click", openTab.bind(this));
//   const itinerary = document.getElementById("itinerary");
//   itinerary.addEventListener("click", openTab.bind(this));
// }

const Nav = () => {
    // addListeners()
    return (
        <div className="navBar">
          <div className="logo">
          <Logo/>
          </div> 

          <ul>
            <Link to="/" className='link'>
              <li className="tablinks" id="home"><HomeIcon/> Home</li>
            </Link>
            <Link to="/search" className='link'>
              <li className="tablinks" id="search"><SearchIcon/> Search</li> 
            </Link>
            <Link to="/new-itinerary" className='link'>
              <li className="tablinks" id="itinerary"><ItineraryIcon/> New Itinerary</li>
            </Link>
            <Link to="/signup" className='link'>
              <li className="tablinks" id="itinerary">Sign Up</li>
            </Link>
            <Link to="/login" className='link'>
              <li className="tablinks" id="itinerary">Log In</li>
            </Link>
          </ul>
          <div className="cookies">
              <span>Cookies</span>
              <span>Privacy Policy</span>
          </div>
        </div>
    )
}

export default Nav
