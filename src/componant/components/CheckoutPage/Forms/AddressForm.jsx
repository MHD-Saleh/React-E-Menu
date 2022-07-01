import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { InputField } from "../../FormFields";
import table from "../../../../image/setting.png";
import { createTheme } from "@mui/material";
import i18n from "../../../../i18n";

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
  useEffect(() => {
    document.title = "Setting";
  }, []);
  const {
    formField: { firstName, lastName, RestaurantName },
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
    </div>
  );
}

/*<div style={theme.splitScreen}>
        <div style={theme.leftPane}>
          {" "}
          <Typography
            sx={{ mb: "25px", mt: "15px", fontFamily: "Monospace" }}
            variant="subtitle1"
          >
            Items From Menu
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            
          </div>
        </div>
        <div style={theme.rightPane}>
          
        </div>
      </div>
 */

/*  <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Restaurant info
      </Typography>
      <img src={table} alt="login" width={400} height={400} />
      <Grid container spacing={4}>
        <Grid item xs={10} sm={5} sx={{ p: 2 }}>
          <InputField name={firstName.name} label={firstName.label} fullWidth />
        </Grid>
        <Grid item xs={10} sm={5}>
          <InputField name={lastName.name} label={lastName.label} fullWidth />
        </Grid>
        <Grid item xs={10}>
          <InputField
            name={RestaurantName.name}
            label={RestaurantName.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>*/
