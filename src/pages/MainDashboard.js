import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

import moment from "moment";

import {
  Avatar,
  CardActions,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const MainDashboard = () => {
  const navigate = useNavigate();
  //http://127.0.0.1:8000/api/cartView

  const handelClick = () => {
    GetCart();
  };

  const [Cart, setCart] = useState([]);

  const GetCart = async () => {
    await axios
      .get("http://localhost:8000/api/cartView")
      .then((res) => {
        console.log(res.data);
        console.log("id is : ", res.data.id);
        console.log("table num : ", res.data.table_number);
        setCart(res.data);
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

  useEffect(() => {
    GetCart();
    //console.log(Cart[0].id);
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [id, setid] = React.useState();
  const [Customer_id, setCustomer_id] = React.useState();
  const [amount, setAmount] = React.useState();
  const [Status, setStatus] = React.useState();
  const [Createtime, setCreatetime] = React.useState();

  const handelMoreInfo = (id) => {
    setid(id);
    setAmount(Cart[id - 1].amount);
    setCustomer_id(Cart[id - 1].customer_id);
    setStatus(Cart[id - 1].status);

    const advance_date = moment(Cart[id - 1].created_at)
      .utc()
      .hour();

    const total_time = moment(Cart[id - 1].created_at).format("h:mm");

    const from_now = moment(Cart[id - 1].created_at)
      .startOf("hour")
      .fromNow();
    //setCreatetime(advance_date.getTime);

    console.log(from_now + " ago");

    setCreatetime(total_time);

    handleClickOpen();
  };

  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <div>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          type: "fraction",
        }}
        cssMode={true}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
        spaceBetween={20}
        slidesPerView={3}
      >
        {Cart.map((elem) => (
          <SwiperSlide>
            <CurrenOrder
              amount={elem.amount}
              state={elem.status}
              table={elem.table_number}
              id={elem.id}
              time={elem.time}
              click={() => handelMoreInfo(elem.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Dialog open={open} onClose={handleClose}>
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
                <Grid item xs={6} alignItems="flex-end" justify="flex-start">
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
      </Dialog>
    </div>
  );
};

export default MainDashboard;

const CurrenOrder = (probs) => {
  const { t, i18n, ready } = useTranslation("ns1", { useSuspense: false });

  return (
    <Card
      sx={{
        minWidth: 275,

        boxShadow: 3,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "green" }} aria-label="recipe">
            T
          </Avatar>
        }
        action={
          <IconButton>
            <DeleteIcon />
          </IconButton>
        }
        title={probs.id}
        subheader={i18n.t("time") + probs.time}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="green" gutterBottom>
          {i18n.t("price")} {probs.amount}
        </Typography>
        <Typography variant="h5" component="div">
          {i18n.t("table_no")} {probs.table}
        </Typography>

        <Typography variant="body2">{probs.detiles}</Typography>
        <CardActions sx={{ justifyContent: "center" }}>
          {" "}
          <Typography sx={{ mb: 1.5 }} color="red">
            {i18n.t("state")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {probs.state}
          </Typography>
        </CardActions>
        <Button variant="contained" onClick={probs.click}>
          {i18n.t("more_inf")}
        </Button>
      </CardContent>
    </Card>
  );
};

/*


<Grid item container direction="column" xs={12} sm={6}>
      <Typography variant="h6" gutterBottom className={classes.title}>
        {i18n.t("summary")}
      </Typography>
      <Grid container>
        <React.Fragment>
          <Grid item xs={6}>
            <Typography gutterBottom>{i18n.t("Fname")}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{firstName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{i18n.t("Lname")}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{lastName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{i18n.t("Rname")}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{RestaurantName}</Typography>
          </Grid>
        </React.Fragment>
      </Grid>
    </Grid>
*/

/*

     <Typography
            sx={{ fontSize: 14 }}
            style={{
              float: "left",
            }}
            color="green"
            gutterBottom
          >
            Amount :
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            style={{
              float: "right",
            }}
            color="red"
            gutterBottom
          >
            {amount}
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            style={{
              float: "left",
            }}
            color="green"
            gutterBottom
          >
            Status :
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            style={{
              float: "right",
            }}
            color="red"
            gutterBottom
          >
            {Status}
          </Typography>
          */
