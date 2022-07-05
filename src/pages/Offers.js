import Button from "@mui/material/Button";
import SB from "../componant/SB";
//import pusherJs from "pusher-js";

import React, { useState } from "react";
import { Paper, TextField, Typography } from "@mui/material";
import axios from "axios";

const Offers = () => {
  // Enable pusher logging
  // pusherJs.logToConsole = true;
  // pusherJs
  /*
  var pusher = new pusherJs("9aa6bd46d4105d1a9109", {
    cluster: "ap2",
  });

  var channel = pusher.subscribe("saleh-channel");
  channel.bind("event-pusher", function (data) {
    console.error("pusher Says : ", data.data.message);
    setmsg(data.data.message);
    handelClickGreen();
    //alert(JSON.stringify(data));
  });*/

  const handleSetuser = (e) => {
    setuser(e.target.value);
  };

  const handleSetpass = (e) => {
    setpass(e.target.value);
  };

  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");

  const login = () => {
    console.log("user : " + user);
    console.log("pass : " + pass);
    axios.defaults.headers.post["Accept"] = "application/json";
    axios
      .post("http://e-menu-h.herokuapp.com/login", {
        email: user,
        password: pass,
        guard: "apiUser",
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })

      .catch((error) => {
        console.log(error);
        console.log("errrrrrrrrrrr from log in", error.response.status);
      });
  };

  return (
    <div>
      <Paper>
        <Typography>user name</Typography>
        <TextField
          margin="dense"
          id="user"
          label="user name"
          type="text"
          fullWidth
          name="user"
          value={user}
          onChange={handleSetuser}
        />
        <Typography>password</Typography>
        <TextField
          margin="dense"
          id="pass"
          label="password"
          type="text"
          fullWidth
          name="pass"
          value={pass}
          onChange={handleSetpass}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            login();
          }}
        >
          log in
        </Button>
      </Paper>
    </div>
  );
};

export default Offers;

/*  <Typography>user name</Typography>
      <TextField
        margin="dense"
        id="user"
        label="user name"
        type="text"
        fullWidth
        name="user"
        value={user}
        onChange={handleSetuser}
      />
      <Typography>password</Typography>
      <TextField
        margin="dense"
        id="pass"
        label="password"
        type="text"
        fullWidth
        name="pass"
        value={pass}
        onChange={handleSetpass}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          login();
        }}
      >
        log in
      </Button>

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
        message={msg}
        time={3000}
      />*/

/* const [msg, setmsg] = useState();
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

  const handleSetuser = (e) => {
    setuser(e.target.value);
  };

  const handleSetpass = (e) => {
    setpass(e.target.value);
  };

  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");

  const login = () => {
    console.log("user : " + user);
    console.log("pass : " + pass);

    axios
      .post("http://e-menu-h.herokuapp.com/login", {
        email: user,
        password: pass,
        guard: "apiUser",
      })
      .then((res) => {
        console.log(res);
      })

      .catch((error) => {
        console.log(error);
        console.log("errrrrrrrrrrr from log in", error.response.status);
      });
  };
*/
