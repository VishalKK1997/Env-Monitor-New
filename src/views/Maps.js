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
import "./Maps.css";
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

const RouteRecommend = () => {
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

  // const handleSubmit = () => {
  //   // if (destination) {
  //   //   setDestination(destRef.current.value);
  //   // }
  //   // setDestination({ lat: 23.539840749030184, lng: 87.30470526143955 });
  // };

  // const handleSubmit = () => {
  //   let lat, lng, placeId;
  //   new window.google.maps.Geocoder().geocode(
  //     { address: `${destRef.current.value}` },
  //     function (results, status) {
  //       if (status === window.google.maps.GeocoderStatus.OK) {
  //         placeId = results[0].place_id;
  //         createGoogleMap(results[0].geometry.location);
  //         lat = results[0].geometry.location.lat();
  //         lng = results[0].geometry.location.lng();
  //         new window.google.maps.Marker({
  //           position: { lat, lng },
  //           map: googleMap,
  //           animation: window.google.maps.Animation.DROP,
  //           title: `${destRef.current.value}`,
  //         });
  //         // setGoogleMapInfo({ ...GoogleMapInfo, lat, lng, placeId, isLoading: false, googleMap });
  //         setDestination({ lat, lng });
  //       } else {
  //         alert(
  //           "Geocode was not successful for the following reason: " + status
  //         );
  //       }
  //     }
  //   );
  // };

  function handleSubmit() {
    // getLatLng
    //   .getLatLon(
    //     destRef.current.value,
    //     process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    //   )
    //   .then((response) => {
    //     //console.log(response.data)
    //     if (response && response.data) {
    //       console.log(response, "response");
    //       if (response.data.results && response.data.results.length) {
    //         const lat = response.data.results[0].geometry.location.lat;
    //         const lng = response.data.results[0].geometry.location.lng;
    //         //console.log(lat, lon);
    //         setDestination({ lat, lng });
    //       } else {
    //         alert("Failed in success!");
    //       }
    //     }
    //   })
    //   .catch(function (error) {
    //     alert("Failed!");
    //   });
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
              <Marker
                position={currentpos}
                // icon={{
                //   url: "/logo.svg",
                //   scaledSize: new window.google.maps.Size(50, 50),
                //   origin: new window.google.maps.Point(0, 0),
                //   anchor: new window.google.maps.Point(25, 25),
                // }}
              />
              {destination && <Marker position={destination} />}
              {/*{geodata.map((point) => <Rectangle
                bounds={{
                  north: 23.549872143205175,
                  east: 87.27976334284111,
                  south: 23.555812505690376,
                  west: 87.2740985174704,
                }}
                options={{
                  strokeColor: colors[point.color],
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: colors[point.color],
                  fillOpacity: 0.35,
                }}
              />)}*/}

              {geodata.map((point) => (
                <Rectangle
                  bounds={{
                    north: point.ne.lat,
                    east: point.ne.lng,
                    south: point.sw.lat,
                    west: point.sw.lng,
                  }}
                  options={{
                    strokeColor: colors[point.color],
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: colors[point.color],
                    fillOpacity: 0.35,
                  }}
                />
              ))}

              {/*
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
              )}*/}
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
