import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import instance from "../authConfig/axios";
import { styled } from "@mui/material/styles";
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

  const [mesagges, setmesagges] = useState([]);

  const getmessages = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/feedbackView",
        method: "GET",
      }).then((res) => {
        // handle success
        console.log("messages is : ", res.data);
        setmesagges(res.data);
        setisloading(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  useEffect(() => {
    getmessages();
  }, []);

  return (
    <>
      {" "}
      {isloading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {mesagges.map((msg) => (
              <Grid key={msg.id} item xs={12} sm={6} md={3}>
                <MessageCard
                  avatar={msg.message}
                  title={msg.customer_id}
                  date={moment(msg.created_at).format("YYYY/MM/DD")}
                  content={msg.message}
                  expaned={msg.message}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {mesagges.map((msg) => (
              <Grid key={msg.id} item xs={12} sm={6} md={3}>
                <Card style={secondery}>
                  <Box sx={{ pt: "100%", position: "relative" }}>
                    <Label
                      variant="filled"
                      color="primary"
                      sx={{
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: "absolute",
                        textTransform: "uppercase",
                      }}
                    >
                      {msg.id}
                    </Label>

                    <ProductImgStyle
                      alt={msg.name}
                      src={
                        "https://www.abc27.com/wp-content/uploads/sites/55/2019/08/restaurant_report.jpg?w=1920&h=1080&crop=1"
                      }
                    />
                  </Box>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Link
                        to="#"
                        color="inherit"
                        underline="hover"
                        component={RouterLink}
                      >
                        <Typography
                          variant="subtitle2"
                          noWrap
                          onClick={() => {}}
                        >
                          {msg.message}
                        </Typography>
                      </Link>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="subtitle1">
                        user id: {msg.customer_id}
                      </Typography>
                      <Button
                        onClick={() => {}}
                        variant="contained"
                        color="error"
                      >
                        {i18n.t("delete")}
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default Messages;
