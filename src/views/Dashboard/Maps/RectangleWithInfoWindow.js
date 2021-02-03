import React, { useState } from "react";

import { Rectangle, InfoWindow } from "@react-google-maps/api";

import GridDataTable from "./GridDataTable";

const RectangleWithInfoWindow = (props) => {
  const [isClicked, setClicked] = useState(false);

  const colors = {
    1: "#900d0b",
    2: "#ed0202",
    3: "#ec9704",
    4: "#85d511",
    5: "#1d9f32",
  };
  return (
    <div>
      <Rectangle
        key={props.point.id}
        onClick={() => {
          setClicked(true);
        }}
        bounds={{
          north: props.point.ne.lat,
          east: props.point.ne.lng,
          south: props.point.sw.lat,
          west: props.point.sw.lng,
        }}
        options={{
          strokeColor: colors[props.point.color],
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: colors[props.point.color],
          fillOpacity: 0.35,
        }}
      />
      {isClicked && (
        <InfoWindow
          onCloseClick={() => {
            setClicked(false);
          }}
          position={{
            lat: (props.point.ne.lat + props.point.sw.lat) / 2,
            lng: (props.point.ne.lng + props.point.sw.lng) / 2,
          }}
        >
          <GridDataTable gridId={props.point.id} />
        </InfoWindow>
      )}
    </div>
  );
};

export default RectangleWithInfoWindow;
