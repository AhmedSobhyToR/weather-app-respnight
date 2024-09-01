import React, { useEffect, useState } from 'react';
import './Weatherforecast.css'
const Weatherforecast = (props) => {

    return (
        <>
     <li>
        <div className="forecast-day"><p>{props.data.day}</p></div>
        <div className="forecast-temp"><img src={props.data.forecastTemp} alt="" /> <span>{props.data.description}</span></div>
        <div className="forecast-min-max"><span>{props.data.temp_max}&deg; /</span> <span>{props.data.temp_min}&deg;</span>  </div>
    </li>
        </>

    );
}

export default Weatherforecast;
