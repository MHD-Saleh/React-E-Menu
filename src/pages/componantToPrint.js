import React from "react";
import { Modal, Container, Stack, Box, Typography, Grid } from "@mui/material";
import QRCodeReact from "qrcode.react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="span">
          Welcome to {props.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 5 }}>
          <Typography variant="subtitle1">
            Table No {props.TableNumber}
          </Typography>
          <QRCodeReact
            value={`${window.location.origin}/tableNumber/${props.TableNumber}`}
            size={200}
          />
        </Typography>
      </Box>
    </div>
  );
});
