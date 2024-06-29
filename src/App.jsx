import { useState, useEffect } from 'react';
import './App.css';

const userLocation = {
  long: 0,
  lat: 0,
}

async function getUserLocation() {
  const newLocation = navigator.geolocation.getCurrentPosition((position) => {
    userLocation.long = position.coords.longitude;
    userLocation.lat = position.coords.latitude;
  });

  console.log(userLocation);
}

function App() {

  return (
    <>
      <div onLoad={() => {getUserLocation()}}></div>

      <button type="button" onClick={() => {getUserLocation()}}>Find Location</button>
    </>
  )
}

export default App
