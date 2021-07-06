import { useEffect, useState, useContext } from "react";
import CityContext from "../contexts/CityContext";

const Results = ({ search }) => {
  const [cities, setCities] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getData(search[0]).then((json) => (setCities(json))).catch(error => console.log(error))
    console.log(cities)
  },[search]);

  async function getData(cityname) {
    const API = `2191268cc6ab9899560808af14219013`;
    try {
      const result = await fetch(
        `//api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API}`
      );
      if (result.status === 200) {
        const json = await result.json();
        return json; 
      }
    } catch (ex) {
      return { success: false, error: ex.message };
    }
  }

  return (
    <div>hello world </div> 
  )

 
/* {cities.data.weather[0].main}
        {cities.data.weather[0].description}
        {cities.data.main.feels_like}
        {cities.data.main.humidity}
        {cities.data.main.temp_min}
        {cities.data.main.tem_max}
        {cities.data.wind.speed} mph
        {cities} */
};

export default Results;
