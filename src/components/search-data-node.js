import { blackListed } from "../App";
import React, { useEffect, useState, useRef } from "react";

function RenderItemNode(props) {
  const [nodeKeys, setNodeKeys] = useState([]);
  const filterArray = blackListed;
  const [data, setData] = useState({});
  useEffect(() => {
    let keys = [];

    if (props.itemNode !== undefined && props.itemNode !== null) {
      setNodeKeys(Object.keys(props.itemNode));
      keys = Object.keys(props.itemNode);
      window.history.replaceState(
        { state: 100 },
        "yes",
        props.itemNode[keys[0]]
      );
    }

    setData(props.itemNode);

    let properkeys = [];
    let locationHref = window.location.href;

    // let sum =data.split('_').join(' ').replace("id", "")

    keys.map((item, i) => {
      for (let n = 0; n < filterArray.length; n++) {
        //  keys[i]===filterArray[n] && (keys.splice(i,1))
        keys[i] === filterArray[n] && (n = filterArray.length);
        if (keys[i] !== filterArray[n] && n === filterArray.length - 1) {
          properkeys.push(keys[i]);
        }
      }
    });
    setNodeKeys(properkeys);
    return () => {};
  }, [props.itemNode]);

  function prepData(data) {
    let string = data.split("_").join(" ").replace("id", "");
    return string[0].toUpperCase() + string.substring(1);
  }
  return (
    <div className="center">
      <div style={{ color: "white" }} className="search-item-wrapper ">
        {nodeKeys.map((item, i) => {
          return (
            <div key={i} className="search-item">
              {i === 0 ? (
                <div
                  className="search-item-header"
                  style={{ fontSize: "30px", marginBottom: "10px" }}
                >
                  {data[nodeKeys[i]]}
                </div>
              ) : (
                <div>
                  {prepData(nodeKeys[i])}: {data[nodeKeys[i]]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RenderItemNode;
