import { useState } from "react";
import Chart from "react-apexcharts";

const AreaChart = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: "Total Income",
        data: [31, 40, 28, 51, 42, 109, 100],
        show: false,
      },
      {
        name: "Tptal Expenses",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false, // Hide the toolbar (zoom, pan, reset icons)
        },
      },

      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      colors: ["#00E396", "#008FFB"],

      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft",
          offsetX: 60,
          offsetY: 30,
        },
      },
      legend: {
        show: false, // Hide the legend text
      },
    },
  });
  return (
    <Chart
      options={chartOptions.options}
      series={chartOptions.series}
      height={250}
    />
  );
};

export default AreaChart;
