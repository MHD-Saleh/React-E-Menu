import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import img from "../image/login.png";
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Container, Typography } from "@mui/material";
// components
import Page from "../componant/Page";
import LoginForm from "../componant/loginform";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

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
  minHeight: "50",
  flexDirection: "column",
  justifyContent: "center",
  padding: 2,
}));

// ----------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const { i18n } = useTranslation("ns1", { useSuspense: false });
  const [open, setopen] = useState(false);

  const handelClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopen(false);
  };
  return (
    <RootStyle title="Login To E-Menu">
      <SectionStyle sx={{ display: { xs: "none", md: "flex", padding: 20 } }}>
        <Typography variant="h3">{i18n.t("welcome")}</Typography>
        <img src={img} alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {i18n.t("log_to_E")}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {i18n.t("detail")}
            </Typography>
          </Stack>

          <LoginForm />
        </ContentStyle>
      </Container>

      <Snackbar
        open={open}
        onClose={handelClose}
        autoHideDuration={3000}
        //message="test Snack"
      >
        <Alert onClose={handelClose} severity="warning">
          Please Login First
        </Alert>
      </Snackbar>
    </RootStyle>
  );
}
