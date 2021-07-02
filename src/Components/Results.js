import {useEffect, useState} from 'react'; 


const Results = ({cities}) => {
const [show, setShow] = useState(false); 

// useEffect(()=>{
// if 
// }, [])

if(cities){
return(
    <div>Yes{cities}</div>
)
}else{
    return(
<div> No</div>
    )
}
}

export default Results