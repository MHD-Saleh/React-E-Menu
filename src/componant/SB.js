import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//this hook is responed for showing Snackbar

// type: "error","info","success","warning"
const SB = (probs) => {
  return (
    <>
      <Snackbar
        open={probs.open}
        onClose={probs.handelClose}
        autoHideDuration={probs.time}
        //message="test Snack"
      >
        <Alert onClose={probs.handelClose} severity={probs.type}>
          {probs.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default SB;
