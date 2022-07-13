import Button from "@mui/material/Button";
import SB from "../componant/SB";
//import pusherJs from "pusher-js";

import React, { useState } from "react";
import {
  createTheme,
  Grid,
  Paper,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EditType from "../componant/editType";
import instance from "../authConfig/axios";
import OfferTap from "../componant/OfferTap";

const Offers = () => {
  // Enable pusher logging
  // pusherJs.logToConsole = true;
  // pusherJs
  /*
  var pusher = new pusherJs("9aa6bd46d4105d1a9109", {
    cluster: "ap2",
  });

  var channel = pusher.subscribe("saleh-channel");
  channel.bind("event-pusher", function (data) {
    console.error("pusher Says : ", data.data.message);
    setmsg(data.data.message);
    handelClickGreen();
    //alert(JSON.stringify(data));
  });*/

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Offer Edit" value="1" />
            <Tab label=" Product Type" value="2" />
            <Tab label="Others" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <OfferTap />
        </TabPanel>
        <TabPanel value="2">
          <EditType />
        </TabPanel>
        <TabPanel value="3"> Page</TabPanel>
      </TabContext>
    </div>
  );
};

export default Offers;
