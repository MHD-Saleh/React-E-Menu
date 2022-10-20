import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box } from "@mui/material";
import imglink from "../image/Emenu-logo.png";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      <Box
        component="img"
        src={imglink}
        sx={{ width: 40, height: 40, ...sx }}
      />
    </RouterLink>
  );
}
