import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import * as Zoom from "chartjs-plugin-zoom";
import colors from "constants/AQIcolors";

const data = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
  datasets: [
    {
      label: colors[0].title,
      data: [3, 10, 13, 15, 22, 30, 23],
      backgroundColor: colors[0].color,
    },
    {
      label: colors[1].title,
      data: [3, 10, 13, 15, 22, 30, 23],
      backgroundColor: colors[1].color,
    },
    {
      label: colors[2].title,
      data: [2, 3, 20, 5, 1, 4, 2],
      backgroundColor: colors[2].color,
    },
    {
      label: colors[3].title,
      data: [12, 19, 3, 5, 2, 3, 3],
      backgroundColor: colors[3].color,
    },
    {
      label: colors[4].title,
      data: [12, 19, 3, 5, 2, 3, 3],
      backgroundColor: colors[4].color,
    },
  ],
};

const options = {
  responsive: true,
  //   title: {
  //     display: true,
  //     text: "Prediction Data",
  //     fontSize: 27,
  //   },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: "AQI Count",
          fontSize: 16,
        },
      },
    ],
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Days",
          fontSize: 16,
        },
      },
    ],
  },
  pan: {
    enabled: true,
    mode: "x",
    speed: 1,
    threshold: 1,
  },
  zoom: {
    enabled: true,
    mode: "x",
    speed: 1,
    rangeMin: {
      x: 2,
      y: 0,
    },
    rangeMax: {
      x: 50,
      y: 100,
    },
  },
};

const GroupedBarChart = () => {
  const [barData] = useState(data);
  return (
    <div style={{ margin: "30px" }}>
      <Bar data={barData} options={options} />
    </div>
  );
};

export default GroupedBarChart;