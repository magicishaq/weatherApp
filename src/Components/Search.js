import {useState, useEffect} from 'react'; 

const Search = ({data}) => {
const [city, setCity] = useState(data); 
const [list, setList] = useState({}); 

useEffect(() => { getList()}, []); 
//popluate list of cities
async function getList () {
    const url = 'https://countriesnow.space/api/v0.1/countries'
    const list = await fetch(url); 
    const json = await list.json(); 
    const listOfAllCities = json.data.map(item => (item.cities)).flat()
    setList(listOfAllCities);  
}

return(
    <div>
        <input onChange={(e) => setCity(e.target.value)} value={city} /> 
    </div>
)
}
 export default Search; 