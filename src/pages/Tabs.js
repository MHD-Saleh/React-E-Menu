import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Button, createTheme, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Reports from "./Reports";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import instance from "../authConfig/axios";
import Messages from "../componant/Messages";
import Class from "../pages/Class";
import { Badge } from "@mui/material";
import MounthlyR from "../componant/MounthlyR";

export default function LabTabs() {
  const [isloading, setisloading] = React.useState(false);

  const [Count, setCount] = React.useState();

  const getReadMessages = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)

        url: "api/feedbackView",
        method: "GET",
      }).then((res) => {
        // handle success
        console.log("length messages is : ", res.data.length);
        setCount(res.data.length);
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  const CHART_DATA_1 = [
    {
      name: "meets",
      type: "column",
      data: [
        30, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 20, 55, 41, 67, 22, 43, 21,
        41, 30, 27, 43, 41, 67, 22, 43, 21, 41, 30, 27, 43,
      ],
    },
    {
      name: "Potato",
      type: "area",
      data: [
        20, 55, 41, 67, 22, 43, 21, 41, 30, 27, 43, 20, 55, 41, 67, 22, 43, 21,
        41, 30, 27, 43, 20, 55, 41, 67, 22, 43, 21, 41, 30,
      ],
    },
    {
      name: "falafel",
      type: "line",
      data: [
        25, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 25, 25, 36, 30, 45, 35, 64,
        52, 59, 36, 39, 25, 25, 36, 30, 45, 35, 64, 52, 59,
      ],
    },
  ];

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    //GetMounthlyReports();

    getReadMessages();
    console.log("get repo");
  }, []);

  var numb = 0;

  return (
    <>
      {isloading ? (
        <Typography variant="h3">Loading....</Typography>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Dayli Report" value="1" />
                <Tab label="Weackly Report" value="2" />
                <Tab label="Mounthly Report" value="3" />
                <Tab
                  label={
                    <Badge badgeContent={Count} color="error">
                      messages
                    </Badge>
                  }
                  value="4"
                />
              </TabList>
            </Box>
            <TabPanel value="1">Test</TabPanel>
            <TabPanel value="2">
              <Reports CHART_DATA={CHART_DATA_1} />
            </TabPanel>
            <TabPanel value="3">
              <MounthlyR />
            </TabPanel>
            <TabPanel value="4">
              <Messages />
            </TabPanel>
          </TabContext>
        </Box>
      )}
    </>
  );
}

//test
/*{Reportt.map((elem, index) => (
                <Typography key={index}>
                  index : {index} , name is : {elem.name} ,qtu : {elem.qtu}
                </Typography>
              ))} */
