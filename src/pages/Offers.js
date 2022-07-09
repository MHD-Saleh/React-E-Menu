import Button from "@mui/material/Button";
import SB from "../componant/SB";
//import pusherJs from "pusher-js";

import React, { useState } from "react";
import { Grid, Paper, Tab, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EditType from "../componant/editType";
import instance from "../authConfig/axios";

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

  const [Type, setType] = useState("");

  const handleSetType = (e) => {
    setType(e.target.value);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const postType = async () => {
    //api/typeStore
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/typeStore`,
        method: "POST",
        data: {
          name: Type,
        },
      }).then((res) => {
        // handle success
        console.log("created");
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
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
          <Paper sx={{ padding: "50px", margin: "20px" }}>
            <Typography variant="h3" sx={{ paddingBottom: "30px" }}>
              Offer Name
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "& .MuiTextField-root": { width: "25ch" },
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ paddingBottom: "30px", width: "100px" }}
                margin="dense"
                id="offer"
                label="Offer Name"
                type="text"
                name="offer"
                value={Type}
                onChange={handleSetType}
              />

              <Button
                sx={{ width: "70px" }}
                color="primary"
                variant="contained"
                onClick={() => {
                  postType();
                }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
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
