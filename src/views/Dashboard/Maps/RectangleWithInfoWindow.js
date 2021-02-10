import React, { useState } from "react";

import { Rectangle, InfoWindow } from "@react-google-maps/api";

import GridDataTable from "./GridDataTable";
import colors from "./ClassColors";

const RectangleWithInfoWindow = (props) => {
  const [isClicked, setClicked] = useState(false);

  const colorMapper = (numeric) => {
    return Object.values(colors)[numeric - 1];
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
          strokeColor: colorMapper(props.point.color),
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: colorMapper(props.point.color),
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
