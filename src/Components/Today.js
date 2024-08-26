import React, {useEffect, useState} from "react";
import FutureDates from "./FutureDates";

const Today = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [searchText, setSearchText] = useState("Mumbai")
    const [unit, setUnit] = useState("metric")
    const [unitLabel, setUnitLabel] = useState("°C")

    const key = "23dcf54a354b9bbf83c94e3c80bb17dd";

    useEffect(() => {
        const fetchApi = async () => {
            try{

                const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${key}&units=${unit}`

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const resJson = await response.json();
                setWeatherData(resJson);
            } catch(e) {
                console.log(e);
                setWeatherData(null);
            }
        };
        fetchApi();
    },[searchText, unit] )

    const searchHandler = (event) => {  setSearchText(event.target.value)};

    const unitChangeHandler = (event) => {  
        if(event.target.checked) {
            setUnit("imperial") // F
            setUnitLabel("°F")
        } else {
            setUnit("metric")  // C
            setUnitLabel("°C")
        }
    };

    return(
        <div className="container">
            <div className="input-form">
                <input 
                    type = "searchText"
                    className="inputFeild"
                    onChange={searchHandler} 
                />
                <div className="unit-selector">
                    <p className="unit-label">°C</p>
                    <label className="switch">
                        <input type="checkbox" onChange={unitChangeHandler} />
                        <span class="slider round"></span>
                    </label>
                    <p className="unit-label">°F</p>
                </div>
            </div>
            {!weatherData ? (
                <div className="content">
                    <p>No Data Found</p>
                </div>
            ) : (
                <div className="content">
                    <div className="today-content">
                        <div className="weather-icon">
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                        <p>{weatherData.weather[0].main}</p>
                        </div>
                        <h1 className="Location">{searchText}</h1>
                        <h2 className="temp">{weatherData.main.temp}{unitLabel}</h2>
                        <p className="temp_max_min">Min : {weatherData.main.temp_min}{unitLabel} | Max : {weatherData.main.temp_max}{unitLabel} </p>                            
                        <p className="tempmin_max">Humidity : {weatherData.main.humidity}</p>
                        <p className="wind_speed">Wind : {weatherData.wind.speed}</p>
                    </div>
                    <FutureDates searchText={searchText} unit={unit} />
                </div>
        )}        
       
            
        </div>
    )
}
export default Today;