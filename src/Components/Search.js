import {useState, useEffect, useRef} from 'react'; 

const Search = ({data}) => {
const [city, setCity] = useState(data); 
const [list, setList] = useState([]); 
const [show, setShow] = useState(false); 
let currentFocus = useRef(); 

useEffect(() => { getList()}, []); 
useEffect(() => {
  if(city){
    setShow(true)
  }else{
    setShow(false)
  }
}, [city])
//popluate list of cities
async function getList () {
    const url = 'https://countriesnow.space/api/v0.1/countries'
    const list = await fetch(url); 
    const json = await list.json(); 
    const listOfAllCities = json.data.map(item => (item.cities)).flat()
    setList(listOfAllCities);  
}

function handleClick (e) { 
  setCity(e.target.value)
  currentFocus.current = -1;
}

function onKeyDown (e) {
  const inp = document.getElementById('myInput'); 
  var x = document.getElementById(inp.id + "autocomplete-list");
  if(!city){
    return false; 
  }
  if (x) x = x.getElementsByTagName("div");
  // if(!city){
  //   return false; 
  // } 
  if (e.keyCode == 40) {
    /*If the arrow DOWN key is pressed,
    increase the currentFocus variable:*/
    currentFocus.current ++;
    /*and and make the current item more visible:*/
    addActive(x);
  } else if (e.keyCode == 38) { //up
    /*If the arrow UP key is pressed,
    decrease the currentFocus variable:*/
    currentFocus.current --;
    /*and and make the current item more visible:*/
    addActive(x);
  } else if (e.keyCode == 13) {
    /*If the ENTER key is pressed, prevent the form from being submitted,*/
    e.preventDefault();
    if (currentFocus.current > -1) {
      /*and simulate a click on the "active" item:*/
      if (x) { 
        setCity(x[currentFocus.current].textContent.trim())
      }
    }
  }
};
function addActive(x) {
/*a function to classify an item as "active":*/
if (!x) return false;
/*start by removing the "active" class on all items:*/
removeActive(x);
if (currentFocus.current >= x.length) currentFocus.current = 0;
if (currentFocus.current < 0) currentFocus.current = (x.length - 1); 
/*add class "autocomplete-active":*/
x[currentFocus.current].classList.add("autocomplete-active");

}
function removeActive(x) {
/*a function to remove the "active" class from all autocomplete items:*/
for (var i = 0; i < x.length; i++) {
  x[i].classList.remove("autocomplete-active");
}
}

function clickHandlerItem (e ){
setCity(e.target.textContent.trim())
}
let filterdList = show ? list.filter(item => item.toLowerCase().includes(city.toLocaleLowerCase())) : []; 
return(
    <form autoComplete="off">
      
    <div className="autocomplete" style={{'width':'300px'}}>
    {/* <input id= "myInput" onChange={setUpSearch} onBlur={setUpSearch} value={city} onKeyDown={onKeyDown} />  */}
    <input id= "myInput" onKeyDown={onKeyDown} onChange={handleClick} onBlur={(e) => setCity('')} value={city} /> 
    < div id="myInputautocomplete-list" className="autocomplete-items" >
    {/* onMouseOver={clickHandlerItem} */}
    {filterdList.slice(0, 5).map((item,id) => (<div  className="fList" data-id={id} key={id} > {item} <input type="hidden" value={item} /> </div>))}
    </div>
    </div>
  </form>
)
}
 export default Search; 