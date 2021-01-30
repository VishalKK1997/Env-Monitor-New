import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import MapComponent from "./MapComponent";

import hotelData from "./HotelData";

const xcoords = [23.534924, 23.5426365, 23.550349, 23.5580615, 23.565774];
const ycoords = [87.269568, 87.28258925, 87.2956105, 87.30863175, 87.321653];
let geodata = [];
const predictionData = [1, 2, 3, 4, 2, 2, 2, 2, 4, 5, 3, 2, 1, 2, 5, 3];
let k = 0;
let id = 0;
for (let i = 0; i < xcoords.length - 1; i++) {
  for (let j = 0; j < ycoords.length - 1; j++) {
    geodata.push({
      id: id++,
      sw: { lat: xcoords[i], lng: ycoords[j] },
      ne: { lat: xcoords[i + 1], lng: ycoords[j + 1] },
      color: predictionData[k++],
      info: `Hello from Grid ${id}`,
    });
  }
}

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

function simulateNetworkRequest() {
  shuffle(geodata);
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

const HeatMapPlot = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);
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
              <MapComponent
                center={{
                  lat: 23.550399503999397,
                  lng: 87.2954336733082,
                }}
                geodata={geodata}
                hoteldata={hotelData}
              />
            </Col>
            <Col xs={4}>
              <label for="birthdaytime">Date & Time</label>
              <input
                type="datetime-local"
                id="birthdaytime"
                name="birthdaytime"
              />
              <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
              >
                {isLoading ? "Loading…" : "Submit"}
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default HeatMapPlot;
