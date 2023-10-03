"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
          key: '7ff1dff0150c4c7b9ee111211230110',
          q: city,
          days: 5,
          dt: '2010-01-01', 
        },
      });

      setWeatherData(response.data);
    } catch (err) {
      setError('Couldn\'t fetch weather results.');
      setWeatherData(null); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="font-raleway text-5xl font-extrabold mb-10 sm:text-4xl">
        Weather of {city}
      </h1>
      <div className="flex sm:flex-col">
        <input
          type="text"
          placeholder="City..."
          className="outline-indigo mr-6 rounded-sm pl-4 w-64 font-raleway sm:mr-0 sm:mb-4 sm:py-1"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getWeather}
          className="outline-none border-none font-bold font-raleway px-12 py-2 rounded-sm bg-indigo-300 text-gray-700 transition duration-300 hover:bg-indigo-600 hover:text-white"
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && (
        <div className="mt-10 bg-red-200 px-12 py-4 rounded font-raleway text-xl font-semibold text-gray-700 sm:text-base sm:px-8">
          <p>{error}</p>
        </div>
      )}
      {weatherData && (
        <div className="mt-10 flex flex-col justify-start bg-indigo-200 px-12 py-4 rounded font-raleway text-xl font-semibold text-gray-700 sm:text-base sm:px-8">
          <div className="flex mb-4">
            <p className="w-64 sm:w-41">Temperature:</p>
            <p>{weatherData.current.temp_c} ° C</p>
          </div>
          <div className="flex mb-4 sm:w-41">
            <p className="w-64">sky:</p>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="flex">
            <p className="w-64 sm:w-41">cloudiness:</p>
            <p>{weatherData.current.cloud}</p>
          </div>
        </div>
      )}
    </div>
  );
}
