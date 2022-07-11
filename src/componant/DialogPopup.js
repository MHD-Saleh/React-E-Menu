import {
  Avatar,
  Box,
  Button,
  ButtonBase,
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
} from "@mui/material";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import React, { Children } from "react";

const DialogPopup = (props) => {
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
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Dialog open={props.open} onClose={props.Close}>
        <DialogTitle>
          <Typography sx={{ color: "#616161" }} variant="subtitle2">
            Order Id : {props.id}
          </Typography>

          <Typography sx={{ color: "#616161" }} variant="subtitle2">
            Customer Name : {props.custName}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid
              container
              paddingTop={"0px"}
              spacing={0}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <Item>Time</Item>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Item>Amount</Item>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Item>Table Number</Item>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Item>{props.time}</Item>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Item>{props.ammount}</Item>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Item> {props.tableNumber}</Item>
              </Grid>
            </Grid>
          </DialogContentText>
          <div style={{ height: 400, width: 500, paddingTop: "20px" }}>
            <DataGrid
              rows={props.odr}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                "& .super-app-theme--header": {
                  color: "white",
                  backgroundColor: "primary.main",
                },
                border: 1,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.Close}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogPopup;

/*<Dialog open={open} onClose={handleClose}>
            <DialogTitle>Order Id {id}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                add the Details here and click save
              </DialogContentText>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Title
                </Typography>
                <Grid container maxWidth={1000}>
                  <React.Fragment>
                    <Grid item xs={6} maxWidth={1000}>
                      <Typography gutterBottom color="green">
                        amount:{" "}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      container
                      direction="column"
                      alignItems="flex-end"
                      justify="flex-start"
                    >
                      <Typography gutterBottom color="red">
                        {amount}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom color="green">
                        Status :
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      alignItems="flex-end"
                      justify="flex-start"
                    >
                      <Typography gutterBottom color="red">
                        {Status}
                      </Typography>
                      <Typography gutterBottom color="red">
                        {Createtime}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog> */
