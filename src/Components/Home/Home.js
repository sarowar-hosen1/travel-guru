import React from 'react';
import Navbar from '../Navbar/Navbar';
import TravelPlaces from '../TravelPlaces/TravelPlaces';
import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <TravelPlaces></TravelPlaces>
        </div>
    );
};

export default Home;