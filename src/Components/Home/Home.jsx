import React from 'react';
import './Home.css'
import Weathercard from '../WeatherCard/Weathercard';
const Home = () => {
    return (
        <div className='home-page'>
            <Weathercard></Weathercard>
            
        </div>
    );
}

export default Home;
