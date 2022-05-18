import Button from "@mui/material/Button";
import SB from "../componant/SB";

import React, { useState } from "react";

const Offers = () => {
  const [openRed, setopenR] = useState(false);
  const [openGreen, setopenG] = useState(false);

  const handelClickRed = () => {
    setopenR(true);
  };
  const handelClickGreen = () => {
    setopenG(true);
  };

  const handelCloseRed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenR(false);
  };
  const handelCloseGreen = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenG(false);
  };

  return (
    <div>
      <Button color="error" variant="contained" onClick={handelClickRed}>
        Red Snackbar
      </Button>
      <Button variant="contained" onClick={handelClickGreen}>
        Green Snackbar
      </Button>
      <SB
        open={openRed}
        handelClose={handelCloseRed}
        type="error"
        message="test Error from SB hook"
        time={3000}
      />
      <SB
        open={openGreen}
        handelClose={handelCloseGreen}
        type="success"
        message="test Success from SB hook"
        time={3000}
      />
    </div>
  );
};

export default Offers;

/*import Button from "@mui/material/Button";
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
*/
