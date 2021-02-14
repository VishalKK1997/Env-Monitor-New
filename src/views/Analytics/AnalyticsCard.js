import React from "react";
import GroupedBarChart from "./GroupedBarChart/GroupedBarChart";
import PieChart from "./PieChart/PieChart";
import { Card, Container, Row, Col } from "react-bootstrap";

const AnalyticsCard = () => {
  return (
    <Container>
      <Row>
        <Col md="9">
          <GroupedBarChart />
        </Col>
        <Col md="3">
          <PieChart />
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsCard;
