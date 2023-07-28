import { useState } from "react";
import Chart from "react-apexcharts";

const RadialBar = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [44, 55],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
              color: "#fff",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249;
              },
              style: {
                color: "#fff", // Set the color to white
              },
              color: "#fff",
            },
          },
        },
      },
      labels: ["Mens", "Womens"],
    },
  });
  return (
    <Chart
      options={chartOptions.options}
      series={chartOptions.series}
      type="radialBar"
    />
  );
};

export default RadialBar;
