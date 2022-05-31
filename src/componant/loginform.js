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
} from "@mui/material";
//import { LoadingButton } from "@mui/lab";
// component
import Iconify from "./Iconify";
import axios from "../authConfig/axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// ----------------------------------------------------------------------
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function LoginForm() {
  useEffect(() => {
    const Chick = async () => {
      console.log("execude Chick Function");
      if ((await localStorage.getItem("islogin")) === "true") {
        console.log("navigate to dishes");
        navigate("/dashboard/Dishes", { replace: true });
      }
    };

    Chick();
  }, []);
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

  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const loginn = async (mail, pass) => {
    await csrf();
    console.log(csrf());

    axios
      .post("/login", { email: mail, password: pass })
      .then(() => {
        //navigate("/second");
        localStorage.setItem("islogin", "true");
        console.log("navigate to dishes");
        // navigate("/dashboard/Dishes", { replace: true });
      })
      .then(() => {
        navigate("/dashboard/Dishes", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        console.log("errrrrrrrrrrr from log in", error.response.status);
      });
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

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
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
              label="Remember me"
            />

            <Link
              onClick={handelClick}
              component={RouterLink}
              variant="subtitle2"
              to="#"
              underline="hover"
            >
              Forgot password?
            </Link>
          </Stack>

          <Button fullWidth size="large" type="submit" variant="contained">
            Login
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
          Wrong Feilds
        </Alert>
      </Snackbar>
    </>
  );
}
