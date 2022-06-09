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
// import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from "../componant/Iconify";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// component

// material

// utils

//
import Label from "../componant/Label";

//import Isauthed from "../componant/ChickAuth";

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

export default function ProductList({ ...other }) {
  const [Type, setType] = useState("");
  const [type_Id, settype_Id] = useState([]);
  const [CrtType, setCrtType] = useState();

  const handel_type = (event) => {
    setType(event.target.value);
    //console.log(type_Id[event.target.value - 1].id);
    setCrtType(type_Id[event.target.value - 1].id);
    //console.log("this is my select ", type_Id[0].id);
  };

  const [openAlert, setopenAlert] = useState(false);

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
  const [dish, setdishs] = useState([]);
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

  const [state, setState] = useState({
    ItemName: "",
    TypeId: "",
    Price: "",
    PriceSale: "",
    Time: "",
    Img: "",
    desc: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const TypeCatogory = async () => {
    //http://127.0.0.1:8000/api/typeView
    await axios
      .get("http://localhost:8000/api/typeView")
      .then((res) => {
        console.log("Type Date", res.data);
        settype_Id(res.data);
      })
      .catch((err) => {
        console.log("errrrrrrrrrrr", err.response.status);
        if (err.response.status === 401) {
          localStorage.removeItem("islogin");
          console.log("found error");
          navigate("/login");
        }
      });
  };

  const createPost = () => {
    console.log("i am creating product");
    axios
      .post("http://localhost:8000/api/productStore", {
        name: state.ItemName,
        type_id: CrtType,
        time: 5,
        price: state.Price,
        image: state.Img,
        priceSale: state.PriceSale,
        status: checked === true ? "sale" : "",
        details: state.desc,
      })
      .then((response) => {
        console.log(response.data);
        GetMenu();
      });
  };

  const updateItem = async (dd) => {
    console.log("trying update");

    await axios
      .post(`http://localhost:8000/api/productEdit/${dd}`, {
        name: EName,
        type_id: 1,
        time: 5,
        price: Eprice,
        priceSale: EPriceSale,
        status: EStatus === true ? "sale" : "",
        details: Edesc,
        image: EImg,
      })
      .then((response) => {
        console.log(response.data);
        GetMenu();
      });
  };

  const deleteItem = (dd) => {
    axios.delete(`http://localhost:8000/api/productDelete/${dd}`).then(() => {
      GetMenu();
    });
  };

  const GetMenu = async () => {
    await axios
      .get("http://localhost:8000/api/productView")
      .then((res) => {
        console.log(res.data);
        setdishs(res.data);
      })
      .catch((err) => {
        console.log("errrrrrrrrrrr", err.response.status);
        if (err.response.status === 401) {
          localStorage.removeItem("islogin");
          console.log("found error");
          navigate("/login");
        }
      });
    /* axios
      .get("http://localhost:3004/Menu")
      .then((res) => {
        console.log(res.data);
        setdishs(res.data);
      })
      .catch((err) => {
        console.log(err);
        });*/
  };

  useEffect(() => {
    console.log("updatinggggggg useEffect");
    GetMenu();

    TypeCatogory();
  }, []);

  const [checked, setChecked] = React.useState(false);

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  const [allValues, setAllValues] = useState({
    ItemName: "",
    Price: "",
    PriceSale: "",
    Img: "",
    desc: "",
  });

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };
  const [EID, setEID] = useState("");
  const [EName, setEname] = useState("");
  const [Eprice, setEprice] = useState("");
  const [EPriceSale, setEPriceSale] = useState("");
  const [EImg, setEImg] = useState("");
  const [Edesc, setEdesc] = useState("");
  const [EStatus, setEStatus] = useState();
  const [Etype, setEtype] = useState();

  const handleEtype = (event) => {
    setEtype(event.target.value);
  };

  const handlesetEStatus = (event) => {
    setEStatus(event.target.checked);
  };

  const handleSetEditName = (e) => {
    setEname(e.target.value);
  };
  const handleSetEditPrice = (e) => {
    setEprice(e.target.value);
  };
  const handleSetEditPriceSale = (e) => {
    setEPriceSale(e.target.value);
  };
  const handleSetEditImg = (e) => {
    setEImg(e.target.value);
  };
  const handleSetEditdesc = (e) => {
    setEdesc(e.target.value);
  };

  return (
    <div>
      <RootStyle>
        <Badge
          onClick={() => {
            handleClickOpen();
            handelClick();
          }}
          showZero
          badgeContent={dish.length}
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
        //message="test Snack"
      >
        <Alert onClose={handelClose} severity="warning">
          please Fill all Input
        </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        {dish.map((dishes) => (
          <Grid key={dishes.id} item xs={12} sm={6} md={3}>
            <Card style={secondery}>
              <Box sx={{ pt: "100%", position: "relative" }}>
                {dishes.status && (
                  <Label
                    variant="filled"
                    color={(dishes.status === "sale" && "error") || "info"}
                    sx={{
                      zIndex: 9,
                      top: 16,
                      right: 16,
                      position: "absolute",
                      textTransform: "uppercase",
                    }}
                  >
                    {dishes.status}
                  </Label>
                )}
                <ProductImgStyle alt={dishes.name} src={dishes.image} />
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
                    <Iconify
                      sx={{ color: "Green" }}
                      icon="eva:edit-2-fill"
                      width={20}
                      height={20}
                    />
                    <Typography
                      variant="subtitle2"
                      noWrap
                      onClick={() => {
                        setEtype(dishes.type_id);
                        console.log(dishes.name);
                        setEname(dishes.name);
                        setEprice(dishes.price);
                        setEPriceSale(dishes.priceSale);
                        setEImg(dishes.image);
                        setEdesc(dishes.details);
                        setEdit(true);
                        setEID(dishes.id);
                        if (dishes.status === "sale") {
                          setEStatus(true);
                        } else {
                          setEStatus(false);
                        }
                      }}
                    >
                      {dishes.name}
                    </Typography>
                  </Link>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle1">
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{
                        color: "text.disabled",
                        textDecoration: "line-through",
                      }}
                    >
                      {dishes.priceSale && dishes.priceSale}
                    </Typography>
                    &nbsp;
                    {dishes.price} SP
                  </Typography>
                  <Button
                    onClick={() => {
                      deleteItem(dishes.id);
                    }}
                    variant="contained"
                    color="error"
                  >
                    Delete
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
            value={state.ItemName}
            onChange={handleChange}
            error={state.ItemName === ""}
            helperText={state.ItemName === "" ? "Please Enter Name" : ""}
          />
          <TextField
            margin="dense"
            id="price"
            label="Item Price"
            type="number"
            fullWidth
            name="Price"
            value={state.Price}
            onChange={handleChange}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            error={state.Price === ""}
            helperText={state.Price === "" ? "Please Enter price" : ""}
          />
          <TextField
            margin="dense"
            id="PriceSale"
            label="Item Price after Sale"
            type="number"
            fullWidth
            name="PriceSale"
            value={state.PriceSale}
            onChange={handleChange}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={checked} onChange={handleSwitchChange} />
              }
              label="Status"
            />
          </FormGroup>

          <TextField
            margin="dense"
            id="Img"
            label="Item image Link"
            type="text"
            fullWidth
            name="Img"
            value={state.Img}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="desc"
            label="Item Description"
            type="text"
            fullWidth
            rows={2}
            multiline
            name="desc"
            value={state.desc}
            onChange={handleChange}
            error={state.desc === ""}
            helperText={state.desc === "" ? "Please Enter Description" : ""}
          />
          <FormControl fullWidth>
            <InputLabel id="type-menu">select Type</InputLabel>
            <Select
              margin="dense"
              labelId="type-menu"
              id="type-menu"
              value={Type}
              label="select"
              onChange={handel_type}
              autoWidth
            >
              {type_Id.map((this_type) => (
                <MenuItem key={this_type.id} value={this_type.id}>
                  {this_type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (
                state.ItemName === "" ||
                state.Price === "" ||
                state.Img === "" ||
                state.desc === ""
              ) {
                handleClose();
              } else {
                createPost();

                handleClose();
              }
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
          <TextField
            margin="dense"
            id="price"
            label="Item Price"
            type="number"
            fullWidth
            name="Price"
            value={Eprice}
            onChange={handleSetEditPrice}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            error={Eprice === ""}
            helperText={Eprice === "" ? "Please Enter price" : ""}
          />
          <TextField
            margin="dense"
            id="PriceSale"
            label="Item Price after Sale"
            type="number"
            fullWidth
            name="PriceSale"
            value={EPriceSale}
            onChange={handleSetEditPriceSale}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={EStatus} onChange={handlesetEStatus} />}
              label="Status"
            />
          </FormGroup>

          <TextField
            margin="dense"
            id="Img"
            label="Item image Link"
            type="text"
            fullWidth
            name="Img"
            value={EImg}
            onChange={handleSetEditImg}
          />
          <TextField
            margin="dense"
            id="desc"
            label="Item Description"
            type="text"
            fullWidth
            rows={2}
            multiline
            name="desc"
            value={Edesc}
            onChange={handleSetEditdesc}
            error={Edesc === ""}
            helperText={Edesc === "" ? "Please Enter Description" : ""}
          />
          <FormControl fullWidth>
            <InputLabel id="type-menu">select Type</InputLabel>
            <Select
              margin="dense"
              labelId="type-menu"
              id="type-menu"
              value={Etype}
              label="select"
              onChange={handel_type}
              autoWidth
            >
              {type_Id.map((this_type) => (
                <MenuItem key={this_type.id} value={this_type.id}>
                  {this_type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={() => {
              updateItem(EID);

              handleEditClose();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="primary" onClick={handelClick}>
        Snackbar
      </Button>
    </div>
  );
}
