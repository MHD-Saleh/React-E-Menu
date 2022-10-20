import PropTypes from "prop-types";

import { forwardRef } from "react";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const page = forwardRef(({ children, title = "", ...other }, ref) => (
  <Box ref={ref} {...other}>
    <title>{title}</title>

    {children}
  </Box>
));

page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default page;
