import colors from "constants/AQIcolors";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import formatDate from "utils/formatDate";
import { AQICountDaily } from "utils/networkUtil";
import "./PieChart.css";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: "top",
    // legendCallback: function (chart) {
    //   // Return the HTML string here.
    //   console.log(chart);
    //   return [
    //     <ul>
    //       <li>z</li>
    //       <li>zzzz</li>
    //       <li>ppp</li>
    //       <li>adasda</li>
    //     </ul>,
    //   ];
    // },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

const PieChart = () => {
  const [date, setdate] = useState(formatDate(new Date()));
  const [chartData, setchartData] = useState(null);

  useEffect(() => {
    const apiData = async () => {
      const response = await AQICountDaily(date);
      const data = {
        labels: [
          colors[0].title,
          colors[1].title,
          colors[2].title,
          colors[3].title,
          colors[4].title,
        ],
        datasets: [
          {
            data: response,
            backgroundColor: [
              colors[0].color,
              colors[1].color,
              colors[2].color,
              colors[3].color,
              colors[4].color,
            ],
            hoverBackgroundColor: [
              colors[0].color,
              colors[1].color,
              colors[2].color,
              colors[3].color,
              colors[4].color,
            ],
          },
        ],
      };
      setchartData(data);
    };

    apiData();
  }, [date]);

  if (!chartData) return <div>Loading...</div>;
  return (
    <Card style={{ height: "100%" }}>
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
          <div className="date_input">
            <label htmlFor="date-input">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setdate(formatDate(e.target.value))}
              name="date-input"
            />
          </div>
          <Pie data={chartData} options={options} width={150} height={150} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PieChart;
