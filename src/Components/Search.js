import {useState, useEffect, useRef} from 'react'; 

const Search = ({data}) => {
const [city, setCity] = useState(''); 
const [list, setList] = useState([]); 
const [show, setShow] = useState(false); 
let currentFocus = useRef(); 

useEffect(() => { getList()}, []); 
useEffect(() => {
  if(city.length >= 1 ){
    setShow(true)
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
  
  
}

 

function setUpSearch (e) { 
   //add the auto complete to the feilds
   setCity(e.target.value) 
   const inp = document.getElementById('myInput'); 
    var a, b, i, val = inp.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus.current = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", inp.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < list.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (list[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + list[i].substr(0, val.length) + "</strong>";
        b.innerHTML += list[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + list[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = document.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
      }
    }
    
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
}
function keyhandler (e) {

}
function onKeyDown (e) {
  const inp = document.getElementById('myInput'); 
  var x = document.getElementById(inp.id + "autocomplete-list");
  if (x) x = x.getElementsByTagName("div");
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
        setCity(x[currentFocus.current].textContent)
        console.log('hello world')
        // x[currentFocus.current].click();
        // setUpSearch(); 
      }
    }
  }
};
function addActive(x) {
/*a function to classify an item as "active":*/
if (!x) return false;
/*start by removing the "active" class on all items:*/
removeActive(x);
if (currentFocus.current >= x.length) currentFocus = 0;
if (currentFocus.current < 0) currentFocus = (x.length - 1);
/*add class "autocomplete-active":*/
x[currentFocus.current].classList.add("autocomplete-active");
}
function removeActive(x) {
/*a function to remove the "active" class from all autocomplete items:*/
for (var i = 0; i < x.length; i++) {
  x[i].classList.remove("autocomplete-active");
}
}
let filterdList = show ? list.filter(item => item.includes(city)) : []; 
return(
    <form autoComplete="off">
      
    <div className="autocomplete" style={{'width':'300px'}}>
    {/* <input id= "myInput" onChange={setUpSearch} onBlur={setUpSearch} value={city} onKeyDown={onKeyDown} />  */}
    <input id= "myInput" onKeyDown={onKeyDown} onChange={handleClick} onBlur={(e) => setCity('')} value={city} /> 
    < div id="myInputautocomplete-list" className="autocomplete-items">
    {filterdList.slice(0, 5).map((item,id) => (<div  className="fList" data-id={id} key={id}> {item} <input type="hidden" value={item} /> </div>))}
    </div>
    </div>
  </form>
)
}
 export default Search; 