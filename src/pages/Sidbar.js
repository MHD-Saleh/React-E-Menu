import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

import useResponsive from "../componant/useresponsive";
import Scrollbar from "../componant/Scrollbar";
import NavSection from "../componant/NavSection";
import QrCodeModal from "../componant/QRCodeModal";
import sidebarConfigLoged from "../componant/SidbadConfigLoged";
import sidebarConfigNotLoged from "../componant/sideBarConfigNot";
import axios from "axios";
import img from "../image/Emenu-logo.png";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 250;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");
  //

  const logout = () => {
    //cookies.remove('laravelsession');
    //window.location.href='/';
  };

  const handelLogOut = async () => {
    await axios.post("http://localhost:8000/logout").then((respons) => {
      localStorage.removeItem("islogin");
      navigate("/login");
    });
  };

  const [QRCode, setQRCode] = useState(false);
  const showQRModal = () => setQRCode(true);
  const hideQRModal = () => setQRCode(false);

  const componentRef = useRef();

  const [loged, setloged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("islogin")) {
      setloged(true);
    } else {
      setloged(false);
    }
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <img src={img} style={{ width: "50px", height: "50px" }} alt="login" />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src="M" alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {localStorage.getItem("islogin") === "true"
                  ? localStorage.getItem("FirstName")
                  : "Not Logged"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {localStorage.getItem("islogin") === "true"
                  ? localStorage.getItem("RestName")
                  : "Not Logged"}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection
        navConfig={loged === true ? sidebarConfigLoged : sidebarConfigNotLoged}
      />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={1}>
          {loged === true ? (
            <Button onClick={showQRModal} variant="contained">
              Show QR
            </Button>
          ) : null}
          {loged === true ? (
            <Button onClick={handelLogOut} variant="contained" color="error">
              Logout
            </Button>
          ) : null}
        </Stack>
      </Box>
    </Scrollbar>
  );

  //<ComponentToPrint ref={componentRef} name="E-menu" TableNumber="2" />
  return (
    <RootStyle>
      <QrCodeModal show={QRCode} hide={hideQRModal} />

      {isDesktop && (
        <Drawer
          open={true}
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
