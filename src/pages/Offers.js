import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React, { useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Offers = () => {
  const [open, setopen] = useState(true);

  const handelClick = () => {
    setopen(true);
  };

  const handelClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopen(false);
  };

  return (
    <div>
      <h1>Offers Page</h1>
      <Button variant="primary" onClick={handelClick}>
        Snackbar
      </Button>

      <Snackbar
        open={open}
        onClose={handelClose}
        autoHideDuration={3000}
        //message="test Snack"
      >
        <Alert onClose={handelClose} severity="error">
          this is message
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Offers;
