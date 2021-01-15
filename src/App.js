import MainComponent from "./components/main.js";

import React, { useEffect, useState } from "react";

import "./stylesheets/main.scss";
import "./stylesheets/globalParams.scss";






function App() {
  let token = localStorage.getItem("userKey");
  let [tokenAproved, setTokenAproved] = useState(false)

  useEffect(() => {
    
    token !== null && (setTokenAproved(true))
   
    }, [tokenAproved]);


  return (
    <div className="center-flex">
      <meta
        name="viewport"
        content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=320, height=device-height"
      />
      <meta
        charSet="utf-8"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      
  {tokenAproved === true &&
      <div className="center">
        <MainComponent/>
      </div>
  }
  {
    token===null && 
    <div className="public-center">
    <div style={{fontSize:"3rem"}}>You are not authenticated Lord Veider is coming unless you click the button below</div>
    <div onClick={()=>{
      localStorage.setItem("userKey", token);
      setTokenAproved(true)
    }} className="destroy-earth-button"> Destroy Tatooine</div>
    </div>
    
  }
    </div>
  );
}
const blackListed = [
  "characters",
  "planets",
  "starships",
  "vehicles",
  "species",
  "films",
  "residents",
  "tittle",
  "species",
  "url",
  "created",
  "edited",
  "title",
  "homeworld",
  "pilots",
  "people",
];

export { App, blackListed };
