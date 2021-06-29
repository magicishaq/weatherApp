import {useState, useEffect, useRef} from 'react'; 

const Search = ({data}) => {
const [city, setCity] = useState(data); 
const [list, setList] = useState({}); 
let currentFocus = useRef(null); 

useEffect(() => { getList()}, []); 
//popluate list of cities
async function getList () {
    const url = 'https://countriesnow.space/api/v0.1/countries'
    const list = await fetch(url); 
    const json = await list.json(); 
    const listOfAllCities = json.data.map(item => (item.cities)).flat()
    setList(listOfAllCities);  
}



function setUpSearch (e) { 
   //add the auto complete to the feilds
   setCity(e.target.value) 
   const inp = document.getElementById('myInput'); 
    var a, b, i, val = inp.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
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


return(
    <form autoComplete="off" action="/action_page.php">
    <div className="autocomplete" style={{'width':'300px'}}>
    <input id= "myInput" onChange={setUpSearch} onBlur={setUpSearch} value={city} /> 
    </div>
    <input type="submit"/>
  </form>
)
}
 export default Search; 