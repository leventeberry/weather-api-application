import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';

const apiKey = "9b061e72643e0bdb46c7312b5e55653a"

type Geo = {
  lat: number,
  lon: number
}

function DisplayWeather({lon, lat}) {
  return (
    <>
      <p>Longitude: {lon}</p>
      <p>Latitude: {lat}</p>
    </>
  )
}

function showError(error) {
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
