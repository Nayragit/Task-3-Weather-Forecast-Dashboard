import React, { useState, useEffect } from 'react';
import FutureDateCard from './FutureDateCard';

const FutureDates = ({ searchText, unit }) => {
  const key = "23dcf54a354b9bbf83c94e3c80bb17dd";
  const [weatherDataByDate, setWeatherDataByDate] = useState({});

  function epochToDate(epoch) {
    const date = new Date(epoch * 1000);
    return date.toISOString().split('T')[0];
  }

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchText}&appid=${key}&units=${unit}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resJson = await response.json();

        let tempWeatherDataByDate = resJson.list.reduce((acc, entry) => {
          const date = epochToDate(entry.dt);
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(entry);
          return acc;
        }, {});

        
        setWeatherDataByDate(tempWeatherDataByDate);

      } catch (e) {
        console.log(e);
      }
    };

    fetchApi();
  }, [searchText, unit]);

  return (
    <div className='future-date-container'>
      {Object.entries(weatherDataByDate).map(([date, data]) => (
        <FutureDateCard date={date} weatherDataList={data} key={date} />
      ))}
    </div>
  );
};

export default FutureDates;
