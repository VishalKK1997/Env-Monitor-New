import React, { useState } from "react";

import { Marker, InfoWindow } from "@react-google-maps/api";

const MarkerWithInfoWindow = (props) => {
  const [isClicked, setClicked] = useState(false);

  console.log(props);
  return (
    <Marker
      position={props.position}
      onClick={() => {
        setClicked(true);
      }}
      icon={props.icon}
    >
      {isClicked && (
        <InfoWindow
          onCloseClick={() => {
            setClicked(false);
          }}
        >
          {props.info}
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MarkerWithInfoWindow;
