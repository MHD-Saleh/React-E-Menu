import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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

import img from "../image/Emenu-logo.png";
import { useTranslation } from "react-i18next";
import Iconify from "../componant/Iconify";
import instance from "../authConfig/axios";

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

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { i18n } = useTranslation("ns1", { useSuspense: false });

  const sidebarConfigNotLoged = [
    //localStorage.setItem("islogin", "true");

    {
      title: i18n.t("Login"),
      path: "/login",
      icon: getIcon("eva:person-fill"),
    },
  ];

  var sidebarConfigLoged = [
    {
      title: i18n.t("dashboard"),
      path: "/dashboard/main",
      icon: getIcon("eva:home-fill"),
    },
    {
      title: i18n.t("user_List"),
      path: "/dashboard/user",
      icon: getIcon("eva:people-fill"),
    },
    {
      title: i18n.t("Dishes"),
      path: "/dashboard/dishes",
      icon: getIcon("eva:shopping-bag-fill"),
    },
    {
      title: i18n.t("Edit_Menu"),
      path: "/dashboard/AddToMenu",
      icon: getIcon("eva:flip-2-fill"),
    },
    {
      title: i18n.t("Offers"),
      path: "/dashboard/Offers",
      icon: getIcon("eva:file-text-fill"),
    },
    {
      title: i18n.t("Reports"),
      path: "/dashboard/Reports",
      icon: getIcon("eva:pie-chart-2-fill"),
    },

    {
      title: i18n.t("Not_found"),
      path: "/404",
      icon: getIcon("eva:alert-triangle-fill"),
    },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  const handelLogOut = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "/logout",
        method: "POST",
      }).then((res) => {
        // handle success
        console.log(res.data);
        localStorage.removeItem("mytoken");
        navigate("/login");
      });
    } catch (e) {
      // handle error
      console.error(e);
      console.log("error with get from heroku", e.response);
      console.log("but my token is : " + localStorage.getItem("mytoken"));
    }
  };

  const [QRCode, setQRCode] = useState(false);
  const showQRModal = () => setQRCode(true);
  const hideQRModal = () => setQRCode(false);

  const [loged, setloged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("mytoken")) {
      setloged(true);
    } else {
      navigate("/login");
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
                {localStorage.getItem("mytoken")
                  ? localStorage.getItem("RestName")
                  : i18n.t("Login")}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {localStorage.getItem("mytoken") ? "admin" : i18n.t("Login")}
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
              {i18n.t("show_qr")}
            </Button>
          ) : null}
          {loged === true ? (
            <Button onClick={handelLogOut} variant="contained" color="error">
              {i18n.t("logout")}
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
