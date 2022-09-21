import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { InputField } from "../../FormFields";
import table from "../../../../image/setting.png";
import {
  CardMedia,
  createTheme,
  List,
  ListItem,
  Paper,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import i18n from "../../../../i18n";
import { makeStyles } from "@material-ui/core/styles";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import instance from "../../../../authConfig/axios";
import { FormLabel } from "react-bootstrap";

const theme = createTheme({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  leftPane: {
    width: "50%",
    margin: "5px",
  },
  rightPane: {
    width: "50%",
    margin: "5px",
    pt: "20px",
    paddingTop: "70px",
  },
});

export default function First(props) {
  //api/restaurantView

  const [Rest, setRest] = useState([]);

  const GetRR = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/restaurantView",
        method: "GET",
      }).then((res) => {
        // handle success
        console.log(res.data);
        setRest(res.data);
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };
  const [action, setaction] = useState();
  const handleRadioChange = (event) => {
    console.log("eventttt " + event.target.value);
    setaction(event.target.value);
    // changeType(event.target.value);
    // localStorage.setItem("RestName",)
    localStorage.setItem("RestDomain", event.target.value);
  };

  useEffect(() => {
    document.title = "Setting";
    GetRR();
  }, []);
  const {
    formField: { firstName, lastName, name, domain },
  } = props;
  return (
    <div style={theme.splitScreen}>
      <div style={theme.leftPane}>
        <div style={{ height: 400, width: "100%" }}>
          {" "}
          <img src={table} alt="login" width={500} height={500} />
        </div>
      </div>
      <div style={theme.rightPane}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            {i18n.t("rest_info")}
          </Typography>

          <Paper style={{ maxHeight: 200, overflow: "auto" }}>
            <FormControl>
              <FormLabel id="demo-error-radios">Select Restaurant</FormLabel>
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="name"
                value={action}
                onChange={handleRadioChange}
              >
                {Rest.map((item) => (
                  <FormControlLabel
                    key={item.domain}
                    value={item.domain}
                    control={<Radio />}
                    label={`${item.name} , ${item.domain}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>
        </React.Fragment>
      </div>
    </div>
  );
}

/*<FormGroup>
            <FormControlLabel control={<Checkbox checked={state} onClick={() => {setState({isTrue: !this.state.isTrue});}} name="gilad" />} label="Select" />
          </FormGroup> */
/*
    <div style={theme.splitScreen}>
      <div style={theme.leftPane}>
        <div style={{ height: 400, width: "100%" }}>
          {" "}
          <img src={table} alt="login" width={500} height={500} />
        </div>
      </div>
      <div style={theme.rightPane}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            {i18n.t("rest_info")}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={10} sm={5} sx={{ p: 2 }}>
              <InputField
                name={firstName.name}
                label={firstName.label}
                fullWidth
              />
            </Grid>
            <Grid item xs={10} sm={5}>
              <InputField
                name={lastName.name}
                label={lastName.label}
                fullWidth
              />
            </Grid>
            <Grid item xs={10}>
              <InputField
                name={RestaurantName.name}
                label={RestaurantName.label}
                fullWidth
              />
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    </div> */
