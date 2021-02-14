import React from "react";
import { Card, Image } from "react-bootstrap";

import getInfoBuilder from "../../../constants/POIInfoViewBuilder";
import styles from "../../../styles/DashboardHeatMapPlotStyles";
import { DashboardHeatmapContext } from "./HeatMapPlot";

const POICard = (props) => {
  const predictionData = React.useContext(DashboardHeatmapContext)
    .predictionData;

  return (
    <Card
      style={{
        ...styles.fullWidthStyle,
        ...props.style,
        marginTop: "2px",
        marginBottom: "2px",
      }}
    >
      <Image
        src={props.poi.image_url}
        rounded
      />
      <Card.Header>
        <Card.Title style={styles.boldFont}>{props.poi.name}</Card.Title>
        <p className="card-category">{props.poi.poi_type}</p>
      </Card.Header>
      <Card.Body>
        <div>
          <div>
            AQI:
            {predictionData[props.poi.grid_id]
              ? ` ${predictionData[props.poi.grid_id]}`
              : " NA"}
          </div>
          {getInfoBuilder(props.poi.poi_type)(props.poi)}
        </div>
      </Card.Body>
    </Card>
  );
};

export default POICard;
