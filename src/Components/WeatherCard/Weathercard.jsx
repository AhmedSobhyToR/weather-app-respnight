import React, { useEffect, useRef, useState } from "react";
import "./Weathercard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import clear from "../../Assets/clear.png";
import clouds from "../../Assets/cloud.png";
import drizzle from "../../Assets/drizzle.png";
import humidity from "../../Assets/humidity.png";
import rain from "../../Assets/rain.png";
import snow from "../../Assets/snow.png";
import wind from "../../Assets/wind.png";
import Weatherforecast from "../WeatherForecast/Weatherforecast";
import {v4 as uuid} from "uuid"

const Weathercard = () => {
    const APIKey = "881544f82739b6c08fd6e18b85cbb164";
    const [weatherData,setWeatherData] = useState(false);
    const [forecastData, setForecastData] = useState([]);
    const r= useRef (null);
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            getWeatherByCityName(r.current.value);
            getWeatherForecast(r.current.value);
        }
    };
    const all_icons = {
        "01d" : clear,
        "01n" : clear,
        "02d" : clouds,
        "02n" : clouds,
        "03d" : clouds,
        "03n" : clouds,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "10d" : rain,
        "10n" : rain,
        "13d" : snow,
        "13n" : snow


    }
    async function getWeatherByCityName(cityName) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKey}`
            );
            if (response.ok) {
                const data = await response.json();
                setWeatherData({
                    weatherState: all_icons[data.weather[0].icon],
                    degree : Math.floor(data.main.temp),
                    city : data.name,
                    humiditydeg : data.main.humidity,
                    winddeg : data.wind.speed,
                    description: data.weather[0].description
                  
                })



            }
            else{
                setWeatherData(false);
            }
        } catch (error) {
           
            console.error("Error:", error);
        }
    }
    function getDayOfWeek(dateString) {
        const date = new Date(dateString);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[date.getDay()];
        return dayName;
    }
    async function getWeatherForecast(cityName){
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIKey}`
            );
            if (response.ok) {
                const data = await response.json();
                setForecastData([
                    {temp_min:Math.floor(data.list[0].main.temp_min), temp_max: Math.floor(data.list[0].main.temp_max),
                        forecastTemp: all_icons[data.list[0].weather[0].icon],description: data.list[0].weather[0].main,
                    day:"Today"},

                    {temp_min:Math.floor(data.list[8].main.temp_min), temp_max: Math.floor(data.list[8].main.temp_max),
                        forecastTemp: all_icons[data.list[8].weather[0].icon],description: data.list[8].weather[0].main,
                    day:"Tomorrow"},

                    {temp_min:Math.floor(data.list[16].main.temp_min), temp_max: Math.floor(data.list[16].main.temp_max),
                        forecastTemp: all_icons[data.list[16].weather[0].icon], description: data.list[16].weather[0].main,
                    day:getDayOfWeek(data.list[16].dt_txt)},

                    {temp_min:Math.floor(data.list[24].main.temp_min), temp_max: Math.floor(data.list[24].main.temp_max),
                        forecastTemp: all_icons[data.list[24].weather[0].icon],description: data.list[24].weather[0].main,
                    day:getDayOfWeek(data.list[24].dt_txt)},

                    {temp_min:Math.floor(data.list[32].main.temp_min), temp_max: Math.floor(data.list[32].main.temp_max),
                        forecastTemp: all_icons[data.list[32].weather[0].icon],description: data.list[32].weather[0].main,
                    day:getDayOfWeek(data.list[32].dt_txt)}
                ])

            }
            else{
             
            }
        } catch (error) {
           
            console.error("Error:", error);
        }
    }
    useEffect(()=>{
        
        getWeatherByCityName("Cairo");
        getWeatherForecast("Cairo");
},[])
    return (
        <div className="weather">
            <div className="search-bar">
                <input
                    type="input"
                    name="search-city"
                    id="search-city"
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                ref={r}/>
                <button
                    onClick={() => {
                        getWeatherByCityName(r.current.value);
                        getWeatherForecast(r.current.value);
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            {weatherData?<>
                <div className="weather-state">
                <img src={weatherData.weatherState} alt="" />
            </div>

            <div className="temperature">
                <h1 className="degree">{weatherData.degree}&deg; C <span>{weatherData.description}</span></h1>
               
                <h1 className="ciy">{weatherData.city}</h1>
            </div>
            <div className="footer">
                <div className="humidity">
                    <img src={humidity} alt="" />
                    <div>
                        <p>{weatherData.humiditydeg}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className="wind">
                    <img src={wind} alt="" />
                    <div>
                     
                        <p>{weatherData.winddeg}Km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
            <div className="weather-forecast">
                <ul>
                    {
                        forecastData.map((d)=>{
                            return(    
                                <Weatherforecast key={uuid()} data= {d} icons= {all_icons} ></Weatherforecast>
                            )

                        })
                    }

                </ul>
            </div>
            </>:
             <>
            <div className="city-not-found"> Invalid City Name
            </div>
            </>}

        </div>
    );
};

export default Weathercard;
