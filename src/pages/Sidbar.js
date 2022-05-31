import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
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
import sidebarConfig from "../componant/SidbadConfig";
import { Cookie, CookieSharp } from "@mui/icons-material";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./componantToPrint";
import { useReactToPrint } from "react-to-print";

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
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");
  //

  const logout = () => {
    //cookies.remove('laravelsession');
    //window.location.href='/';
  };

  const [QRCode, setQRCode] = useState(false);
  const showQRModal = () => setQRCode(true);
  const hideQRModal = () => setQRCode(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
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
        <h6>logo</h6>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={"image path"} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                MHD Saleh
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Admin
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: "relative" }}
        >
          <Button onClick={showQRModal} variant="contained">
            Show QR
          </Button>
          <Button onClick={handlePrint} variant="contained" color="error">
            Logout
          </Button>
        </Stack>
      </Box>
    </Scrollbar>
  );

  //<ComponentToPrint ref={componentRef} name="E-menu" TableNumber="2" />
  return (
    <RootStyle>
      <QrCodeModal show={QRCode} hide={hideQRModal} />
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
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
