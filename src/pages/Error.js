import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
// components

import Page from "../componant/page";

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
  return (
    <div style={RootStyle}>
      <Container>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Button href="/home" size="large" variant="contained">
            Go to Home
          </Button>
        </Box>
      </Container>
    </div>
  );
}
