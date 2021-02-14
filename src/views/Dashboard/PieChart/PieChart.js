import colors from "constants/AQIcolors";
import React from "react";
import { Pie } from "react-chartjs-2";

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
      data: [300, 50, 100, 50, 25],
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
