import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Button,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
//import { LoadingButton } from "@mui/lab";
// component
import Iconify from "./Iconify";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import axios from "axios";
import i18next from "i18next";

// ----------------------------------------------------------------------
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function LoginForm() {
  const { t, i18n, ready } = useTranslation("ns1", { useSuspense: false });
  useEffect(() => {
    document.title = "Login";
    const Chick = async () => {};

    Chick();
  }, []);
  const [open, setopen] = useState(true);
  const [message, setmessage] = useState("error");

  const handelClick = () => {
    setopen(true);
  };

  const handelClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopen(false);
  };

  //const csrf = () => axios.get("/sanctum/csrf-cookie");
  const loginn = async (mail, pass) => {
    //await csrf();
    //console.log(csrf());
    var data = {
      email: mail,
      password: pass,
      guard: "apiUser",
    };
    axios
      .post("https://e-menu-h.herokuapp.com/login", data)
      .then((res) => {
        console.log(res);
        console.log("res is : " + res.data["token:"]);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data["token:"]}`;
        localStorage.setItem("mytoken", res.data["token:"]);

        navigate("/welcome", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        handelClick();
        setmessage("Wrong Email or password");
      });

    /* axios
      .post(
        "http://e-menu-h.herokuapp.com/login",
        {
          email: mail,
          password: pass,
          guard: "apiUser",
        },
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        //navigate("/second");
        //localStorage.setItem("islogin", "true");
        console.log(res);
        // navigate("/dashboard/Dishes", { replace: true });
      })
      .then(() => {
        // navigate("/dashboard/Dishes", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        console.log("errrrrrrrrrrr from log in", error.response.status);
        if (error.response.status === 500) {
          handelClick();
          setmessage("error 500 chick database");
        } else if (error.response.status === 422) {
          handelClick();
          setmessage("Wrong Email or password");
        }
      });*/
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("email is :", getFieldProps("email").value);
      console.log("password is :", getFieldProps("password").value);
      loginn(getFieldProps("email").value, getFieldProps("password").value);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const [checked, setChecked] = useState(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);

    i18next.changeLanguage(i18next.language === "en" ? "ar" : "en");
  };

  useEffect(() => {
    setChecked(i18next.language === "en" ? true : false);
  }, []);

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label={i18n.t("email")}
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label={i18n.t("pass")}
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps("remember")}
                  checked={values.remember}
                />
              }
              label={i18n.t("Remember_me")}
            />

            <FormGroup>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>عربي</Typography>
                <Switch checked={checked} onChange={switchHandler} />
                <Typography>English</Typography>
              </Stack>
            </FormGroup>
          </Stack>

          <Button fullWidth size="large" type="submit" variant="contained">
            {i18n.t("Login")}
          </Button>
        </Form>
      </FormikProvider>
      <Snackbar
        open={open}
        onClose={handelClose}
        autoHideDuration={3000}
        //message="test Snack"
      >
        <Alert onClose={handelClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
