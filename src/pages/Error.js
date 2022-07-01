import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
// components

import Page from "../componant/page";

import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const RootStyle = {
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: 50,
  paddingBottom: 10,
};

// ----------------------------------------------------------------------

export default function Page404() {
  const { t } = useTranslation();
  return (
    <div style={RootStyle}>
      <Container>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <Typography variant="h3" paragraph>
            {t("page_not_found")}
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            {t("page_not_found_descrption")}
          </Typography>

          <Button href="dashboard/main" size="large" variant="contained">
            {t("go_to_home")}
          </Button>
        </Box>
      </Container>
    </div>
  );
}
