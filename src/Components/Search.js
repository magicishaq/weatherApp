import { useState, useEffect, useRef, useContext } from "react";
import CityContext from "../contexts/CityContext";

const Search = () => {
  const [city, setCity] = useState("");
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useContext(CityContext);
  let currentFocus = useRef();

  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    if (city) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [city]);
  //popluate list of cities
  async function getList() {
    const url = "https://countriesnow.space/api/v0.1/countries";
    const list = await fetch(url);
    const json = await list.json();
    const listOfAllCities = json.data.map((item) => item.cities).flat();
    setList(listOfAllCities);
  }

  function handleClick(e) {
    setCity(e.target.value);
    currentFocus.current = -1;
  }

  function onKeyDown(e) {
    const inp = document.getElementById("myInput");
    var x = document.getElementById(inp.id + "autocomplete-list");
    if (!city) {
      return false;
    }
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus.current++;
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      currentFocus.current--;
      addActive(x);
    } else if (e.keyCode == 13) {
      //enter key
      e.preventDefault();
      setSearch(city);
      if (currentFocus.current > -1) {
        //click on active
        if (x) {
          try {
            setCity(x[currentFocus.current].textContent.trim());
            setTimeout(setShow(false), 1);
          } catch (e) {
            return false;
          }
        }
      }
    }
  }
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus.current >= x.length) currentFocus.current = 0;
    if (currentFocus.current < 0) currentFocus.current = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus.current].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function clickHandlerItem(e) {
    setCity(e.target.textContent.trim());
    submitForm(e);
    //setShow(false);
  }

  function submitForm (ev)  {
    ev.preventDefault();
    setSearch(city);
    setShow(false); 
  }
  let filterdList = show
    ? list.filter((item) =>
        item.toLowerCase().includes(city.toLocaleLowerCase())
      )
    : [];
  return (
    <form
      autoComplete="off"
      onSubmit={submitForm}
    >
      <div className="autocomplete" style={{ width: "300px" }}>
        <input
          id="myInput"
          onKeyDown={onKeyDown}
          onChange={handleClick}
          
          value={city}
          placeholder="Enter a city"
        />
        <div
          id="myInputautocomplete-list"
          className="autocomplete-items"
          onClick={clickHandlerItem}
        >
          {filterdList.slice(0, 5).map((item, id) => (
            <div className="fList" data-id={id} key={id}>
              {" "}
              {item} <input type="hidden" value={item} />{" "}
            </div>
          ))}
        </div>
      </div>
      <input type="submit" />
    </form>
  );
};
export default Search;
