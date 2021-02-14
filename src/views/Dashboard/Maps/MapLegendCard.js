import { Container, Row, Col, Card } from "react-bootstrap";
import MapLegendItem from "./MapLegendItem";
import styles from "../../../styles/DashboardHeatMapPlotStyles";
import AQIcolors from "../../../constants/AQIcolors";

const MapLegendCard = () => {
  return (
    <Card style={styles.fullWidthStyle}>
      <Card.Header>Legends</Card.Header>
      <Card.Body>
        <Container>
          <Row style={{ display: "flex", justifyContent: "flex-start" }}>
            {AQIcolors.map((aqiClass, index) => (
              <MapLegendItem
                key={`MapLegend${index}`}
                title={aqiClass.title}
                color={aqiClass.color}
              />
            ))}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default MapLegendCard;

// <Table bordered>
// <thead></thead>
// <tbody>
//   {AQIcolors.map((aqiClass, index) => (
//     <tr key={`Legend${index}`}>
//       <td style={{ backgroundColor: aqiClass.color }}></td>
//       <td>{aqiClass.title}</td>
//     </tr>
//   ))}
// </tbody>
// </Table>
