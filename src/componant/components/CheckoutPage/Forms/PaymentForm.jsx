import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { InputField, DatePickerField } from "../../FormFields";
import { createTheme } from "@mui/material";

import table from "../../../../image/table.png";
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

export default function PaymentForm(props) {
  const {
    formField: { TableNumber },
  } = props;

  return (
    <div style={theme.splitScreen}>
      <div style={theme.leftPane}>
        <div style={{ height: 400, width: "100%" }}>
          <img src={table} alt="login" width={400} height={400} />
        </div>
      </div>
      <div style={theme.rightPane}>
        {" "}
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            {i18n.t("table_number")}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InputField
                name={TableNumber.name}
                label={TableNumber.label}
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
      </div>*/

/*  <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Number of Table inside your Restaurant
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            name=" Number of Table"
            label=" Number of Table"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name="Number of Table"
            label="Number of Table"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment> */
