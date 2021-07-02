import { useEffect, useState, useContext } from "react";
import CityContext from "../contexts/CityContext";

const Results = ({ search }) => {
  const [cities, setCities] = useState([]);
  const [result, setResult] = useState(search); 
  
  useEffect(() => {
      getData(search[0])
  }, [search])




  async function getData(cityname) {
    const API = `d4a379aa65a84f97e551626111324db3`; 
    try {
        const result = await fetch(
            `//api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API}`,
        );

        if (result.status === 200) {
            console.log(result)
            const json = await result.json(); 

            console.log(json)
            debugger; 
            setCities(json)
        }

        
    } catch (ex) {
        return { success: false, error: ex.message };
    }
  }

  if (search) {
    return (
      <div>

        {/* {cities.map((item) => (
          <div>{item} </div>
        ))} */}
      </div>
    );
  } else {
    return <div> No</div>;
  }
};

export default Results;
