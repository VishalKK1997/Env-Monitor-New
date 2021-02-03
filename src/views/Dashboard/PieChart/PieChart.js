import { colors } from "constants/AQIcolors";
import React from "react";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Best", "Good", "Moderate", "Bad", "Worst"],
  datasets: [
    {
      data: [300, 50, 100, 50, 25],
      backgroundColor: [colors[5], colors[4], colors[3], colors[2], colors[1]],
      hoverBackgroundColor: [
        colors[5],
        colors[4],
        colors[3],
        colors[2],
        colors[1],
      ],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: "top",
    legendCallback: function (chart) {
      // Return the HTML string here.
      console.log(chart);
      return [
        <ul>
          <li>z</li>
          <li>zzzz</li>
          <li>ppp</li>
          <li>adasda</li>
        </ul>,
      ];
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

const PieChart = () => {
  return (
    <div>
      <Pie data={data} options={options} width={250} height={250} />
    </div>
  );
};

export default PieChart;
