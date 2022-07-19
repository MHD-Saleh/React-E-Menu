import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import instance from "../authConfig/axios";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Grid,
  Badge,
  InputLabel,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Iconify from "../componant/Iconify";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import Label from "./Label";
import moment from "moment";
import MessageCard from "./MessageCard";

function Messages() {
  const ProductImgStyle = styled("img")({
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
  });

  const RootStyle = styled("div")(({ theme }) => ({
    zIndex: 999,
    right: 0,
    display: "flex",
    cursor: "pointer",
    position: "fixed",
    alignItems: "center",
    top: theme.spacing(16),
    height: 70,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    color: "white",
    backgroundColor: "#007b55",
    borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
    borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
    transition: theme.transitions.create("opacity"),
    "&:hover": { opacity: 0.72 },
  }));

  const secondery = {
    marginTop: 50,
    marginLeft: 25,
    position: "relative",
    fontFamily: "Roboto",
    fontWeight: "bold",
  };

  const [isloading, setisloading] = useState(true);

  const [ReadMesagges, setReadMesagges] = useState([]);
  const [UnReadMesagges, setUnReadMesagges] = useState([]);

  const [renderMessage, setrenderMessage] = useState([]);

  const getReadMessages = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)

        url: "api/feedbackReadView",
        method: "GET",
      }).then((res) => {
        // handle success
        console.log("Read messages is : ", res.data);
        setReadMesagges(res.data);
        setisloading(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  const getUnreadMessages = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/feedbackView",
        method: "GET",
      }).then((res) => {
        // handle success
        console.log("unRead messages is : ", res.data);
        setUnReadMesagges(res.data);
        setisloading(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  const updateStete = async (dd) => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/feedbackRead/${dd}`,
        method: "POST",
      }).then((res) => {
        // handle success

        doupdate();
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  function doupdate() {
    getReadMessages();
    getUnreadMessages();
  }

  useEffect(() => {
    getReadMessages();
    getUnreadMessages();
  }, []);

  const [alignment, setAlignment] = React.useState("All");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const viewRead = () => {
    setrenderMessage(ReadMesagges);
  };

  const viewUnRead = () => {
    setrenderMessage(UnReadMesagges);
  };

  const viewall = async () => {
    await setrenderMessage([...UnReadMesagges, ...ReadMesagges]);
    console.log("sett all value" + renderMessage);
  };

  return (
    <>
      {" "}
      {isloading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={{ paddingBottom: "20px" }}
          >
            <ToggleButton
              onClick={() => {
                viewall();
                doupdate();
              }}
              value="All"
            >
              All
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                viewRead();
              }}
              value="Read"
            >
              Read
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                viewUnRead();
              }}
              value="unread"
            >
              unread
            </ToggleButton>
          </ToggleButtonGroup>

          <Grid container spacing={3}>
            {renderMessage.map((msg) => (
              <Grid key={msg.id} item xs={12} sm={6} md={3}>
                <MessageCard
                  avatar={msg.id}
                  title={msg.customer.name}
                  date={moment(msg.created_at).format("YYYY/MM/DD")}
                  content={msg.message}
                  expaned={msg.message}
                  withmore="false"
                  icon={
                    <>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Check"
                        onClick={() => {
                          updateStete(msg.id);
                        }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default Messages;
