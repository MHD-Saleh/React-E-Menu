import React, { useState } from "react";

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import { Formik, Form } from "formik";

import First from "./Forms/AddressForm";
import SecondPage from "./Forms/PaymentForm";
import ReviewOrder from "./ReviewOrder";
import CheckoutSuccess from "./CheckoutSuccess";
import checkoutFormModel from "./FormModel/checkoutFormModel";
import formInitialValues from "./FormModel/formInitialValues";

import validationSchema from "./FormModel/validationSchema";

import useStyles from "./styles";
import { useTranslation } from "react-i18next";

// additional ready will state if translations are loaded or not

const { formId, formField } = checkoutFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <First formField={formField} />;
    case 1:
      return <SecondPage formField={formField} />;
    case 2:
      return <ReviewOrder />;
    default:
      return <div>Not Found</div>;
  }
}

export default function CheckoutPage() {
  const { t, i18n, ready } = useTranslation("ns1", { useSuspense: false });

  const steps = [i18n.t("rest_name"), i18n.t("tabels_num"), i18n.t("review")];
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="center"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Paper className={classes.paper} elevation={10}>
          <React.Fragment>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              sx={{ p: 3 }}
            >
              {i18n.t("set_page")}
            </Typography>
            <Stepper activeStep={activeStep} sx={{ p: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <CheckoutSuccess />
              ) : (
                <Formik
                  initialValues={formInitialValues}
                  validationSchema={currentValidationSchema}
                  onSubmit={_handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form id={formId}>
                      {_renderStepContent(activeStep)}

                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                          <Button
                            onClick={_handleBack}
                            className={classes.button}
                          >
                            {i18n.t("back")}
                          </Button>
                        )}
                        <div className={classes.wrapper}>
                          <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            {isLastStep ? i18n.t("submit") : i18n.t("next")}
                          </Button>
                          {isSubmitting && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </Grid>
    </div>
  );
}
