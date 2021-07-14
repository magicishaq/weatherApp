import { useEffect, useState, useContext } from "react";
import CityContext from "../contexts/CityContext";

const Results = ({ search }) => {
  const [cities, setCities] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (search[0].length > 0) {
      getData(search[0])
        .then((json) => setCities(json))
        .then(() => setShow(true))
        .catch((error) => setShow(false));
    } else {
      console.log("empty");
      setShow(false);
    }
    console.log(cities);
  }, [search]);

  async function getData(cityname) {
    const API = `2191268cc6ab9899560808af14219013`;
    const units = 'metric';  
    try {
      const result = await fetch(
        `//api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API}&units=${units}`
      );
      if (result.status === 200) {
        const json = await result.json();
        return json;
      } else {
        return { error: true };
      }
    } catch (ex) {
      return { success: false, error: ex.message };
    }
  }
  if (show && !cities.error) {
    return (
      <ul>
        <li>
          The temperature of {cities.name} is {cities.main.temp}  degrees celsius
        </li>
        <li>Today its : {cities.weather[0].main}</li>
        <li> {cities.weather[0].description} </li>
        <li> {cities.main.feels_like} </li>
        <li> humidity is : {cities.main.humidity}  g.m </li>
        <li> Minimum temperature is : {cities.main.temp_min}  degrees celsius </li>
        <li> Maximum temperature is : {cities.main.temp_max}  degrees celsius</li>
        <li> The wind speed is: {cities.wind.speed} mph </li>
      </ul>
    );
  }
  else  {
    return <p>Search for your weather in any city in the world</p>;
  }
  
};

export default Results;
