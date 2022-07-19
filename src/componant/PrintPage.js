import React from "react";

import QRCodeReact from "qrcode.react";

import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  CardActions,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";

export const PrintPage = React.forwardRef((props, ref) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "quantity",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "message",
      headerName: "message",
      type: "number",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
  ];
  const Item = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    color: "black",
  }));
  return (
    <div ref={ref}>
      <Typography sx={{ color: "#616161" }} variant="subtitle2">
        Order Id : {props.id}
      </Typography>

      <Typography sx={{ color: "#616161" }} variant="subtitle2">
        Customer Name : {props.custName}
      </Typography>

      <Typography sx={{ color: "#616161" }} variant="body1">
        time : {props.time}
      </Typography>
      <Typography sx={{ color: "#616161" }} variant="body1">
        Ammount : {props.ammount}
      </Typography>
      <Typography sx={{ color: "#616161" }} variant="body1">
        table number : {props.tableNumber}
      </Typography>
      {props.odr.map((item) => (
        <Typography sx={{ color: "#616161" }} variant="body1">
          item name : {item.name}, Amount : {item.quantity}, message :{" "}
          {item.message}
        </Typography>
      ))}
    </div>
  );
});
