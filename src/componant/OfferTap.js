import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  createTheme,
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

  return (
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
                Add
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
                  </ListItem>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OfferTap;

/* <FormControl>
                <FormLabel id="radio-buttons-group-label">
                  Select Type
                </FormLabel>

                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  defaultValue={action}
                  name="radio-buttons-group"
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
              </FormControl> */

/*<Grid container>
     <Grid item xs={6}> 
         ... 
     </Grid>
     <Grid item xs={6}>
         ...
     </Grid>
</Grid> */

/*  <Box
      bgcolor="primary.main"
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <div style={theme.splitScreen}>
        <div style={theme.leftPane}>
          <Typography
            sx={{ mb: "25px", mt: "15px", fontFamily: "Monospace" }}
            variant="subtitle1"
          >
            Items From Menu
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <Paper sx={{ padding: "50px", margin: "20px" }}>
              <Typography variant="h3" sx={{ paddingBottom: "30px" }}>
                Offer Name
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "& .MuiTextField-root": { width: "25ch" },
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ paddingBottom: "30px", width: "100px" }}
                  margin="dense"
                  id="offer"
                  label="Offer Name"
                  type="text"
                  name="offer"
                  value={Type}
                  onChange={handleSetType}
                />

                <Button
                  sx={{ width: "70px" }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    postType();
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </div>
        </div>
        <div style={theme.rightPane}>
          <Typography
            sx={{ mb: "25px", mt: "15px", fontFamily: "Monospace" }}
            variant="subtitle1"
          >
            Items From Products
          </Typography>
        </div>
      </div>
    </Box> */

/*<Paper sx={{ padding: "50px", margin: "20px" }}>
            <Typography variant="h3" sx={{ paddingBottom: "30px" }}>
              Offer Name
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "& .MuiTextField-root": { width: "25ch" },
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ paddingBottom: "30px", width: "100px" }}
                margin="dense"
                id="offer"
                label="Offer Name"
                type="text"
                name="offer"
                value={Type}
                onChange={handleSetType}
              />

              <Button
                sx={{ width: "70px" }}
                color="primary"
                variant="contained"
                onClick={() => {
                  postType();
                }}
              >
                Submit
              </Button>
            </Box>
          </Paper> */

/*
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="demo-error-radios">Pop quiz: MUI is...</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="best"
            control={<Radio />}
            label="The best!"
          />
          <FormControlLabel
            value="worst"
            control={<Radio />}
            label="The worst."
          />
        </RadioGroup>

        <Button sx={{ mt: 1, mr: 1 }}  variant="outlined">
          Check Answer
        </Button>
      </FormControl>
    */
