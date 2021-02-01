import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import RectangleWithInfoWindow from "./RectangleWithInfoWindow";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";

import hotelIcon from "./motel-2.png";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "75vh",
  borderRadius: "10px",
  margin: "15px",
};

const MapComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <Container>
      <Row>
        <Col>
          {!isLoaded ? (
            "Loading Maps..."
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={props.center}
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
            </GoogleMap>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MapComponent;
