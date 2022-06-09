import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import DashboardSidebar from "./Sidbar";
import axios from "axios";
//import DashboardNavbar from "../componant/MyNavBar";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 10;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: "#eee",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const navigate = useNavigate();

  const GetMenu = async () => {
    await axios.get("http://localhost:8000/api/productView").catch((err) => {
      if (err.response.status === 401) {
        localStorage.removeItem("islogin");
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    GetMenu();
  }, []);

  return (
    <RootStyle>
      <DashboardSidebar isOpenSidebar={false} onCloseSidebar={() => false} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
