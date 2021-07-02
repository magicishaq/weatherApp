import './App.css';
import Search from './Components/Search';
import Results from './Components/Results'; 
import CityContext from './contexts/CityContext';

import { useState, } from 'react';



function App() {
  //set the search state
  //set the search reults options from  list 
  ///theme
  const search = useState('england'); 
  
  return (
    <CityContext.Provider value={search}>
    <div className="grid">
      <header className="heading">
        <h1> My Weather App </h1>
      </header>
      <aside className="searchbar">
        <Search/>     
      </aside>
      <article className="results">
        <Results search= {search} /> 
      </article>
      <footer className="footer">
        By Ishaq Khan
      </footer>
    </div>
    </CityContext.Provider>
  );
}

export default App;
