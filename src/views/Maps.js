import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  DirectionsService,
  Marker,
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
import "./Maps.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "75vh",
  borderRadius: "10px",
};
const center = {
  lat: 23.522431430261793,
  lng: 87.31047119682235,
};

const RouteRecommend = () => {
  const [response, setResponse] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [currentpos, setCurrentpos] = useState({});
  const [destination, setDestination] = useState("city centre durgapur");
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

  const handleSubmit = () => {
    if (destination) {
      setDestination(destRef.current.value);
    }
  };

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
              {destination && (
                <DirectionsService
                  // required
                  options={{
                    destination,
                    origin: currentpos,
                    travelMode: "WALKING",
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                  onLoad={(directionsService) => {
                    console.log(
                      "DirectionsService onLoad directionsService: ",
                      directionsService
                    );
                  }}
                  // optional
                  onUnmount={(directionsService) => {
                    console.log(
                      "DirectionsService onUnmount directionsService: ",
                      directionsService
                    );
                  }}
                />
              )}
              {destination && (
                <DirectionsRenderer
                  // required
                  options={{
                    directions: response,
                  }}
                  // optional
                  onLoad={(directionsRenderer) => {
                    console.log(
                      "DirectionsRenderer onLoad directionsRenderer: ",
                      directionsRenderer
                    );
                  }}
                  // optional
                  onUnmount={(directionsRenderer) => {
                    console.log(
                      "DirectionsRenderer onUnmount directionsRenderer: ",
                      directionsRenderer
                    );
                  }}
                />
              )}
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

export default RouteRecommend;
