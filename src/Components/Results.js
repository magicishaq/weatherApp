import { useEffect, useState, useContext } from "react";
import CityContext from "../contexts/CityContext";

const Results = ({ search }) => {
  const [cities, setCities] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    getData(search[0]);
    if (search[0] !== "") {
      setShow(true);
    }
  }, [search]);

  async function getData(cityname) {
    const API = `d4a379aa65a84f97e551626111324db3`;
    try {
      const result = await fetch(
        `//api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API}`
      );

      if (result.status === 200) {
        console.log(result);
        const json = await result.json();
        setCities(json);
      }
    } catch (ex) {
      return { success: false, error: ex.message };
    }
  }

  if (show) {
    return (
      <div>
        {cities.weather.map((item) => (
          <div>{item}</div>
        ))}
        {cities.main.feels_like}
        {cities.main.humidity}
        {cities.main.temp_min}
        {cities.main.tem_max}
        {cities.wind.speed} mph
        {cities}
      </div>
    );
  } else {
    return <div> No</div>;
  }
};

export default Results;
