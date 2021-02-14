import React from "react";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import { Card, Dropdown, Container, Row, Col } from "react-bootstrap";

import POICard from "./POICard";
import styles from "../../../styles/DashboardHeatMapPlotStyles";
import { DashboardHeatmapContext } from "./HeatMapPlot";

const POIListCard = () => {
  const { predictionData, poiData } = React.useContext(DashboardHeatmapContext);
  // const [selectedPois, setSelectedPois] = React.useState(null);
  // const [poiArray, setPoiArray] = React.useState(poiData);

  const buildListData = ({ index, style }) => {
    let filteredArray = poiData;
    return (
      <ListItem style={style} key={index}>
        <POICard poi={filteredArray[index]} />
      </ListItem>
    );
  };

  // const onValueChange= () => {
  //   // setSelectedPois(dropdown.value)
  // }

  return (
    <Card style={styles.fullWidthStyle}>
      <Card.Header>
        <Container>
          <Row>
            <Col>
              <div>POIs</div>
              <label for="poi-dropdown">Select POI type</label>
              <Dropdown id="poi-dropdown">
                <Dropdown.Toggle>All</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Hotel</Dropdown.Item>
                  <Dropdown.Item>School</Dropdown.Item>
                  <Dropdown.Item>Park</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Card.Body>
        {predictionData && poiData && (
          <FixedSizeList
            height={400}
            itemCount={poiData.length}
            itemSize={300}
            width={950}
            layout="horizontal"
          >
            {buildListData}
          </FixedSizeList>
        )}
      </Card.Body>
    </Card>
  );
};

export default POIListCard;
