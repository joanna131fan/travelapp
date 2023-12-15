import React from 'react'
import Categories from './Categories'
import Search from './Search'
import ItineraryForm from './ItineraryForm'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { Routes, Route, useNavigate } from 'react-router-dom'
import TripPage from './pages/Trip'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="main">
            <div className="upperNav">
            <button onClick={() => navigate(-1)}>{'<'} </button>
            <button onClick={() => navigate(1)}>{'>'}</button>
            </div>
            <div className="mainContent">
                <Routes>
                    <Route path="/" element={<Categories/>}></Route>
                    <Route path="/search/*" element={<Search/>}>Search</Route>
                    <Route path="/new-itinerary/*" element={<ItineraryForm/>}>New Itinerary</Route>
                    <Route path="/trip/:id/*" element={<TripPage/>}></Route>
                    <Route path="/signup/*" element={<RegisterForm/>}></Route>
                    <Route path="/login/*" element={<LoginForm/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Home