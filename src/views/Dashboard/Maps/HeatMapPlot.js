import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import MapComponent from "./MapComponent";
import MapLegendCard from "./MapLegendCard";
import POIListCard from "./POIListCard";

import poiData from "../../../constants/POIData";
import buildGrid from "../../../constants/GridBuilder";
import styles from "../../../styles/DashboardHeatMapPlotStyles";

const DashboardHeatmapContext = React.createContext();

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

// Demo Data builder.
function buildDemoData() {
  let demoArray = [1, 2, 3, 4, 2, 2, 2, 2, 4, 5, 3, 2, 1, 2, 5, 3];
  let predictionData = shuffle(demoArray);
  return predictionData;
}

// Network Request Simulator
function simulateNetworkRequest(apiCallString) {
  console.log(apiCallString);
  return new Promise((resolve) => setTimeout(resolve(buildDemoData()), 2000));
}

// Get Current Date Time for first load.
function getCurrentDateTime() {
  let currentDateTime = new Date();
  return (
    currentDateTime.getFullYear() +
    "-" +
    (currentDateTime.getMonth() + 1 < 10 ? "0" : "") +
    (currentDateTime.getMonth() + 1) +
    "-" +
    (currentDateTime.getDate() < 10 ? "0" : "") +
    currentDateTime.getDate() +
    "T" +
    (currentDateTime.getHours() < 10 ? "0" : "") +
    currentDateTime.getHours() +
    ":" +
    (currentDateTime.getMinutes() < 10 ? "0" : "") +
    currentDateTime.getMinutes()
  );
  // Format: 2021-02-02T00:21
}

// API call string builder.
function buildAPICallString(dateTime) {
  let date = dateTime.split("T")[0];
  let hour = dateTime.split("T")[1].split(":")[0];
  return `gateway/prediction?date=${date}&hour=${hour}`;
}

const HeatMapPlot = () => {
  const [isLoading, setLoading] = useState(true);
  const [gridData, setGridData] = useState(null);
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    if (isLoading) {
      // After receiving endpoint, change the following simulateNetworkRequest to
      // fetch(buildAPICallString(dateTime))
      simulateNetworkRequest(buildAPICallString(dateTime))
        // .then((res) => {
        //   console.log(res);
        //   return res.json();
        // })
        .then(
          (predictionData) => {
            setPredictionData(predictionData);
            setGridData(buildGrid());
            setLoading(false);
            document.getElementById("datetime").value = dateTime;
          },
          (error) => {
            setLoading(false);
            alert(error);
          }
        );
    }
  }, [isLoading]);

  const handleClick = () => {
    const inputData = document.getElementById("datetime").value;
    if (Date.parse(inputData) > new Date()) {
      alert("Choosen Date Time cannot be in future.");
    } else {
      setDateTime(inputData);
      setLoading(true);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">Heat Map Plot</Card.Title>
        <p className="card-category">24 hrs performance</p>
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              {!isLoading && gridData && predictionData ? (
                <DashboardHeatmapContext.Provider
                  value={{ gridData, poiData, dateTime, predictionData }}
                >
                  <MapComponent
                    center={{
                      lat: 23.550399503999397,
                      lng: 87.2954336733082,
                    }}
                  />
                </DashboardHeatmapContext.Provider>
              ) : (
                "Loading Map..."
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <MapLegendCard />
            </Col>
            <Col>
              <Row>
                <label style={styles.fullWidthStyle} htmlFor="datetime">
                  Date & Time
                </label>
                <input
                  style={styles.fullWidthStyle}
                  type="datetime-local"
                  id="datetime"
                  name="datetime"
                />
                <Button
                  style={styles.dateSubmitButtonStyle}
                  variant="primary"
                  disabled={isLoading}
                  onClick={!isLoading ? handleClick : null}
                >
                  {isLoading ? "Loading…" : "Submit"}
                </Button>
              </Row>
            </Col>
          </Row>

          <Row>
            {predictionData && poiData && (
              <DashboardHeatmapContext.Provider
                value={{ predictionData, poiData }}
              >
                <POIListCard />
              </DashboardHeatmapContext.Provider>
            )}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default HeatMapPlot;
export { DashboardHeatmapContext as DashboardHeatmapContext };
