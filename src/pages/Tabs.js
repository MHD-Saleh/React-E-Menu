import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import { useNavigate } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import instance from "../authConfig/axios";
import Messages from "../componant/Messages";
import { Badge } from "@mui/material";
import MounthlyR from "../componant/MounthlyR";
import Daily from "../componant/Daily";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function LabTabs() {
  const { i18n } = useTranslation("ns1", { useSuspense: false });

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

  useEffect(() => {
    //GetMounthlyReports();
    GetMounthly();
    GetDaily();
    getReadMessages();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
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
