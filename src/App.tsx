import { useState, useEffect } from 'react';
import './assets/css/app.css';
import React from 'react';
import '../'

const apiKey = "7fe83d2b3a50417ffa22addadf331d55"
const url = ``

type Geo = {
  lat: number,
  lon: number
}

async function getWeatherData({lon, lat}: Geo){
  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((response) => {response.json()})
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((error) => {alert(`There was an error: ${error}`)});
}

function DisplayWeather({lon, lat}: Geo) {
  return (
    <>
      <p>Longitude: {lon}</p>
      <p>Latitude: {lat}</p>
    </>
  )
}

function showError(error: any) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

export default function App() {
  const [geo, setGeo] = useState<Geo | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      getWeatherData({lon: Number(position.coords.longitude.toFixed(2)), lat: Number(position.coords.latitude.toFixed(2))});

      return setGeo({ 
        lon: position.coords.longitude,
        lat: position.coords.latitude
      })
    }, (error) => showError(error));
  }, []);

  return (
    <>
        {geo ? (
          <>
            <DisplayWeather 
              lon={geo.lon}
              lat={geo.lat}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
    </>
  )
}
