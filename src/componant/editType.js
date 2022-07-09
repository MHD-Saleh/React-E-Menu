import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Grid,
  Badge,
  InputLabel,
  FormControl,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Iconify from "../componant/Iconify";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import i18n from "../i18n";
import instance from "../authConfig/axios";

// ----------------------------------------------------------------------

//alert constractor
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const RootStyle = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(16),
  height: 70,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  color: "white",
  backgroundColor: "#007b55",
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

const secondery = {
  marginTop: 50,
  marginLeft: 25,
  position: "relative",
  fontFamily: "Roboto",
  fontWeight: "bold",
};

const EditType = () => {
  const [openAlert, setopenAlert] = useState(false);
  const [message, setmessage] = useState("error");

  const handelClick = () => {
    setopenAlert(true);
  };

  const handelClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenAlert(false);
  };
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(true);

  const [Types, setTypes] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const [edit, setEdit] = React.useState(false);

  const handleEditOpen = () => {
    setEdit(true);
  };

  const handleEditClose = async () => {
    setEdit(false);
  };

  const addType = async () => {
    console.log("i'm creating Type");
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/typeStore",
        method: "POST",
        data: {
          name: Name,
        },
      }).then((res) => {
        // handle success
        console.log("created");
        setName("");

        GetMenu();
      });
    } catch (e) {
      // handle error
      console.error(e);
      handelClick();
      setmessage("error with add Type");
    }
  };

  const updateType = async (dd) => {
    //api/typeEdit/{id}
    console.log("i'm updating Type");
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/typeEdit/${dd}`,
        method: "POST",
        data: {
          name: EName,
        },
      }).then((res) => {
        // handle success
        console.log("created");
        setEname("");

        GetMenu();
      });
    } catch (e) {
      // handle error
      console.error(e);
      handelClick();
      setmessage("error with update type");
    }
  };

  const deleteItem = async (dd) => {
    //api/productDelete
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/typeDelete/${dd}`,
        method: "DELETE",
      }).then((res) => {
        // handle success
        console.log("deleted");

        GetMenu();
      });
    } catch (e) {
      // handle error
      console.error(e);
      // handelClick();
      //setmessage("error with Delete item");
    }
  };

  const GetMenu = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/typeView",
        method: "GET",
      }).then((res) => {
        // handle success
        console.log(res.data);
        console.log("image : " + res.data[0].product[0].image);
        setTypes(res.data);
        setisloading(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
      handelClick();
      setmessage("error with get Type List");
    }
  };

  useEffect(() => {
    GetMenu();
  }, []);

  const [EName, setEname] = useState("");
  const [Name, setName] = useState("");

  const handleSetEditName = (e) => {
    setEname(e.target.value);
  };

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const [Edit_id, setEdit_id] = useState("");

  return (
    <>
      {isloading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <div>
          <RootStyle>
            <Badge
              onClick={() => {
                handleClickOpen();
              }}
              showZero
              badgeContent={Types.length}
              color="error"
              max={99}
            >
              <Iconify icon="carbon:add-filled" width={40} height={40} />
            </Badge>
          </RootStyle>
          <Snackbar
            open={openAlert}
            onClose={handelClose}
            autoHideDuration={3000}
          >
            <Alert onClose={handelClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
          <Grid container spacing={3}>
            {Types.map((type) => (
              <Grid key={type.id} item xs={12} sm={6} md={3}>
                <Card style={secondery}>
                  <Box sx={{ pt: "100%", position: "relative" }}>
                    <ProductImgStyle alt={type.name} src={"image"} />
                  </Box>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Link
                        to="#"
                        color="inherit"
                        underline="hover"
                        component={RouterLink}
                      >
                        <Typography
                          variant="subtitle2"
                          noWrap
                          onClick={() => {
                            handleEditOpen();
                            setEdit_id(type.id);
                            setEname(type.name);
                          }}
                        >
                          {type.name}
                        </Typography>
                      </Link>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Button
                        onClick={() => {
                          deleteItem(type.id);
                        }}
                        variant="contained"
                        color="error"
                      >
                        {i18n.t("delete")}
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent>
              <DialogContentText>
                add the Details here and click save
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                label="Item Name"
                name="ItemName"
                value={Name}
                onChange={handleSetName}
                //error={state.ItemName === ""}
                //helperText={state.ItemName === "" ? "Please Enter Name" : ""}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  addType();
                  handleClose();
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={edit} onClose={handleEditClose}>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit the Details here and click update
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                label="Item Name"
                name="ItemName"
                value={EName}
                onChange={handleSetEditName}
                error={EName === ""}
                helperText={EName === "" ? "Please Enter Name" : ""}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button
                onClick={() => {
                  updateType(Edit_id);
                  handleEditClose();
                }}
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default EditType;
