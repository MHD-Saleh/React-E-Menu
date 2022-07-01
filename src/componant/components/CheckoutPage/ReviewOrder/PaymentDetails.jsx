import React, { useEffect } from "react";

import { Typography, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { useTranslation } from "react-i18next";

function SecondPage(props) {
  const { t, i18n, ready } = useTranslation("ns1", { useSuspense: false });
  const { formValues } = props;
  const classes = useStyles();
  const { firstName, lastName, RestaurantName } = formValues;

  async function func() {
    localStorage.setItem("FirstName", firstName);
    localStorage.setItem("RestName", RestaurantName);
  }

  useEffect(() => {
    func();
  }, []);
  return (
    <Grid item container direction="column" xs={12} sm={6}>
      <Typography variant="h6" gutterBottom className={classes.title}>
        {i18n.t("summary")}
      </Typography>
      <Grid container>
        <React.Fragment>
          <Grid item xs={6}>
            <Typography gutterBottom>{i18n.t("Fname")}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{firstName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{i18n.t("Lname")}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{lastName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{i18n.t("Rname")}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{RestaurantName}</Typography>
          </Grid>
        </React.Fragment>
      </Grid>
    </Grid>
  );
}

export default SecondPage;
