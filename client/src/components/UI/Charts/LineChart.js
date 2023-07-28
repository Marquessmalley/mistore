import { useState } from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false, // Hide the toolbar (zoom, pan, reset icons)
        },
      },
      xaxis: {
        labels: {
          show: false, // Hide x-axis labels
        },
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        axisBorder: {
          show: false, // Hide x-axis line and ticks
        },
        axisTicks: {
          show: false, // Hide x-axis small tick lines
        },
      },
      yaxis: {
        labels: {
          show: false, // Hide y-axis labels
        },
        axisBorder: {
          show: false, // Hide y-axis line and ticks
        },
      },
      dataLabels: {
        enabled: false, // Hide data labels on the line points
      },
      stroke: {
        width: 2, // Set the width of the line
        curve: "smooth", // Set the line curve
      },
      markers: {
        size: 0, // Hide the data points markers
      },
      tooltip: {
        enabled: true, // Hide the tooltip on hover
      },
      grid: {
        show: false, // Hide the grid lines
      },
      fill: {
        opacity: 1, // Adjust the opacity of the fill area (if needed)
      },
    },
    series: [
      {
        name: "series-1",
        data: [130, 440, 345, 550, 549, 760, 270, 691],
      },
    ],
  });

  return (
    <Chart
      options={chartOptions.options}
      series={chartOptions.series}
      type="line"
      // width="200"
    />
  );
};

export default LineChart;
