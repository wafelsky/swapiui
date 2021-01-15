import React, { useEffect, useState } from "react";

const RemoveNa = (props) =>{

    const [keys, setKeys] = useState([])
    const [data, setData] = useState([])
    const [newArray, setNewArray] = useState([])
  
    function prepData(datu) {
      let string = datu.split("_").join(" ").replace("id", "");
      return string[0].toUpperCase() + string.substring(1);
    }
  
    useEffect(() => {
      let propeArray = []
      let keysArray = []
     
      
  
      if(props.keys.length !== undefined){
        for(let i=0;i<props.keys.length;i++){
  
        if(props.data[props.keys[i]]!=="n/a" && propeArray.length !==3){
          propeArray.push([ prepData(props.keys[i])])
          keysArray.push(props.keys[i])
        }
        if(propeArray.length===3){
          i=props.keys.length
        }
      
      }
      setKeys(keysArray)
      setNewArray(propeArray)
    }
  
     
      return () => {
      
      }
    },[]);
    
    return(
      <div className="scrap-info"> 
      {newArray.map((item, i)=>{
        return <div key={i} className="scrap-node"> {  newArray[i]  }   :  {props.data[keys[i]]}</div>
      })}
      
      </div>)
  }

  export default RemoveNa