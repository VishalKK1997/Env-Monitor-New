import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";

import {
  GoogleMap,
  useLoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

import RectangleWithInfoWindow from "./RectangleWithInfoWindow";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";

import hotelIcon from "./motel-2.png";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "75vh",
  borderRadius: "10px",
  margin: "15px auto 15px auto",
};

const MapComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState(props.center);
  const [searchBox, setSearchBox] = useState(null);

  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    console.log(searchBox.getPlaces());
    const selectedPlace_ = searchBox.getPlaces()[0];
    setSelectedPlace(selectedPlace_);
    setCenter(selectedPlace_.geometry.location);
  };

  return (
    <Container>
      <Row>
        <Col>
          {!isLoaded ? (
            "Loading..."
          ) : (
            <StandaloneSearchBox
              onLoad={onSearchBoxLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Enter a place to search"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `100%`,
                  height: `40px`,
                  padding: `0 12px`,
                  borderRadius: `10px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                }}
              />
            </StandaloneSearchBox>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {!isLoaded ? (
            "Loading Maps..."
          ) : (
            <GoogleMap
              id="dashboard-heatmap"
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={center}
            >
              {props.geodata &&
                props.geodata.map((point, idx) => (
                  <RectangleWithInfoWindow
                    key={"Rectagle" + idx}
                    point={point}
                  />
                ))}

              {props.hotelData &&
                props.hotelData.map((hotel, idx) => (
                  <MarkerWithInfoWindow
                    key={"Marker" + idx}
                    position={hotel.location}
                    info={
                      <div>
                        <h4>{hotel.name}</h4>
                        <p>Average Daily price: {hotel.price}</p>
                      </div>
                    }
                    icon={hotelIcon}
                  />
                ))}

              {selectedPlace && (
                <MarkerWithInfoWindow
                  key="SearchMarker"
                  position={selectedPlace.geometry.location}
                  info={<div>{selectedPlace.formatted_address}</div>}
                />
              )}
            </GoogleMap>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MapComponent;
