//import pusherJs from "pusher-js"
import React from "react";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EditType from "../componant/editType";
import OfferTap from "../componant/OfferTap";
import MorePage from "../componant/MorePage";
import { useTranslation } from "react-i18next";

const Offers = () => {
  // Enable pusher logging
  // pusherJs.logToConsole = true;
  // pusherJs

  const [value, setValue] = React.useState("1");
  const { i18n } = useTranslation("ns1", { useSuspense: false });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label={i18n.t("Gift")} value="1" />
            <Tab label={i18n.t("Product_type")} value="2" />
            <Tab label={i18n.t("Others")} value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <OfferTap />
        </TabPanel>
        <TabPanel value="2">
          <EditType />
        </TabPanel>
        <TabPanel value="3">
          <MorePage />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Offers;
