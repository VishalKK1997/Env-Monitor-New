import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  DirectionsService,
  Marker,
  Rectangle,
  Polyline,
  Autocomplete,
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
import RangeSlider from "react-bootstrap-range-slider";
import {
  path1,
  path2,
  path3,
  path1Options,
  path2Options,
  path3Options,
  pathwithAlpha,
  pathwithAlphaOptions,
} from "constants/paths";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "86vh",
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

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const RouteRecommender = () => {
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [autoCompleteSource, setautoCompleteSource] = useState(null);
  const [autoCompleteDest, setautoCompleteDest] = useState(null);
  const [goValue, setgoValue] = useState(false);
  const [goDemoValue, setgoDemoValue] = useState(false);
  const [alphaValue, setAlphaValue] = useState(0);
  const [shortestRouteCheck, setShortestRouteCheck] = useState(false);
  const [optimalRouteCheck, setOptimalRouteCheck] = useState(false);
  const [safestRouteCheck, setSafestRouteCheck] = useState(false);
  const [response, setResponse] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [currentpos, setCurrentpos] = useState({});
  const [destination, setDestination] = useState(null);
  const destRef = useRef(null);
  let watchID;
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log("moved in current");
  //     setCurrentpos({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     });
  //   });

  //   const watchID = navigator.geolocation.watchPosition((position) => {
  //     console.log("moved in watch", {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     });
  //     setCurrentpos({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     }),
  //       (error) => alert(JSON.stringify(error)),
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 20000,
  //         maximumAge: 0,
  //         // distanceFilter: 100,
  //       };
  //   });
  // }, []);

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Google Maps...";

  function handleSubmit() {
    // Geocode.fromAddress(destRef.current.value).then(
    //   (response) => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     console.log(lat, lng);
    //     setDestination({ lat, lng });
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
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
    <Card className="root">
      <Card.Header>
        <Card.Title as="h4">Route Recommendation</Card.Title>
      </Card.Header>
      <Card.Body>
        <Container fluid="md">
          <Row>
            <Col md={7}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
              >
                {currentpos && <Marker position={currentpos} />}
                {destination && <Marker position={destination} />}

                {goValue && !goDemoValue && (
                  <Polyline
                    path={pathwithAlpha}
                    options={pathwithAlphaOptions}
                  />
                )}

                {(goDemoValue || safestRouteCheck) && (
                  <Polyline path={path1} options={path1Options} />
                )}
                {(goDemoValue || optimalRouteCheck) && (
                  <Polyline path={path2} options={path2Options} />
                )}
                {(goDemoValue || shortestRouteCheck) && (
                  <Polyline path={path3} options={path3Options} />
                )}
              </GoogleMap>
            </Col>

            <Col md={5}>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      setautoCompleteSource(autocomplete)
                    }
                    onPlaceChanged={() => {
                      if (autoCompleteSource !== null) {
                        setCurrentpos({
                          lat: autoCompleteSource
                            .getPlace()
                            .geometry.location.lat(),
                          lng: autoCompleteSource
                            .getPlace()
                            .geometry.location.lng(),
                        });
                      } else {
                        console.log("Autocomplete is not loaded yet!");
                      }
                    }}
                  >
                    <InputGroup className="mt-2 mb-1 input_source">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="source_input">
                          Source
                        </InputGroup.Text>
                      </InputGroup.Prepend>

                      <FormControl
                        disabled={checkboxVal}
                        ref={destRef}
                        id="source_input"
                        aria-describedby="source_input"
                      />
                    </InputGroup>
                  </Autocomplete>
                  <div>
                    <input
                      value={checkboxVal}
                      onClick={() => setCheckboxVal((val) => !val)}
                      type="checkbox"
                      className="input_checkbox"
                    />
                    <span className="span_checkbox">
                      Set as current location
                    </span>
                  </div>

                  <Autocomplete
                    onLoad={(autocomplete) => setautoCompleteDest(autocomplete)}
                    onPlaceChanged={() => {
                      if (autoCompleteDest !== null) {
                        setDestination({
                          lat: autoCompleteDest
                            .getPlace()
                            .geometry.location.lat(),
                          lng: autoCompleteDest
                            .getPlace()
                            .geometry.location.lng(),
                        });
                      } else {
                        console.log("Autocomplete is not loaded yet!");
                      }
                    }}
                  >
                    <InputGroup className="mt-4 mb-4 input_destination">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="destination_input">
                          Destination
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        ref={destRef}
                        id="destination_input"
                        aria-describedby="destination_input"
                      />
                    </InputGroup>
                  </Autocomplete>

                  <Form.Group className="mb-4" controlId="formBasicRange">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label>Safest</Form.Label>
                      <Form.Label>Shortest</Form.Label>
                    </div>

                    <RangeSlider
                      min={0}
                      max={10}
                      value={alphaValue}
                      tooltipLabel={(currentValue) => `${currentValue / 10}`}
                      tooltip="auto"
                      onChange={(e) => setAlphaValue(e.target.value)}
                    />
                  </Form.Group>

                  <label>Show 3 paths</label>
                  <div>
                    <div className="go_demo_checkbox">
                      <input
                        value={goDemoValue}
                        onClick={() => setgoDemoValue((val) => !val)}
                        type="checkbox"
                        className="input_checkbox"
                      />
                      <span className="span_checkbox">Go Demo</span>
                    </div>
                    <div className="div_checkbox">
                      <div className="go_checkbox">
                        <input
                          value={shortestRouteCheck}
                          onClick={() => setShortestRouteCheck((val) => !val)}
                          type="checkbox"
                          className="input_checkbox"
                        />
                        <span
                          style={{
                            backgroundColor: "#ff3700",
                            width: "35px",
                            height: "13px",
                            display: "inline-block",
                            marginRight: "4px",
                          }}
                        ></span>
                        <span className="span_checkbox">Shortest</span>
                      </div>
                      <div className="go_checkbox">
                        <input
                          value={optimalRouteCheck}
                          onClick={() => setOptimalRouteCheck((val) => !val)}
                          type="checkbox"
                          className="input_checkbox"
                        />
                        <span
                          style={{
                            backgroundColor: "#00b6ff",
                            width: "35px",
                            height: "13px",
                            display: "inline-block",
                            marginRight: "4px",
                          }}
                        ></span>
                        <span className="span_checkbox">Optimal </span>
                      </div>
                      <div className="go_checkbox">
                        <input
                          value={safestRouteCheck}
                          onClick={() => setSafestRouteCheck((val) => !val)}
                          type="checkbox"
                          className="input_checkbox"
                        />
                        <span
                          style={{
                            backgroundColor: "#ffaa00",
                            width: "35px",
                            height: "13px",
                            display: "inline-block",
                            marginRight: "4px",
                          }}
                        ></span>
                        <span className="span_checkbox">Safest</span>
                      </div>
                    </div>
                  </div>

                  <label>Show custom path</label>
                  <div className="go_checkbox">
                    <input
                      value={goValue}
                      onClick={() => setgoValue((val) => !val)}
                      type="checkbox"
                      className="input_checkbox"
                    />
                    <span className="span_checkbox">Go</span>
                  </div>
                  <Button
                    onClick={handleSubmit}
                    className="btn-fill mt-3"
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
      </Card.Body>
    </Card>
  );
};

export default RouteRecommender;
