import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { Paper } from "@material-ui/core";

import { theme, useStyle } from "./styles";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";

import palette from "../../../theme/palette";

import typography from "../../../theme/typography";

import ComponentsOverride from "../../../theme/overrides";

import shadows, { customShadows } from "../../../theme/shadows";

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div>
          <Paper>{children}</Paper>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
