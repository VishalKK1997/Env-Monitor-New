import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import MapComponent from "./MapComponent";

import hotelData from "./HotelData";

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

// Grid Builder function. Grid locations are constant. Not fetched from Network.
function buildGrid() {
  const xcoords = [23.534924, 23.5426365, 23.550349, 23.5580615, 23.565774];
  const ycoords = [87.269568, 87.28258925, 87.2956105, 87.30863175, 87.321653];
  let geodata = [];
  for (let i = 0; i < xcoords.length - 1; i++) {
    for (let j = 0; j < ycoords.length - 1; j++) {
      geodata.push({
        sw: { lat: xcoords[i], lng: ycoords[j] },
        ne: { lat: xcoords[i + 1], lng: ycoords[j + 1] },
      });
    }
  }
  return geodata;
}

// Demo Data builder.
function buildDemoData() {
  let demoData = buildGrid();
  const demoArray = [1, 2, 3, 4, 2, 2, 2, 2, 4, 5, 3, 2, 1, 2, 5, 3];
  const predictionData = shuffle(demoArray);
  demoData.forEach((obj, index) => {
    obj["id"] = index;
    obj["color"] = predictionData[index];
  });
  return demoData;
}

// Network Request Simulator
function simulateNetworkRequest(dateTime) {
  let date = dateTime.split("T")[0];
  let hour = dateTime.split("T")[1].split(":")[0];
  const apiCallString = `gateway/prediction?date=${date}&hour=${hour}`;
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
  //2021-02-02T00:21
}

const HeatMapPlot = () => {
  const [isLoading, setLoading] = useState(true);
  const [geoData, setGeoData] = useState(null);
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest(dateTime).then((data) => {
        setLoading(false);
        setGeoData(data);
        document.getElementById("datetime").value = dateTime;
      });
    }
  }, [isLoading]);

  const handleClick = () => {
    const inputData = document.getElementById("datetime").value;
    setDateTime(inputData);
    setLoading(true);
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
              {!isLoading && geoData ? (
                <MapComponent
                  center={{
                    lat: 23.550399503999397,
                    lng: 87.2954336733082,
                  }}
                  geodata={geoData}
                  hotelData={hotelData}
                />
              ) : (
                "Loading Map..."
              )}
            </Col>
            <Col xs={4}>
              <label htmlFor="datetime">Date & Time</label>
              <br />
              <input type="datetime-local" id="datetime" name="datetime" />
              <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
              >
                {isLoading ? "Loading…" : "Submit"}
              </Button>

              <Row>
                <Table bordered>
                  <thead>
                    <tr>
                      <td colSpan={5}>Legends</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: "#900d0b" }}></td>
                      <td style={{ backgroundColor: "#ed0202" }}></td>
                      <td style={{ backgroundColor: "#ec9704" }}></td>
                      <td style={{ backgroundColor: "#85d511" }}></td>
                      <td style={{ backgroundColor: "#1d9f32" }}></td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default HeatMapPlot;
