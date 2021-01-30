import React from "react";
import { Card } from "react-bootstrap";

import {
  GoogleMap,
  Marker,
  Rectangle,
  useLoadScript,
} from "@react-google-maps/api";
const libraries = ["places"];
const mapContainerStyle = {
  width: "60%",
  height: "75vh",
  borderRadius: "10px",
  margin: "15px",
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

const Maps = () => {
  const [response, setResponse] = React.useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [currentpos, setCurrentpos] = React.useState({});
  const [destination, setDestination] = React.useState(null);
  const destRef = React.useRef(null);
  let watchID;
  React.useEffect(() => {
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

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">Heat Map Plot</Card.Title>
        <p className="card-category">24 hrs performance</p>
      </Card.Header>
      <Card.Body>
        {!isLoaded ? (
          "Loading Maps...."
        ) : (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={center}
          >
            <Marker position={currentpos} />
            {destination && <Marker position={destination} />}
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
          </GoogleMap>
        )}
      </Card.Body>
    </Card>
  );
};

export default Maps;
