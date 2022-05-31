import {
  Modal,
  Container,
  Stack,
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import QRCodeReact from "qrcode.react";
import { useState, useRef } from "react";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../pages/componantToPrint";

const style = {
  borderRadius: 3,
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const QrCodeModal = React.forwardRef((props, ref) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Modal
      ref={ref}
      open={props.show}
      onClose={props.hide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="span">
          Total tables: 2
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 5 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <ComponentToPrint
                ref={componentRef}
                name="E-menu"
                TableNumber="1"
              />
              <Button variant="contained" onClick={handlePrint}>
                Print
              </Button>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <ComponentToPrint
                ref={componentRef}
                name="E-menu"
                TableNumber="2"
              />
              <Button variant="contained" onClick={handlePrint}>
                Print
              </Button>
            </Grid>
          </Grid>
        </Typography>
      </Box>
    </Modal>
  );
});
export default QrCodeModal;

/* {Array.from({ length: place.number_of_tables }, (_, i) => i + 1).map(
          (table) => {
            <Stack key={table}>
              <QRCodeReact
                value={`${window.location.origin}/${place.id}/table`}
                size={200}
              />
            </Stack>;
          }
        )}*/
