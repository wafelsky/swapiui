import React, { useEffect, useState } from "react";
import SearchComponent from "./search-fetch.js";
import SectionComponent from "./click-display-results.js";
import ItemComponent from "./click-data-node.js";

const homeUrl = "http://localhost:3000/";
let suffix =
  window.location.protocol +
  "//" +
  window.location.host +
  "/" +
  window.location.pathname;
suffix = suffix.slice(homeUrl.length);
let suffix2 = suffix.substring(1);

const MainComponent = () => {
  const [all, setall] = useState([]);
  const [sectionName, setSectionName] = useState([]);
  const [currentlySelected, setCurrentlySelected] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);
  const [itemData, setItemData] = useState([]);
  const [isUserSearching, setIsUserSearching] = useState(false);
  const [searchFromUrl, setSearchFromUrl] = useState(null);
  const [currentlySelectedItem, setCurrentlySelectedItem] = useState("");

  const [sendEndpoint, setSendEndpoint] = useState(suffix2);

  const itemName = (item) => {
    setCurrentlySelectedItem(item);
  };
  //disables all clickable sections
  const searching = (param) => {
    setCurrentlySelected("");
    setIsUserSearching(param);
  };
  // sends the data when searching
  const [searchedData, setSearchedData] = useState([]);
  const sendSearchedData = (data) => {
    setSearchedData(data);
  };

  const chooseItem = (item) => {
    setSelectedItem(item);
  };
  const chooseItemData = (data) => {
    setItemData(data);
  };
  const getall = async () => {
    try {
      const response = await fetch("https://swapi.py4e.com/api/");
      const jsonData = await response.json();

      setall(jsonData);
      let array = Object.keys(jsonData);

      for (let i = 0; i < array.length; i++) {
        array[i] = array[i][0].toUpperCase() + array[i].substring(1);
      }

      setSectionName(array);
    } catch (err) {
      console.error(err.message);
    }
  };

  function goBackSection() {
    window.history.replaceState({ state: 100 }, "yes", " / ");
    setSearchFromUrl(null);

    if (selectedItem !== -1) {
      setSelectedItem(-1);
      setCurrentlySelectedItem("");
    } else {
      setCurrentlySelected("");
    }
  }

  useEffect(() => {
    if (sendEndpoint.length !== 0) {
      /// disable below for websites because of the htacces
     setSearchFromUrl(sendEndpoint);
    }
    getall();
    return () => {};
  }, [sendEndpoint]);
  return (
    <div>
      {/**  <h1 style={{color:"white"}}>{searchFromUrl}</h1>*/}
      <h1 className="project-tittle">
        Star wars library{" "}
        <a style={{ fontSize: "15px" }} className="autor">
          made by{" "}
        </a>
        <a style={{ fontSize: "15px" }}>Mazur Jakub</a>
      </h1>
      <div className="center">
        <div className="row-align top-bar"  style={{maxWidth:"90vw"}}>
          {/* SEARCH COMPONENT WITH SEARCHBAR and navbar*/}
          {sectionName.length !== 0 && (
            <div>
              <SearchComponent
                currentlySelected={currentlySelected}
                goBackSection={goBackSection}
                url={searchFromUrl}
                isUserSearching={isUserSearching}
                searching={searching}
                sectionNames={sectionName}
              />
            </div>
          )}
        </div>
      </div>
      {/* Main menu grid buttons */}
      <div className="center">
        {isUserSearching !== true && currentlySelected === "" && (
          <div
            className="section-buttons section-grid"
            style={{ display: isUserSearching && "none" }}
          >
            {Object.keys(all).map((item, i) => {
              return (
                <div key={i} className="section-button">
                  {currentlySelected === "" && (
                    <div className="overflow-stars">
                      <div className="animated-stars"></div>
                      <div>
                        <div
                          onClick={() => {
                            setCurrentlySelected(Object.keys(all)[i]);
                          }}
                          className="section-tittle"
                        >
                          <div className="button-magic"></div>
                          {sectionName[i]}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* list of items from section //fetches and displays section items*/}
      {currentlySelected !== "" && selectedItem === -1 && (
        <div style={{ color: "white" }}>
          {Object.keys(all).map((item, i) => {
            return (
              <div key={i}>
                {currentlySelected === Object.keys(all)[i] && (
                  <div>
                    <SectionComponent
                      itemData={itemData}
                      itemName={itemName}
                      selectItem={chooseItem}
                      chooseItemData={chooseItemData}
                      data={all}
                      sectionKey={currentlySelected}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Displays clicked section item */}
      <h1 style={{ color: "white" }}>
        {selectedItem !== -1 && isUserSearching === false && (
          <ItemComponent itemData={itemData} />
        )}
      </h1>
    </div>
  );
};

export default MainComponent;
