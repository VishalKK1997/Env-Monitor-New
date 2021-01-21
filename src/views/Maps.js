import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "65vw",
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

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Google Maps...";

  const directionsCallback = (res) => {
    console.log(res);

    if (res !== null) {
      if (res.status === "OK") {
        setResponse(res);
      } else {
        console.log("response: ", res);
      }
    }
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <DirectionsService
          // required
          options={{
            destination: { lat: 23.547868393030193, lng: 87.29303100896361 },
            origin: { lat: 23.535975578980082, lng: 87.29752733862512 },
            travelMode: "DRIVING",
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
      </GoogleMap>
    </div>
  );
};

export default RouteRecommend;
