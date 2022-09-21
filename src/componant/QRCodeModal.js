import {
  Modal,
  Container,
  Stack,
  Box,
  Typography,
  Grid,
  Button,
  getAvatarGroupUtilityClass,
} from "@mui/material";
import QRCodeReact from "qrcode.react";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../pages/componantToPrint";
import { number } from "prop-types";

const style = {
  borderRadius: 3,
  textAlign: "center",
  position: "absolute",
  padding: "20px",
  margin: "80px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const QrCodeModal = React.forwardRef((props, ref) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //var tabels = [];
  //const [tabels, settabels] = useEffect([]);
  var Restname;
  var RestDomain;
  var numbe;
  const tabels = [
    {
      name: "Foodies",
      domain: "http://e-menu-h.herokuapp.com",
      TabelNum: 1,
    },
    {
      name: "Foodies",
      domain: "http://e-menu-h.herokuapp.com",
      TabelNum: 2,
    },
    {
      name: "Foodies",
      domain: "http://e-menu-h.herokuapp.com",
      TabelNum: 3,
    },
    {
      name: "Foodies",
      domain: "http://e-menu-h.herokuapp.com",
      TabelNum: 4,
    },
    {
      name: "Foodies",
      domain: "http://e-menu-h.herokuapp.com",
      TabelNum: 5,
    },
  ];

  const getarr = async () => {
    Restname = await localStorage.getItem("RestName");
    RestDomain = await localStorage.getItem("RestDomain");
    numbe = await parseInt(localStorage.getItem("tabelNumber"));
    for (const i = 0; i < number; i++) {
      /*settabels({
        name: Restname,
        domain: RestDomain,
        TabelNum: i,
      });*/
    }
  };

  useEffect(() => {
    //getarr();
  }, []);

  return (
    <Modal
      sx={{ overflow: "scroll", margin: "20px" }}
      ref={ref}
      open={props.show}
      onClose={props.hide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="span">
          Total tables: {tabels.length}
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 5 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {tabels.map((item) => (
              <Grid item xs={2} sm={4} md={4} key={item.id}>
                <ComponentToPrint
                  ref={componentRef}
                  name={item.name}
                  TableNumber={item.TabelNum}
                  domain={item.domain}
                />
                <Button variant="contained" onClick={handlePrint}>
                  Print
                </Button>
              </Grid>
            ))}
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

/*<Grid item xs={2} sm={4} md={4}>
              <ComponentToPrint
                ref={componentRef}
                name="Foodies"
                TableNumber="1"
                domain="http://e-menu-h.herokuapp.com"
              />
              <Button variant="contained" onClick={handlePrint}>
                Print
              </Button>
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <ComponentToPrint
                ref={componentRef}
                name="Foodies"
                TableNumber="2"
                domain="http://e-menu-h.herokuapp.com"
              />
              <Button variant="contained" onClick={handlePrint}>
                Print
              </Button>
            </Grid> */
