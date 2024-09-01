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
import mist from "../../Assets/mist.png"
import Weatherforecast from "../WeatherForecast/Weatherforecast";
import {v4 as uuid} from "uuid"
import Dayforecast from "../DayForecast/Dayforecast";

const Weathercard = () => {
    const APIKey = "881544f82739b6c08fd6e18b85cbb164";
    const [cityName, setCityName] = useState(null)
    const [weatherData,setWeatherData] = useState(false);
    const [forecastData, setForecastData] = useState([]);
    const r= useRef (null);
    const [backGround, setBackGround] = useState(null);
    const homebg = useRef(null);
    const bg = useRef(null);
    const bginput = useRef(null);
    function changeBackground() {
        if (backGround === 0) {
            homebg.current.style.backgroundImage = `linear-gradient(to right, rgba(221, 221, 221, 0.477),   rgba(83, 175, 251, 0.759),  rgba(31, 114, 182, 0.759))`;
            bginput.current.style.backgroundImage = `linear-gradient(to right, rgba(221, 221, 221, 0.477),   rgba(83, 175, 251, 0.759),  rgba(31, 114, 182, 0.759))`;
            r.current.style.backgroundImage = `linear-gradient(to right, rgba(221, 221, 221, 0.477),   rgba(83, 175, 251, 0.759),  rgba(31, 114, 182, 0.759))`;
            bg.current.style.backgroundImage = `linear-gradient(to right, rgba(221, 221, 221, 0.477),   rgba(83, 175, 251, 0.759),  rgba(31, 114, 182, 0.759))`;
        } else if (backGround === 1) {
            homebg.current.style.backgroundImage = `linear-gradient(to right, rgba(44, 36, 58, 0.562),  rgba(53, 14, 144, 0.66),  rgba(43, 15, 109, 0.721))`;
            bginput.current.style.backgroundImage = `linear-gradient(to right, rgba(44, 36, 58, 0.562),  rgba(53, 14, 144, 0.66),  rgba(43, 15, 109, 0.721))`;
            r.current.style.backgroundImage = `linear-gradient(to right, rgba(44, 36, 58, 0.562),  rgba(53, 14, 144, 0.66),  rgba(43, 15, 109, 0.721))`;
            bg.current.style.backgroundImage = `linear-gradient(to right, rgba(44, 36, 58, 0.562),  rgba(53, 14, 144, 0.66),  rgba(43, 15, 109, 0.721))`;
        }
    }
    useEffect(() => {
        changeBackground();
    }, [backGround]);

    const fetchData = async () => {
        try {
            setCityName("Cairo");
            await getWeatherByCityName("Cairo");
                  changeBackground();
            await getWeatherForecast("Cairo");
            await getDayForecast("Cairo");
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setCityName(r.current.value);
            getWeatherByCityName(r.current.value);
            getWeatherForecast(r.current.value);
            getDayForecast(r.current.value)
          
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
        "13n" : snow,
        "50d" : mist,
        "50n": mist,


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
                const morningnight = new Date(data.list[0].dt_txt);
                const timezone = morningnight.getHours();
                // Night Mode
                if(timezone >= 18){
                    setBackGround(1);
                }
                else{
                    setBackGround(0);
                }
               
                setForecastData([
                    {temp_min:Math.floor(data.list[0].main.temp_min), temp_max: Math.ceil(data.list[0].main.temp_max),
                        forecastTemp: all_icons[data.list[0].weather[0].icon],description: data.list[0].weather[0].main,
                    day:"Today"},

                    {temp_min:Math.floor(data.list[8].main.temp_min), temp_max: Math.ceil(data.list[8].main.temp_max),
                        forecastTemp: all_icons[data.list[8].weather[0].icon],description: data.list[8].weather[0].main,
                    day:"Tomorrow"},

                    {temp_min:Math.floor(data.list[16].main.temp_min), temp_max: Math.ceil(data.list[16].main.temp_max),
                        forecastTemp: all_icons[data.list[16].weather[0].icon], description: data.list[16].weather[0].main,
                    day:getDayOfWeek(data.list[16].dt_txt)},

                    {temp_min:Math.floor(data.list[24].main.temp_min), temp_max: Math.ceil(data.list[24].main.temp_max),
                        forecastTemp: all_icons[data.list[24].weather[0].icon],description: data.list[24].weather[0].main,
                    day:getDayOfWeek(data.list[24].dt_txt)},

                    {temp_min:Math.floor(data.list[32].main.temp_min), temp_max: Math.ceil(data.list[32].main.temp_max),
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

    const [filteredHours, setFilteredHours] = useState(null);
    const [filteredIconHours, setFilteredIconHours] = useState(null);
    const [filteredDegreeHours, setFilteredDegreHours] = useState(null);

    async function getDayForecast(cityName){
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIKey}`
            );
            if (response.ok) {
                const data = await response.json();
                const today = new Date().toISOString().slice(0, 10);
                const filteredDate = data.list.filter((item) => {
                    return item.dt_txt.startsWith(today);
                });
                const FH = filteredDate.map((i)=>{
                    const date = new Date(i.dt_txt); 
                    const x = date.getHours();
                    if(x> 12){
                        return `${x-12} pm`
                    }
                    else if (x===12){
                        return `${12} pm`
                    }
                    else{
                        return `${x} am`
                    }
                    
                })
                setFilteredHours(FH)
                const FIH = filteredDate.map((i)=>{
                    return all_icons[i.weather[0].icon]
                })
                setFilteredIconHours(FIH);
                const FDH = filteredDate.map((i)=>{
                    return Math.floor(i.main.temp)
                })
                setFilteredDegreHours(FDH);
                
            }
            else{
             
            }
        } catch (error) {
           
            console.error("Error:", error);
        }
    }
    useEffect(() => {

    
        fetchData();
    }, []);
    return (
        <div className='home-page' ref={homebg}>
        <div className="weather" ref={bg}>
            <div className="search-bar">
                <input
                    type="input"
                    name="search-city"
                    id="search-city"
                    onKeyDown={handleKeyDown}
                    placeholder="Search" 
                ref={r}
               />
                <button ref={bginput}
                    onClick={() => {
                        setCityName(r.current.value);
                        getWeatherByCityName(r.current.value);
                        getWeatherForecast(r.current.value);
                        getDayForecast(r.current.value);
                        changeBackground();
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            {weatherData?<>
            <div className="weather-data">
            <div className="weather-state">
                <img src={weatherData.weatherState} alt="" />
                <h1 className="degree">{weatherData.degree}&deg; C </h1>
                <span>{weatherData.description}</span>
            </div>

            <div className="temperature">
             
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

            </div>


            <Dayforecast filteredHours = {filteredHours} filteredIconHours = {filteredIconHours} 
            filteredDegreeHours = {filteredDegreeHours} backGround= {backGround}>

            </Dayforecast>
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
        </div>
    );
};

export default Weathercard;
