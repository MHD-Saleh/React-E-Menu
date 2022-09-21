import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import instance from "../authConfig/axios";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";

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

const OfferTap = () => {
  const { t, i18n, ready } = useTranslation("ns1", { useSuspense: false });
  const [isloading, setisloading] = useState(true);
  const navigate = useNavigate();
  const handleSetType = (e) => {
    setType(e.target.value);
  };
  const handleSetImg = (e) => {
    setImg(e.target.value);
  };

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    image: Yup.string().required("image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("name :", getFieldProps("name").value);
      console.log("image is :", getFieldProps("image").value);
      postType(getFieldProps("name").value, getFieldProps("image").value);
      //loginn(getFieldProps("email").value, getFieldProps("password").value);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const [Type, setType] = useState("");
  const [Img, setImg] = useState("");

  const [action, setaction] = useState(1);

  const [Types, setTypes] = useState([]);

  const postType = async (nme, img) => {
    //api/typeStore

    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/giftStore`,
        method: "POST",
        data: {
          name: nme,
          image: img,
        },
      }).then((res) => {
        // handle success
        console.log("created");
        getType();
      });
    } catch (e) {
      // handle error
      console.error(e);
      if (e.response.status === 401) {
        navigate("/login");
        localStorage.removeItem("mytoken");
      }
    }
  };

  const changeType = async (dd) => {
    //api/typeStore
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/giftActive/${dd}`,
        method: "POST",
      }).then((res) => {
        // handle success
        console.log("changeType");
        getType();
      });
    } catch (e) {
      // handle error
      console.error(e);
      if (e.response.status === 401) {
        navigate("/login");
        localStorage.removeItem("mytoken");
      }
    }
  };

  const getType = async () => {
    //api/typeStore
    setisloading(true);
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/giftView`,
        method: "GET",
      }).then((res) => {
        // handle success
        setTypes(res.data);
        console.log(
          "active Type : " + res.data.find((i) => i.active === true).id
        );

        //const actt = Types.find((i) => i.active === true);
        setaction(res.data.find((i) => i.active === true).id);

        console.log("changeType new active Type " + action);
        setisloading(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
      if (e.response.status === 401) {
        navigate("/login");
        localStorage.removeItem("mytoken");
      }
    }
  };
  useEffect(() => {
    getType();
  }, []);

  const handleRadioChange = (event) => {
    //setValue(event.target.value);
    console.log("event " + event.target.value);
    changeType(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const handelClick = () => {
    setOpen(true);
  };

  const handelClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [Edit_id, setEdit_id] = useState("");
  const [EName, setEname] = useState("");
  const [EImg, setEImg] = useState("");

  const handleSetEditName = (e) => {
    setEname(e.target.value);
  };
  const handleSetEditImg = (e) => {
    setEImg(e.target.value);
  };

  return (
    <>
      {isloading ? (
        <>
          <Typography variant="h2">{i18n.t("loading")}</Typography>
        </>
      ) : (
        <>
          <Dialog open={open} onClose={handelClose}>
            <DialogTitle>{i18n.t("Edit_Item")}</DialogTitle>
            <DialogContent>
              <DialogContentText>{i18n.t("enter_edit")}</DialogContentText>
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
                autoFocus
                margin="dense"
                id="image"
                type="text"
                fullWidth
                label="Item Image"
                name="ItemImage"
                value={EImg}
                onChange={handleSetEditImg}
                error={EImg === ""}
                helperText={EImg === "" ? "Please Enter image" : ""}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handelClose}>Cancel</Button>
              <Button
                onClick={() => {
                  /*updateType(Edit_id);
                  handleEditClose();*/
                }}
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container>
            <Grid item xs={6}>
              <Paper sx={{ padding: "50px", marginTop: "20px" }}>
                <FormikProvider value={formik}>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        autoComplete="name"
                        type="name"
                        label="name"
                        {...getFieldProps("name")}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />

                      <TextField
                        fullWidth
                        autoComplete="image"
                        type={"text"}
                        label="image"
                        {...getFieldProps("image")}
                        error={Boolean(touched.image && errors.image)}
                        helperText={touched.image && errors.image}
                      />
                    </Stack>

                    <Button
                      sx={{ marginTop: "20px" }}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {i18n.t("add")}
                    </Button>
                  </Form>
                </FormikProvider>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ padding: "50px", margin: "20px" }}>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControl>
                      <FormLabel id="demo-error-radios">Select Type</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-error-radios"
                        name="type"
                        value={action}
                        onChange={handleRadioChange}
                      >
                        {Types.map((item) => (
                          <FormControlLabel
                            key={item.id}
                            value={item.id}
                            control={<Radio />}
                            label={`${item.name} , Used ${item.count} Times`}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="column" spacing={1}>
                      {Types.map((item) => (
                        <ListItem key={item.id}>
                          <img
                            width={30}
                            height={30}
                            src={item.image}
                            alt={item.image}
                            loading="lazy"
                          />
                          <EditIcon
                            sx={{ marginLeft: "20px" }}
                            color="primary"
                            onClick={() => {
                              handelClick();
                              setEdit_id(item.id);
                              setEname(item.name);
                              setEImg(item.image);
                            }}
                          />
                        </ListItem>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default OfferTap;
