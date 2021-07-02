import {useEffect, useState, useContext} from 'react'; 
import CityContext from '../contexts/CityContext';

const Results = ({search}) => {
if(search){
return(
   <div> {search} </div> 
)
}else{
    return(
<div> No</div>
    )
}
}

export default Results