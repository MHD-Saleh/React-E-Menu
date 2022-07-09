import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";

import BaseOptionChart from "../componant/BaseOptionChart";
import { useState } from "react";

const Reports = (props) => {
  const [test, settest] = useState("");
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
    fill: { type: ["solid", "gradient", "solid"] },
    labels: [
      "01/01/2022",
      "02/01/2022",
      "03/01/2022",
      "04/01/2022",
      "05/01/2022",
      "06/01/2022",
      "07/01/2022",
      "08/01/2022",
      "09/01/2022",
      "10/01/2022",
      "11/01/2022",
    ],
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} Orders`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Resturant Orders" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={props.CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
};

export default Reports;
