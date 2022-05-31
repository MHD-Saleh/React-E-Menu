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

//  console.log("windows location", window.location.origin);

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 66 },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const rowsAfter = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 66 },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
const newRow = [];

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
          /* <IconButton aria-label="delete">
      <DeleteIcon color="error" />
    </IconButton>*/
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

          console.log(params.id);
          DeleteMainMenu(params.id);
        };

        return (
          /* <IconButton aria-label="delete">
      <DeleteIcon color="error" />
    </IconButton>*/
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

  //http://127.0.0.1:8000/api/outOfMenu
  const [prod_id, setprod_id] = useState();

  const store2menu = () => {
    axios
      .post("http://localhost:8000/api/outOfMenu", {
        product_id: prod_id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  //http://127.0.0.1:8000/api/outOfMenu

  const [before, setbefore] = useState([]);

  const GetBefore = async () => {
    await axios
      .get("http://localhost:8000/api/outOfMenu")
      .then((res) => {
        console.log(res.data);
        setbefore(res.data);
      })
      .catch((err) => {
        console.log("errrrrrrrrrrr", err.response.status);
      });
  };

  //http://127.0.0.1:8000/api/Menu

  /*const detailsRows = after.map((row) => {
    return {
      id: row.id,
    };
  });*/

  const [tableData, setTableData] = useState([]);

  const testget = async () => {
    await axios
      .get("http://localhost:8000/api/Menu")
      .then((data) => data.json())
      .then((data) => setTableData(data))
      .catch((err) => {
        console.log("errror ", err.response.status);
      });
  };

  const [sa, setsa] = useState([]);

  const GetAfter = async () => {
    await axios
      .get("http://localhost:8000/api/Menu")
      .then((res) => {
        console.log("After Data", res.data);
        setsa(res.data);
        console.log("menu", res.data[0].menu[0].id);
      })

      .catch((err) => {
        console.log("errror from get after with code", err.response.status);
        if (err.response.status === 401) {
          localStorage.removeItem("islogin");
          console.log("found error");
          navigate("/login");
        }
      });
  };

  //Store To Actual Menu
  //http://127.0.0.1:8000/api/menuStore
  const AddMainMenu = async (id) => {
    await axios
      .post("http://localhost:8000/api/menuStore", {
        product_id: id,
      })
      .then((response) => {
        console.log("post to menu log: ", response.data);
        GetAfter();
        GetBefore();
        handelClickSuccess();
      })
      .catch((error) => {
        console.log("error with posting add to menu", error);
        handelClickError();
      });
  };

  //delete from Actual Menu
  //http://127.0.0.1:8000/api/menuDelete/2
  const DeleteMainMenu = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/menuDelete/${id}`)
      .then((response) => {
        console.log("post to menu log: ", response.data);
        GetAfter();
        GetBefore();
      })
      .catch((error) => {
        handelClickError();
        console.log("error with posting add to menu", error);
      });
  };

  useEffect(() => {
    console.log("load Add2Menu page");
    GetAfter();
    testget();
    GetBefore();
  }, []);

  return (
    <div>
      <Typography
        sx={{ mb: "10px", fontFamily: "Monospace", color: "#43a047" }}
        variant="h3"
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
              rows={sa}
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
            rows={before}
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

/*  <Grid container alignItems="stretch" spacing={3}>
        <Grid className="left-pane" item>
          <h1>Test 1</h1>
          <Button variant="contained" color="error">
            test
          </Button>
          <h1>Test 1</h1>
          <h1>Test 1</h1>
          <h1>Test 1</h1>
        </Grid>
        <Grid className="right-pane" item>
          <h1>Test</h1>
          <Button variant="contained" color="primary">
            hello
          </Button>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
        </Grid>
      </Grid>*/
