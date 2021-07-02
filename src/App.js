import './App.css';
import Search from './Components/Search';
import Results from './Components/Results'; 
import CityContext from './contexts/CityContext';

import { useState, useEffect } from 'react';



function App() {
  //set the search state
  //set the search reults options from  list 
  ///theme
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  async function getData (cityname) {
    debugger; 
    const API = `6b37f526109787fa0dc324bcc52c5d5c`
    let url = `api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API}`
    const results = await fetch(url)
    const json = await results.json();
    setCities(json);
    console.log(json)
  }

  return (
    <CityContext.Provider value={city} >
    <div className="grid">
      <header className="heading">
        <h1> My Weather App </h1>
      </header>
      <aside className="searchbar">
      
      <form autoComplete="off" onSubmit={(e) => {e.preventDefault(); getData()}}>
        <Search />
      
        <input type="submit"/> 
      </form> 
      
      </aside>
      <article className="results">
        <Results cities={cities} /> 
      </article>
      <footer className="footer">
        By Ishaq Khan
      </footer>
    </div>
    </CityContext.Provider>
  );
}

export default App;
