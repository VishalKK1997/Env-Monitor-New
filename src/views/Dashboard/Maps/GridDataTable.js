import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

// Demo function. Can be removed.
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function buildDemoData() {
  let gridData = {
    daywise: shuffle([10, 30, 0, 40, 20]),
    weekwise: shuffle([20, 10, 50, 12, 8]),
    monthwise: shuffle([10, 30, 12, 40, 8]),
  };
  return gridData;
}

// Network call simulation
function simulateNetworkRequest(apiCallString) {
  console.log(apiCallString);
  return new Promise((resolve) => setTimeout(resolve(buildDemoData()), 2000));
}

const GridDataTable = (props) => {
  const [isLoading, setLoading] = useState(true);

  const [gridData, setGridData] = useState(null);

  useEffect(() => {
    if (isLoading) {
      // After receiving endpoint, change the following simulateNetworkRequest to
      // fetch(`endpointHost/endpoint?grid_id=${props.gridId}`)
      simulateNetworkRequest(
        `gateway/gridwiseanalytics?grid_id=${props.gridId}`
      )
        // .then(res => res.json())
        .then(
          (data) => {
            setGridData(data);
            setLoading(false);
          },
          (error) => {
            setLoading(false);
            alert(error);
          }
        );
    }
  }, [isLoading]);

  return isLoading ? (
    <p>Loading Data...</p>
  ) : (
    gridData && (
      <Table bordered>
        <thead>
          <tr>
            <th>#{props.gridId}</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Day Wise</td>
            {gridData.daywise.map((data, idx) => (
              <td key={"DayData" + idx}>{data}%</td>
            ))}
          </tr>
          <tr>
            <td>Week Wise</td>
            {gridData.weekwise.map((data, idx) => (
              <td key={"WeekData" + idx}>{data}%</td>
            ))}
          </tr>
          <tr>
            <td>Month Wise</td>
            {gridData.monthwise.map((data, idx) => (
              <td key={"MonthData" + idx}>{data}%</td>
            ))}
          </tr>
        </tbody>
      </Table>
    )
  );
};

export default GridDataTable;
