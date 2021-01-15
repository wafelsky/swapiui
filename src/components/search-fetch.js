import React, { useEffect, useState, useRef } from "react";

import SelectedSearchedItem from "./search-display-results.js";
import { blackListed } from "../App";

const SearchComponent = (props) => {
  const [searchVal, setSearchVal] = useState("");
  const [nameArray, setNameArray] = useState([...props.sectionNames]);
  const [searchArray, setSearchArray] = useState([...props.sectionNames]);
  const [fetchedData, setFetchedData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);
  const [showFilter, setShowFilter] = useState("none");
  const [dataArray, setDataArray] = useState([]);
  const [sendProps, setSendProps] = useState([]);
  const [compSticky, setCompSticky] = useState("0px");

  let local = 0;

  let array = [];
  const searchAndFetch = async (param) => {
    for (let i = 0; i < searchArray.length; i++) {
      if (searchArray[i] !== "") {
        const getall = async () => {
          let url = new URL(
            `https://swapi.py4e.com/api/${searchArray[
              i
            ].toLowerCase()}/?search=${param}`
          );
          try {
            //encodeURIComponent(`https://swapi.dev/api/${searchArray[i].toLowerCase()}/search=${searchVal}`)
            //encodeURIComponent(`https://swapi.dev/api/${searchArray[i].toLowerCase()}/search=${searchVal}`);
            const response = await fetch(url);
            const jsonData = await response.json();
            setFetchedData(jsonData);

            if (jsonData.count !== 0) {
              for (let i = 0; i < jsonData.results.length; i++) {
                let keys = Object.keys(jsonData.results[i]);
                array.push([
                  jsonData.results[i][keys[0]],
                  jsonData.results[i].url,
                ]);
                setDataArray([
                  ...dataArray,
                  jsonData.results[i][keys[0]],
                  jsonData.results[i].url,
                ]);
              }
            }
          } catch (err) {
            console.error(err.message);
          }
        };
        getall();
      }
    }
  };

  function fetchAndSend(param) {
    setRenderComponent(false);
    setTimeout(() => {
      setRenderComponent(true);
    }, 10);
    props.searching(true);
    searchAndFetch(param).then(() => {
      setSendProps(array);
      setTimeout(() => {
        setRenderComponent(true);
      }, 500);
    });
  }

  useEffect(() => {
    return () => {};
  }, [renderComponent]);

  function backFromSearchBut() {
    window.history.replaceState({ state: 100 }, "yes", " / ");
    setRenderComponent(false);
    props.searching(false);
    props.goBackSection();
  }

  /////////sticky navbar below
  useEffect(() => {
    //custom sticky navbar, because its encapsulated in here it cant be done with position sticky
    // if position sticky used with top:20 the navbar will only work where it is encapsulated

    let scroll = window.scrollY;
    window.addEventListener("resize", () => {
      local =
        document.getElementById("navbar").getBoundingClientRect().y + scroll;
    });

    document.addEventListener("scroll", () => {
      scroll = window.scrollY;

      if (local === 0) {
        local = document.getElementById("navbar").getBoundingClientRect().y;
      }

      if (
        document.getElementById("navbar").getBoundingClientRect().y !== null
      ) {
        if (scroll > local) {
          // compsticky compensates for the searchbar when searchbar is in fixed mode
          setCompSticky("50px");
          document.getElementById("navbar").style.cssText =
            "position:fixed; top:0;margin-top:15px; ";
        } else {
          setCompSticky("0px");
          document.getElementById("navbar").style.cssText =
            "position:relative; ";
        }
      }
    });
    props.url !== null && fetchAndSend(props.url);
  }, [props.url]);

  return (
    <div className="center">
      <div className="center navbar-wrapper">
        <div style={{ padding: compSticky }}></div>
        <div
          style={{ color: "white" }}
          id="navbar"
          className="search-wrapper sticky"
        >
          <div className="back-buttons-offset">
            {/** back to menu button */}
            <div
              className="back-from-search-button search-font-size"
              style={{
                opacity: props.isUserSearching === true ? 1 : 0,
                pointerEvents: props.isUserSearching === false && "none",
              }}
              onClick={() => {
                backFromSearchBut();
              }}
            >
              {" "}
              <i className="fas fa-arrow-left"></i> Main page
            </div>

            <div
              className="back-from-click-button search-font-size"
              style={{
                opacity: props.currentlySelected !== "" ? 1 : 0,
                pointerEvents: props.currentlySelected === "" && "none",
              }}
              onClick={() => {
                props.goBackSection();
              }}
            >
              <i className="fas fa-arrow-left" style={{ color: "white" }}></i>{" "}
              goback
            </div>
          </div>
          <form>
            <div className="row-align">
              <input
                type="text"
                className="search-input"
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
              ></input>
              <div
                className="submit-glass"
                type="submit"
                onClick={() => {
                  fetchAndSend(searchVal);
                  window.history.replaceState({ state: 100 }, "yes", " / ");
                }}
              >
                <i
                  style={{
                    color: "white",
                    fontSize: "30px",
                  }}
                  className="fas fa-search"
                ></i>
              </div>
              <div
                onClick={() => {
                  setShowFilter(showFilter === "none" ? "" : "none");
                }}
              >
                <i
                  style={{
                    fontSize: "30px",
                    marginRight: "6px",
                    color: "white",
                  }}
                  className="fas fa-cog"
                ></i>
              </div>

              <div>
                <div
                  className="tick-grid filter-options"
                  style={{
                    pointerEvents: showFilter === "none" && "none",
                    opacity: showFilter === "" ? 1 : 0,
                  }}
                >
                  {nameArray.map((something, i) => {
                    return (
                      <div
                        className="checkboxes"
                        key={i}
                        style={{ color: "white" }}
                      >
                        <input
                          type="checkbox"
                          id={nameArray[i]}
                          value={nameArray[i]}
                          defaultChecked
                          onChange={() => {
                            let array = searchArray;
                            if (searchArray[i] === nameArray[i]) {
                              array[i] = "";
                              setSearchArray([...array]);
                            } else {
                              array[i] = nameArray[i];
                              setSearchArray([...array]);
                            }
                          }}
                        />{" "}
                        {nameArray[i]}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {renderComponent === true && props.isUserSearching === true && (
        <SelectedSearchedItem searchedData={sendProps} />
      )}
    </div>
  );
};

export default SearchComponent;
