import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Typography, Stack, Grid, Badge } from "@mui/material";
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
  const [openAlert, setopenAlert] = useState(false);

  const handelClick = () => {
    setopenAlert(true);
  };

  const handelClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openAlert(false);
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

  const [update, setUpdate] = React.useState(false);

  const handleEditOpen = () => {
    setEdit(true);
  };

  const handleEditClose = async () => {
    setEdit(false);
  };

  const [post, setPost] = React.useState(null);

  const [state, setState] = useState({
    ItemName: "",
    Price: "",
    PriceSale: "",
    Img: "",
    desc: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const createPost = () => {
    axios
      .post("http://localhost:3004/Menu", {
        name: state.ItemName,
        price: state.Price,
        cover: state.Img,
        priceSale: state.PriceSale,
        status: checked === true ? "sale" : "",
        desc: state.desc,
      })
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      });
  };

  const updateItem = (dd) => {
    console.log("trying update");

    axios
      .put(`http://localhost:3004/Menu/${dd}`, {
        name: EName,
        price: Eprice,
        priceSale: EPriceSale,
        status: EStatus === true ? "sale" : "",
        desc: Edesc,
        cover: EImg,
      })
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      });
  };

  const deleteItem = (dd) => {
    axios.delete(`http://localhost:3004/Menu/${dd}`).then(() => {
      alert("Item Deleted!");
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
    GetMenu();
  }, [update]);

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
          onClick={handleClickOpen}
          showZero
          badgeContent={dish.length}
          color="error"
          max={99}
        >
          <Iconify icon="carbon:add-filled" width={40} height={40} />
        </Badge>
      </RootStyle>
      <Snackbar
        open={open}
        onClose={handelClose}
        autoHideDuration={3000}
        //message="test Snack"
      >
        <Alert onClose={handelClose} severity="error">
          this is message
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
                <ProductImgStyle alt={dishes.name} src={dishes.cover} />
              </Box>

              <Stack spacing={2} sx={{ p: 3 }}>
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
                      console.log(dishes.name);
                      setEname(dishes.name);
                      setEprice(dishes.price);
                      setEPriceSale(dishes.priceSale);
                      setEImg(dishes.cover);
                      setEdesc(dishes.desc);
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
                      setUpdate(!update);
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
            margin="normal"
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
            margin="normal"
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
                setUpdate(!update);
              } else {
                createPost();
                handleClose();
                setUpdate(!update);
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={() => {
              updateItem(EID);
              handleEditClose();
              setUpdate(!update);
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
