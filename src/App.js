import React, { useState } from 'react';
// import clear from './resources/clear.png';
import clouds from './resources/clouds.png';
// import drizzle from './resources/drizzle.png';
import fog from './resources/foggy.png';
// import rain from './resources/rain.png';
// import snow from './resources/snow.png';
// import storm from './resources/storm.png'

const api = {
  key: "97fb6d4b965c8b3055efd86c28d52b1c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="App">
      <section className="top-banner">
        <div className="container1">
          <h1 className="heading">Weather App</h1>
          <input 
            type="text"
            id="input"
            placeholder="Search for a city"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        
        {(typeof weather.main != "undefined") ? (
        
        <div className="weather-block">
          {/* <br/> */}
          <div className="weather-info">
            <div id="cityName">{weather.name}, {weather.sys.country}</div>
            
            {(weather.id <=750)?(
              <img src={clouds} alt="weather icon" id="weather-icon"/>
            ): (<img src={fog} alt="weather icon" id="weather-icon"/>)}

            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          {/* <div className="weather-box"> */}
            <div id="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div id="description">{weather.weather[0].main}</div>
          {/* </div> */}
        </div>
        ) : ('')}
      </section>
    </div>
  );
}

export default App;