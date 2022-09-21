import {
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import i18next from "i18next";
import React, { useEffect, useState } from "react";

const MorePage = () => {
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
      <FormGroup>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>عربي</Typography>
          <Switch checked={checked} onChange={switchHandler} />
          <Typography>English</Typography>
        </Stack>
      </FormGroup>
    </>
  );
};
export default MorePage;
