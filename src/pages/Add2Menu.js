import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import {
  Button,
  ButtonBase,
  createTheme,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import SB from "../componant/SB";
import { useNavigate } from "react-router-dom";
import instance from "../authConfig/axios";

const theme = createTheme({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  leftPane: {
    width: "50%",
    margin: "5px",
  },
  rightPane: {
    width: "50%",
    margin: "5px",
  },
});

const Add2Menu = () => {
  const navigate = useNavigate();
  const columns2 = [
    {
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 100,
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          console.log(params.id);

          AddMainMenu(params.id);
        };

        return (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onClick}
          >
            ADD
          </Button>
        );
      },
    },

    {
      field: "id",
      headerName: "ID",
      width: 60,
      headerClassName: "super-app-theme--header",
    },
    {
      headerAlign: "center",
      field: "name",
      headerName: "Name",
      width: 110,
      headerClassName: "super-app-theme--header",
    },
    {
      headerAlign: "center",
      field: "price",
      headerName: "Price",
      width: 100,
      type: "number",
      headerClassName: "super-app-theme--header",
    },
    {
      headerAlign: "center",
      field: "time",
      headerName: "Time",
      type: "number",
      width: 80,
      headerClassName: "super-app-theme--header",
    },

    //created_at
    {
      headerAlign: "center",
      field: "created_at",
      headerName: "Created at",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
  ];

  const columns = [
    {
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 100,
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          console.log("this is params   " + params);

          getid(params.id);
        };

        return (
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={onClick}
          >
            Delete
          </Button>
        );
      },
    },

    {
      field: "id",
      headerName: "ID",
      width: 60,
      headerClassName: "super-app-theme--header",
    },

    {
      headerAlign: "center",
      field: "name",
      headerName: "Name",
      width: 110,
      headerClassName: "super-app-theme--header",
    },
    {
      headerAlign: "center",
      field: "price",
      headerName: "Price",
      width: 100,
      type: "number",
      headerClassName: "super-app-theme--header",
    },
    {
      headerAlign: "center",
      field: "time",
      headerName: "Time",
      type: "number",
      width: 80,
      headerClassName: "super-app-theme--header",
    },

    {
      headerAlign: "center",
      field: "created_at",
      headerName: "Created at",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
  ];

  const [openSuccess, setopenSuccess] = useState(false);
  const [openError, setopenError] = useState(false);

  const handelClickSuccess = () => {
    setopenSuccess(true);
  };
  const handelCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenSuccess(false);
  };

  const handelClickError = () => {
    setopenError(true);
  };
  const handelCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenError(false);
  };

  const getid = (id) => {
    var areAllNotNull = Menu.map((item) => {
      if (item.id === id) {
        return item.menu[0].id;
      }
    });
    const elem = areAllNotNull.map((el) => {
      if (el !== undefined) {
        console.log("elemnt is : " + el);
        DeleteMainMenu(el);
      }
    });

    console.log("the id ypu want : ", areAllNotNull);
  };

  //http://127.0.0.1:8000/api/outOfMenu

  const [outOfMenu, setoutOfMenu] = useState([]);

  const GetBefore = async () => {
    //api/outOfMenu

    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/outOfMenu",
        method: "GET",
      }).then((res) => {
        // handle success

        setoutOfMenu(res.data);
      });
    } catch (e) {
      // handle error
      console.error(e);
      //handelClick();
      //setmessage("error with get outofmenu List");
    }
  };

  //api/Menu
  const [Menu, setMenu] = useState([]);

  const GetAfter = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/Menu",
        method: "GET",
      }).then((res) => {
        // handle success

        setMenu(res.data);
      });
    } catch (e) {
      // handle error
      console.error(e);
      //handelClick();
      //setmessage("error with get outofmenu List");
    }
  };

  //Store To Actual Menu
  //http://127.0.0.1:8000/api/menuStore
  const AddMainMenu = async (id) => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/menuStore",
        method: "POST",
        data: {
          product_id: id,
        },
      }).then((res) => {
        // handle success
        console.log("created");
        GetAfter();
        GetBefore();
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  //delete from Actual Menu
  //http://127.0.0.1:8000/api/menuDelete/2
  const DeleteMainMenu = async (id) => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/menuDelete/${id}`,
        method: "DELETE",
      }).then((res) => {
        // handle success
        console.log("deleted with id " + id);
        GetAfter();
        GetBefore();
      });
    } catch (e) {
      // handle error
      console.error(e);
      //handelClick();
      //setmessage("error with Delete item");
    }
  };

  useEffect(() => {
    console.log("load Add2Menu page");
    GetAfter();

    GetBefore();
  }, []);

  return (
    <div>
      <Typography
        variant="h3"
        sx={{
          paddingLeft: "20px",
          width: 320,
          height: 50,
          backgroundColor: "primary.main",
          color: "white",
          borderRadius: "10px",
        }}
      >
        Add to Menu Page
      </Typography>
      <div style={theme.splitScreen}>
        <div style={theme.leftPane}>
          {" "}
          <Typography
            sx={{ mb: "25px", mt: "15px", fontFamily: "Monospace" }}
            variant="subtitle1"
          >
            Items From Menu
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={Menu}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                "& .super-app-theme--header": {
                  color: "white",
                  backgroundColor: "primary.main",
                },
                border: 1,
                "& .MuiDataGrid-row:nth-child(even)": {
                  backgroundColor: "#66bb6a",
                },

                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
            />
          </div>
        </div>
        <div style={theme.rightPane}>
          {" "}
          <Typography
            sx={{ mb: "25px", mt: "15px", fontFamily: "Monospace" }}
            variant="subtitle1"
          >
            Items From Products
          </Typography>
          <DataGrid
            rows={outOfMenu}
            columns={columns2}
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
      </div>
      <SB
        open={openSuccess}
        handelClose={handelCloseSuccess}
        type="success"
        message="Done"
        time={3000}
      />
      <SB
        open={openError}
        handelClose={handelCloseError}
        type="error"
        message="error!"
        time={3000}
      />
    </div>
  );
};

export default Add2Menu;
