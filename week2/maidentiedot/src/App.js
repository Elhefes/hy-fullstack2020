import React, { useState, useEffect } from 'react'
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')

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
      <Countries countries={countries} filterName={filterName} setFilterName = {setFilterName}/>
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
      </div>
      )
    )
  }
}

export default App