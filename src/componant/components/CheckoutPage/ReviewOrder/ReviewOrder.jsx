import React from "react";
import { useFormikContext } from "formik";
import { Typography, Grid } from "@material-ui/core";
import ProductDetails from "./ProductDetails";
import PaymentDetails from "./PaymentDetails";

export default function ReviewOrder() {
  const { values: formValues } = useFormikContext();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        information summary
      </Typography>

      <Grid container spacing={2}>
        <PaymentDetails formValues={formValues} />
      </Grid>
    </React.Fragment>
  );
}
