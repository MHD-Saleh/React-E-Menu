import React, { useEffect, useState } from "react";

import { alpha, styled } from "@mui/material/styles";
import table from "../image/setting.png";
import {
  createTheme,
  Paper,
  Button,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  Stack,
  TextField,
  Card,
  Link,
  Container,
  Typography,
} from "@mui/material";

import AuthLayout from "../componant/AuthLayout";
import Page from "../componant/page";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import i18n from "../i18n";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

/*const theme = createTheme({
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
});*/

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

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const mydiv = styled("div")(({ theme }) => ({
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
      paddingTop: "10px",
    },

    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "row",
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
        paddingTop: "10px",
      },

      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        Need help ?&nbsp;
        <Link
          variant="subtitle2"
          component={RouterLink}
          to="register"
          underline="hover"
        >
          Call us
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: "none", md: "flex" } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img src={table} alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to E-Menu
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {i18n.t("rest_info")}
            </Typography>
          </Stack>

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

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: "none" },
            }}
          >
            Need help ?&nbsp;
            <Link
              variant="subtitle2"
              component={RouterLink}
              to="register"
              underline="hover"
            >
              Call us
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
