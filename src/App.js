import './App.css';
import Search from './Components/Search';

import { useState, useEffect } from 'react';

function App() {
  //set the search state
  //set the search reults options from  list #
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  

  async function getData (cityname = '') {
    const API = `6b37f526109787fa0dc324bcc52c5d5c`
    let url = `api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API}`
    const results = await fetch(url)
    const json = await results.json();
    setCities(json);
  }

  return (
    <div className="grid">
      <header className="heading">
        <h1> My Weather App </h1>
      </header>
      <aside className="searchbar">
        <Search data={city} />
        <button onClick={(event) => { setCity(event.target.value) }}> Search here ! </button>
      </aside>
      <article className="results">
        Results
      </article>
      <footer className="footer">
        By Ishaq Khan
      </footer>
    </div>
  );
}

export default App;
