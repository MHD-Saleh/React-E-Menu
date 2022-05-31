import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Reports from "./Reports";

export default function LabTabs() {
  const CHART_DATA_1 = [
    {
      name: "Shawrmma",
      type: "column",
      data: [30, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
    {
      name: "Potato",
      type: "area",
      data: [20, 55, 41, 67, 22, 43, 21, 41, 30, 27, 43],
    },
    {
      name: "falafel",
      type: "line",
      data: [25, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    },
  ];

  const CHART_DATA_2 = [
    {
      name: "Meat",
      type: "column",
      data: [10, 11, 9, 7, 12, 6, 20, 15, 11, 6, 4],
    },
    {
      name: "Cola",
      type: "area",
      data: [60, 50, 65, 25, 20, 40, 45, 37, 23, 15, 10],
    },
    {
      name: "Frensh Frice",
      type: "line",
      data: [25, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    },
  ];
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dayli Report" value="1" />
            <Tab label="Weackly Report" value="2" />
            <Tab label="Mounthly Report" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Reports CHART_DATA={CHART_DATA_1} />
        </TabPanel>
        <TabPanel value="2">
          <Reports CHART_DATA={CHART_DATA_2} />
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
