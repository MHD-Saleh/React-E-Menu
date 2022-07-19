import Button from "@mui/material/Button";
import SB from "../componant/SB";
//import pusherJs from "pusher-js";

import React, { useEffect, useState } from "react";

import {
  createTheme,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  styled,
  Switch,
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
import i18next from "i18next";
import MorePage from "../componant/MorePage";

const Offers = () => {
  // Enable pusher logging
  // pusherJs.logToConsole = true;
  // pusherJs

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Gift Edit" value="1" />
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
        <TabPanel value="3">
          <MorePage />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Offers;
