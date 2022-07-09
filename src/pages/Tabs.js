import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Button, Typography } from "@mui/material";
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

export default function LabTabs() {
  //http://127.0.0.1:8000/api/monthlyReport

  const [Reportt, setReportt] = React.useState([]);

  const [type1, settype1] = React.useState([]);
  const [isloading, setisloading] = React.useState(true);

  const type = [];
  const qty = [];

  const myChar = [
    {
      name: "meets",
      type: "column",
      data: [30, 20, 30],
    },
  ];

  const myChar_t = [
    {
      name: "meets",
      type: "column",
      data: [30, 20],
    },
  ];

  const Getrepo = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/monthlyReport",
        method: "GET",
      }).then((res) => {
        // handle success
        console.log(
          "main data : " + JSON.stringify(res.data.report["2022-07-03"])
        );

        setReportt(res.data.report["2022-07-03"]);
        var chicken_sum_1 = 0;

        res.data.report["2022-07-03"].filter((type) => {
          if (type.name === "فروج") {
            return (chicken_sum_1 = chicken_sum_1 + type.qtu);
          }
        });
        console.log("sum of فروج: " + chicken_sum_1);
        var meet_sum_1 = 0;
        res.data.report["2022-07-03"].filter((type) => {
          if (type.name === "لحم") {
            return (meet_sum_1 = meet_sum_1 + type.qtu);
          }
        });
        console.log("sum of لحم: " + meet_sum_1);

        //"2022-07-05"

        var chicken_sum_2 = 0;
        res.data.report["2022-07-05"].filter((type) => {
          if (type.name === "فروج") {
            return (chicken_sum_2 = chicken_sum_2 + type.qtu);
          }
        });
        console.log("sum of فروج: " + chicken_sum_2);

        var meet_sum_2 = 0;
        res.data.report["2022-07-03"].filter((type) => {
          if (type.name === "لحم") {
            return (meet_sum_2 = meet_sum_2 + type.qtu);
          }
        });
        console.log("sum of لحم: " + meet_sum_2);

        //nietos.push({ "01": nieto.label, "02": nieto.value });
        var myarr = [chicken_sum_1, chicken_sum_2];

        myChar[0] = {
          name: "meets",
          type: "column",
          data: myarr,
        };

        console.log("my char is " + JSON.stringify(myChar));
        console.log("my char_t is " + JSON.stringify(myChar_t));

        setisloading(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
      //handelClick();
      // setmessage("error with get Type List");
    }
  };

  const navigate = useNavigate();
  const CHART_DATA_1 = [
    {
      name: "meets",
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

  React.useEffect(() => {
    //GetMounthlyReports();
    Getrepo();
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
                    <Badge badgeContent={4} color="error">
                      messages
                    </Badge>
                  }
                  value="4"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              {Reportt.map((elem, index) => (
                <Typography key={index}>
                  index : {index} , name is : {elem.name} ,qtu : {elem.qtu}
                </Typography>
              ))}
            </TabPanel>
            <TabPanel value="2">
              <Reports CHART_DATA={myChar} />
              <Button
                onClick={() => {
                  Getrepo();
                }}
              >
                update
              </Button>
            </TabPanel>
            <TabPanel value="3">
              <Class />
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
