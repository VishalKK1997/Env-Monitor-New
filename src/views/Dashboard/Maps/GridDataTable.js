import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

import { DashboardHeatmapContext } from "./HeatMapPlot";

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

// API call string builder.
function buildAPICallString(dateTime, gridId) {
  let date = dateTime.split("T")[0];
  let hour = dateTime.split("T")[1].split(":")[0];
  console.log(
    `http://127.0.0.1:5000/pred_table_data?grid=${gridId}&date=${date}`
  );
  return `http://127.0.0.1:5000/pred_table_data?grid=${gridId}&date=${date}`;
}

const GridDataTable = (props) => {
  const [isLoading, setLoading] = useState(true);

  const [gridData, setGridData] = useState(null);

  const { dateTime } = React.useContext(DashboardHeatmapContext);

  useEffect(() => {
    if (isLoading) {
      // After receiving endpoint, change the following simulateNetworkRequest to
      // fetch(`endpointHost/endpoint?grid_id=${props.gridId}`)
      fetch(buildAPICallString(dateTime, props.gridId))
        .then((res) => res.json())
        .then(
          (data) => {
            console.log("data", data);
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
            {gridData["daily"].map((data, idx) => (
              <td key={"DayData" + idx}>{data}%</td>
            ))}
          </tr>
          <tr>
            <td>Week Wise</td>
            {gridData["weekly"].map((data, idx) => (
              <td key={"WeekData" + idx}>{data}%</td>
            ))}
          </tr>
          <tr>
            <td>Month Wise</td>
            {gridData["monthly"].map((data, idx) => (
              <td key={"MonthData" + idx}>{data}%</td>
            ))}
          </tr>
        </tbody>
      </Table>
    )
  );
};

export default GridDataTable;
