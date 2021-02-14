import colors from "constants/AQIcolors";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import formatDate from "utils/formatDate";
import "./PieChart.css";

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
  return (
    <div>
      <div className="date_input">
        <label htmlFor="date-input">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setdate(formatDate(e.target.value))}
          name="date-input"
        />
      </div>
      <Pie data={data} options={options} width={150} height={150} />
    </div>
  );
};

export default PieChart;
