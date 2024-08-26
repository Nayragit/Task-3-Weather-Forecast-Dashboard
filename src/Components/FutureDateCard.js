import React from 'react'

const FutureDateCard = ({date, weatherDataList}) => {


  let avgTemp = weatherDataList.reduce((acc, weatherData) => acc + weatherData.main.temp, 0) / weatherDataList.length;
  avgTemp = Math.floor(avgTemp * 100) / 100
  const maxTemp = weatherDataList.reduce((acc, weatherData) => Math.max(acc, weatherData.main.temp_max), weatherDataList[0].main.temp_max);
  const minTemp = weatherDataList.reduce((acc, weatherData) => Math.min(acc, weatherData.main.temp_min), weatherDataList[0].main.temp_min);

  let icon = weatherDataList[0].weather[0].icon.replace(/n/g, 'd');

  function epochToDayOfWeekUTC(epoch) {
    const date = new Date(epoch * 1000); // Convert from seconds to milliseconds
    const options = { weekday: 'long', timeZone: 'UTC' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className='future-date-card'>
      {epochToDayOfWeekUTC(weatherDataList[0].dt)}
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} ></img>
      {weatherDataList[0].weather[0].main}
      <p>Temp: {avgTemp}</p>
      <p>Max temp: {maxTemp}</p>
      <p>Min temp:{minTemp}</p>
      
    </div>
  )
}

export default FutureDateCard
