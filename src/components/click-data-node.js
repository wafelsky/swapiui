import React, { useEffect, useState } from "react";

import { blackListed } from "../App";

const ItemComponent = (props) => {
  const [item, setItem] = useState(props.itemData);
  const [itemKeys, setItemKeys] = useState([]);
  const filterArray = blackListed;

  useEffect(() => {
    let properkeys = [];
    let something = item;
    let keys = Object.keys(something);

    keys.map((item, i) => {
      for (let n = 0; n < filterArray.length; n++) {

        keys[i] === filterArray[n] && (n = filterArray.length);
        if (keys[i] !== filterArray[n] && n === filterArray.length - 1) {
          properkeys.push(keys[i]);
        }
      }
    });
    setItemKeys(properkeys);
    window.history.replaceState({ state: 100 }, "yes", props.itemData[keys[0]]);

    return () => {};
  }, [item]);

  function prepData(data) {
    let string = data.split("_").join(" ").replace("id", "");
    return string[0].toUpperCase() + string.substring(1);
  }

  return (
    <div className="center">
      <div className=" click-item-wrapper">
        {itemKeys.map((something, i) => {
          return (
            <div className="search-item" key={i}>
              {i === 0 ? (
                <div
                  className="search-item-header"
                  style={{ fontSize: "30px", marginBottom: "10px" }}
                >
                  {item[itemKeys[i]]}
                </div>
              ) : item[itemKeys[i]]!== "n/a" && ( 
               
                <div key={i} className="node-font" style={{letterSpacing:"1.3px", fontSize:"18px"}}>
                  {prepData(itemKeys[i])} : {item[itemKeys[i]]}
                </div>
             
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemComponent;
