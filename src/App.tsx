import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';

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

function getUserLocation() {
  
  const userLocation = {
    long: 0,
    lat: 0,
  }

  navigator.geolocation.getCurrentPosition((position) => {
    userLocation.long = position.coords.longitude;
    userLocation.lat = position.coords.latitude;
  }, (error) => showError(error));

  return userLocation;
}

export default function App() {
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    console.log(geo);
  }, []);

  return (
    <>
      <button type="button" onClick={() => {setGeo(getUserLocation())}}>Find Location</button>
    </>
  )
}
