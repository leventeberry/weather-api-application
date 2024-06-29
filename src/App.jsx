import { useState, useEffect } from 'react';
import 'dotenv/config'
import './App.css';

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
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <button type="button" onClick={() => {setData(getUserLocation())}}>Find Location</button>
    </>
  )
}
