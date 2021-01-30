import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  DirectionsService,
  Marker,
  Rectangle,
} from "@react-google-maps/api";
import {
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  ProgressBar,
  Row,
  Button,
} from "react-bootstrap";
import _ from "lodash";
import "./RouteRecommender.css";
import getLatLng from "getLatLng";
import Geocode from "react-geocode";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "75vh",
  borderRadius: "10px",
};
const center = {
  lat: 23.550399503999397,
  lng: 87.2954336733082,
};

const xcoords = [23.534924, 23.5426365, 23.550349, 23.5580615, 23.565774];
const ycoords = [87.269568, 87.28258925, 87.2956105, 87.30863175, 87.321653];
let geodata = [];
const predictionData = [1, 2, 3, 4, 2, 2, 2, 2, 4, 5, 3, 2, 1, 2, 5, 3];
let k = 0;
for (let i = 0; i < xcoords.length - 1; i++) {
  for (let j = 0; j < ycoords.length - 1; j++) {
    geodata.push({
      sw: { lat: xcoords[i], lng: ycoords[j] },
      ne: { lat: xcoords[i + 1], lng: ycoords[j + 1] },
      color: predictionData[k++],
    });
  }
}

const colors = {
  1: "#900d0b",
  2: "#ed0202",
  3: "#ec9704",
  4: "#85d511",
  5: "#1d9f32",
};

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const RouteRecommender = () => {
  const [response, setResponse] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [currentpos, setCurrentpos] = useState({});
  const [destination, setDestination] = useState(null);
  const destRef = useRef(null);
  let watchID;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("moved in current");
      setCurrentpos({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    const watchID = navigator.geolocation.watchPosition((position) => {
      console.log("moved in watch", {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setCurrentpos({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }),
        (error) => alert(JSON.stringify(error)),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
          // distanceFilter: 100,
        };
    });
  }, []);

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Google Maps...";

  function handleSubmit() {
    Geocode.fromAddress(destRef.current.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
        setDestination(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const directionsCallback = (res) => {
    console.log(res, "res in directionsCallback");

    if (res !== null) {
      console.log(res, "directionsCallback");
      if (res.status === "OK") {
        setResponse(res);
      } else {
        console.log("response: ", res);
      }
    }
  };

  return (
    <div>
      <Container fluid="md">
        <Row>
          <Col md={7}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={center}
            >
              <Marker position={currentpos} />
              {destination && <Marker position={destination} />}
            </GoogleMap>
          </Col>

          <Col md={5}>
            <Card>
              <Card.Body>
                <ProgressBar animated now={45} />
                <InputGroup className="mb-3 input-margin">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                      Destination
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    ref={destRef}
                    id="basic-url"
                    aria-describedby="basic-addon3"
                  />
                </InputGroup>
                <Button
                  onClick={handleSubmit}
                  className="btn-fill"
                  variant="primary"
                  size="md"
                >
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RouteRecommender;
