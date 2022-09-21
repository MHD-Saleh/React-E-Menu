import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import table from "../image/setting.png";
import {
  CardMedia,
  createTheme,
  List,
  ListItem,
  Paper,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";

import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import instance from "../authConfig/axios";
import i18n from "../i18n";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  leftPane: {
    width: "50%",
    margin: "5px",
  },
  rightPane: {
    width: "50%",
    margin: "5px",
    pt: "20px",
    paddingTop: "70px",
  },
});

export default function WelcomeScreen(props) {
  //api/restaurantView

  const [Rest, setRest] = useState([]);

  const GetRestNames = async () => {
    try {
      await axios
        .get("https://e-menu-admin.herokuapp.com/api/restaurants", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            withCredentials: true,
          },
        })
        .then((res) => {
          console.log(res.data);
          setRest(res.data);
        });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };
  //https://e-menu-admin.herokuapp.com/api/restaurants

  const [action, setaction] = useState();
  const handleRadioChange = (event) => {
    setaction(event.target.value);
    console.log(event.target.value);
    setName(event.target.value);
    // changeType(event.target.value);
    // localStorage.setItem("RestName",)
    //localStorage.setItem("RestDomain", event.target.value);
  };
  function setName(id) {
    const current = Rest.filter((item) => item.id === parseInt(id));
    if (current.length > 0) {
      console.log("name : " + current[0].name);
      console.log("domain : " + current[0].domain);

      localStorage.setItem("RestDomain", current[0].domain);
      localStorage.setItem("RestName", current[0].name);
    }
  }

  useEffect(() => {
    document.title = "Setting";
    GetRestNames();
  }, []);

  const LoginSchema = Yup.object().shape({
    number: Yup.number()
      .required(`Table Number is required`)
      .min(1, "Min value 1.")
      .max(10, "Max value 10."),
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("tableeeeeee" + getFieldProps("number").value);
      localStorage.setItem("tabelNumber", getFieldProps("number").value);
      navigate("/dashboard/main");
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Paper elevation={20} sx={{ margin: "20px" }}>
      <div style={theme.splitScreen}>
        <div style={theme.leftPane}>
          <div style={{ height: 400, width: "100%" }}>
            {" "}
            <img src={table} alt="login" width={500} height={500} />
          </div>
        </div>
        <div style={theme.rightPane}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              {i18n.t("rest_info")}
            </Typography>

            <Paper>
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Paper
                      elevation={20}
                      style={{
                        maxHeight: 200,
                        overflow: "auto",
                        padding: "20px",
                      }}
                    >
                      <FormControl>
                        <FormLabel id="demo-error-radios">
                          Select Restaurant
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-error-radios"
                          name="name"
                          value={action}
                          onChange={handleRadioChange}
                        >
                          {Rest.map((item) => (
                            <FormControlLabel
                              key={item.id}
                              value={item.id}
                              control={<Radio />}
                              label={`${item.name} , ${item.domain}`}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Paper>
                    <Typography variant="h6" gutterBottom>
                      {i18n.t("table_no")}
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="number"
                      type="number"
                      label="number"
                      {...getFieldProps("number")}
                      error={Boolean(touched.number && errors.number)}
                      helperText={touched.number && errors.number}
                    />
                  </Stack>

                  <Button
                    sx={{ marginTop: "20px", marginBottom: "50px" }}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {i18n.t("add")}
                  </Button>
                </Form>
              </FormikProvider>
            </Paper>
          </React.Fragment>
        </div>
      </div>
    </Paper>
  );
}
