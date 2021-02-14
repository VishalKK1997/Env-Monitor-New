import React from "react";
import GroupedBarChart from "./GroupedBarChart/GroupedBarChart";
import PieChart from "./PieChart/PieChart";
import { Card, Container, Row, Col } from "react-bootstrap";

const AnalyticsCard = () => {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Header>
        <Card.Title as="h4">Analytics</Card.Title>
        <p className="card-category">Analytics chart</p>
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col md="9">
              <Card style={{ height: "90%" }}>
                <Card.Header>
                  <Card.Title as="h4">Prediction Data</Card.Title>
                  <span className="card-category">Last 7 days performance</span>
                  <input type="date" style={{ marginLeft: "5%" }} />
                </Card.Header>
                <Card.Body>
                  <GroupedBarChart />
                </Card.Body>
              </Card>
            </Col>
            <Col md="3">
              <Card style={{ height: "90%" }}>
                <Card.Header>
                  <Card.Title as="h4">Prediction Data</Card.Title>
                  <p className="card-category">24 hrs performance</p>
                </Card.Header>
                <Card.Body>
                  <div
                    className="ct-chart ct-perfect-fourth"
                    // style={{ width: "100%", height: "100%" }}
                    id="chartPreferences"
                  >
                    <PieChart />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default AnalyticsCard;
