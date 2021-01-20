import React, { useState, useEffect } from 'react'
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  });

  const handleFilterChange = event => {
    console.log(event.target.value)
    if (event.target.value !== "") {
      setFilterName(event.target.value);
    } else {
      setFilterName("");
    }
  };

  return (
    <div>
      find countries <input onChange={handleFilterChange} />
      <Countries 
      countries={countries} 
      filterName={filterName} 
      setFilterName={setFilterName} 
      weather = {weather}
      setWeather = {setWeather}/>
    </div>
  )
}

const Countries = (props) => {
  const countriesToShow =
    props.filterName === ""
      ? []
      : props.countries.filter(c => c.name.toLowerCase().includes(props.filterName));

  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countriesToShow.length > 1) {
    return (
      countriesToShow.map((country, i) =>
        <div key={country.alpha2Code}>
          {country.name}
          <button onClick={() => props.setFilterName(country.name.toLowerCase())}>
            show
        </button>
        </div>
      )
    )
  } else {
    return (
      countriesToShow.map((country, i) =>
        <div key={country.alpha2Code}>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages.map(l => (
              <li key={l.name}>{l.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt="flag" width="150" />
          <h3>Weather in {country.name}</h3>
          <p>temperature {}</p>
          <Weather 
          capital={country.capital.toLowerCase()} 
          setWeather = {props.setWeather} 
          weather = {props.weather}/>
        </div>
      )
    )
  }
}

const Weather = (props) => {
  const api_key = process.env.REACT_APP_API_KEY
  const weatherApi = 'api.openweathermap.org/data/2.5/weather?q='
    + props.capital + '&appid=' + api_key

  console.log(weatherApi);
  useEffect(() => {
    axios.get(weatherApi).then(response => {
      props.setWeather(response.data)
    });
  });
  
  return (
    <div>
       {props.weather.main.length}
    </div>
  )
}

export default App