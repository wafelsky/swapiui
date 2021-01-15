import React, { useEffect, useState } from "react";

const SectionComponent = (props) => {
  const [sectionInfo, setSectionInfo] = useState(undefined);
  const [dataArray, setDataArray] = useState([]);

  const [firstKey, setFirstKey] = useState([]);
  const [sectionKeys, setSectionKeys] = useState([]);
  const [render, setRender] = useState(false);
  const [nodeKeys, setNodeKeys] = useState([]);
  const [page, setPage] = useState(1);


  const getSection = async (data) => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/${props.sectionKey}/?page=${data}`
      );
      const jsonData = await response.json();

      setSectionInfo(jsonData);
      setDataArray(jsonData.results);
      setSectionKeys(Object.keys(jsonData));
      setFirstKey(Object.keys(jsonData.results[0])[0]);
      setNodeKeys(Object.keys(jsonData.results));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getSection(1);
    return () => {};
  }, []);

  function next() {
    if (sectionInfo.next !== null) {
      setPage(page + 1);
      setRender(true);

      getSection(page + 1).then(() => {
        setRender(false);
        checkIfRendered();
      });
    }
  }
  function back() {
    if (sectionInfo.previous !== null) {
      setPage(page > 1 ? page - 1 : page);
      setRender(true);
      getSection(page - 1).then(() => {
        setRender(false);
        checkIfRendered();
      });
    }
  }

  function checkIfRendered() {
    if (dataArray === undefined) {
      setRender(true);
      setTimeout(() => {
        setRender(false);
      }, 200);
    }
  }

  function prepData(data) {
    let string = data.split("_").join(" ").replace("id", "");
    return string[0].toUpperCase() + string.substring(1);
  }

  return (
    <div>
      <div className="center">
        <div className="center">
          {sectionInfo !== undefined && sectionInfo.count >= 9 && (
            <div className="section-buttons-allign section-buttons-wrapper">
              <div
                className="dev-button"
                onClick={back}
                style={{
                  opacity: page === 1 && 0,
                  pointerEvents: page === 1 && "none",
                }}
              >
                <i className="fas fa-arrow-circle-left"></i> Previous page
              </div>

              <div
                className="dev-button"
                onClick={next}
                style={{
                  opacity:
                    sectionInfo.next === null && sectionInfo.previous && 0,
                  pointerEvents: sectionInfo.next === null && "none",
                }}
              >
                Next page <i className="fas fa-arrow-circle-right"></i>
              </div>
            </div>
          )}
        </div>
        {render === false && dataArray !== undefined && (
          <div className="grid-wrapper">
            {dataArray.map((item, i) => {
              let keys = Object.keys(dataArray[i]);
              return (
                <div
                  key={i}
                  className="item-button"
                  style={{ marginTop: "20px" }}
                >
                  <div
                    className=""
                    onClick={() => {
                      props.itemName(dataArray[i][firstKey]);
                      props.selectItem(i);
                      props.chooseItemData(sectionInfo.results[i]);
                    }}
                  >
                    <h1 className="section-subclass">
                      {dataArray[i][firstKey]}
                    </h1>
                    <div className="scrap-info">
                      <div className="scrap-node">
                        {" "}
                        {prepData(keys[1])} : {dataArray[i][keys[1]]}
                      </div>
                      <div className="scrap-node">
                        {" "}
                        {prepData(keys[2])} : {dataArray[i][keys[2]]}
                      </div>
                      <div className="scrap-node">
                        {" "}
                        {prepData(keys[3])} : {dataArray[i][keys[3]]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionComponent;
