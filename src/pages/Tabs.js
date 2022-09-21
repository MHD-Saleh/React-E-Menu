import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Button, createTheme, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Reports from "./Reports";
import axios from "axios";
import instance from "../authConfig/axios";
import Messages from "../componant/Messages";
import Class from "../pages/Class";
import { Badge } from "@mui/material";
import MounthlyR from "../componant/MounthlyR";
import Daily from "../componant/Daily";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function LabTabs() {
  const { t, i18n, ready } = useTranslation("ns1", { useSuspense: false });

  const [isloading, setisloading] = React.useState(false);
  const navigate = useNavigate();

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
      if (e.response.status === 401) {
        navigate("/login");
        localStorage.removeItem("mytoken");
      }
    }
  };

  const CHART_DATA = [
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

  const [value, setValue] = React.useState("2");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [Reportt, setReportt] = React.useState([]);

  const GetMounthly = async () => {
    try {
      await instance({
        url: "api/teeest",
        method: "GET",
      }).then((res) => {
        setReportt(res.data);
      });
    } catch (e) {
      console.error(e);
    }
  };
  const [Dailyy, setDaily] = React.useState([]);

  const GetDaily = async () => {
    try {
      await instance({
        url: "api/dailyReport",
        method: "GET",
      }).then((res) => {
        setDaily(res.data);
      });
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    //GetMounthlyReports();
    GetMounthly();
    GetDaily();
    getReadMessages();
    console.log("get repo");
  }, []);

  return (
    <>
      {isloading ? (
        <Typography variant="h3">{i18n.t("loading")}</Typography>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label={i18n.t("Daily")} value="1" />
                <Tab label={i18n.t("Daily")} value="2" />
                <Tab label={i18n.t("Mounthly")} value="3" />
                <Tab
                  label={
                    <Badge badgeContent={Count} color="error">
                      {i18n.t("Message")}
                    </Badge>
                  }
                  value="4"
                />
              </TabList>
            </Box>
            <TabPanel value="1">Test</TabPanel>
            <TabPanel value="2">
              <Daily data={Dailyy} />
            </TabPanel>
            <TabPanel value="3">
              <MounthlyR data={Reportt} />
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

/* <Reports CHART_DATA={Daily} /> */

//test
/*{Reportt.map((elem, index) => (
                <Typography key={index}>
                  index : {index} , name is : {elem.name} ,qtu : {elem.qtu}
                </Typography>
              ))} */
