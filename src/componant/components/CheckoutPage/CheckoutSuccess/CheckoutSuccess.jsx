import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function CheckoutSuccess() {
  const navigate = useNavigate();
  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm() {
    await _sleep(8000);
    navigate("/dashboard/main");
    localStorage.setItem("isNotFirst", "True");
  }

  useEffect(() => {
    _submitForm();
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you for your using our App, you can Edit your data any Time
      </Typography>
      <Typography variant="subtitle1">
        Your records will save for next time, and now we will navigating you to
        Dashboard screen
      </Typography>
    </React.Fragment>
  );
}

export default CheckoutSuccess;
