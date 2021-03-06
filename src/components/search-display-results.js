import { render } from "@testing-library/react";
import React, { useEffect, useState , useRef} from "react";
import { blackListed } from "../App";
import RenderItemNode from './search-data-node.js'


function DisplaySearchedDataComponent(props) {
  const [itemNode, setItemNode] = useState(null);
  const [refreshSearch, setRefreshSearch] = useState(false);
  const [abort, setAbort] = useState(useState(false));
  const [hasRendered, setHasRendered] = useState(0);
  const [oneElementArray, setOneElementArray] = useState([1]);
  const [renderNode, setRenderNode] = useState (false)

  const ref = useRef();
  ref.current = hasRendered;
  let renderChecker = 0;
  const getUrl = async (url) => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setItemNode(jsonData);
      setRenderNode(true)
     
   
    } catch (err) {
     console.error(err.message);
    }
   
  };

  function checkRender() {
    setTimeout(() => {
      if (ref.current === 0 && props.searchedData !==0) {
    
        setRefreshSearch(true);
        setTimeout(() => {
     
          if (ref.current === 0 && props.searchedData.length !== 0 && props.searchedData.length !== 1) {
            checkRender();
          }
          setRefreshSearch(false);
        }, 100);
      }
    }, 2000);
  }
  
  /////////Probably should have used class component for that...
  useEffect(() => {
    if(props.searchedData.length === 1){
   
    if(renderNode ===null || renderNode ===false)
    setTimeout(() => {
      if (props.searchedData.length === 1) {
        getUrl(props.searchedData[0][1]);
       
      }
    }, 100);
   
  }}, );

  useEffect(() => {

   
        if(props.searchedData>1){
    checkRender()
    }


    return () => {
      
    };
  }, [hasRendered]);

  return (
    <div style={{ color: "white",  }} className="center" >
      {refreshSearch === false && (
        <div>
          <div>{hasRendered === true && <h1>Didnt find anything :(</h1>}</div>
          {itemNode === null && props.searchedData.length !== 1 && (
            <div>
              <div className="grid-wrapper search-grid">
                {props.searchedData.map((item, i) => {
                  if (ref.current === 0) {
                    ref.current = 1;
                 
                  setHasRendered(1);
                  }
                  return (
                    <div
                      className="center search-grid-item"
                      key={i}
                      onClick={() => {
                        renderChecker = 0;
                        getUrl(props.searchedData[i][1]);
                        setRenderNode(true)
                      }}
                    >
                      {props.searchedData[i][0]}
                    </div>
                  );
                })}
                
              </div>
              
            </div>
          )}
          {/* I've had big time problems with refreshing on state change, example underneeth */}
          
        </div>
      )}
     
      {props.searchedData.length>0 && props.searchedData!==null && (
        <div className="center hielo">
          {oneElementArray.map((item, i) => {
            if (ref.current === 0) {
              ref.current = 1;
              setHasRendered(1);
            }
            return (
              <div key={i} className="center">
                <RenderItemNode itemNode={itemNode} />
              </div>
            );
          })}


        </div>
      
      )}
    </div>
  );
}


export default DisplaySearchedDataComponent;
