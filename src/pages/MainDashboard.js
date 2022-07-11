import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import moment from "moment";

import { Avatar, CardActions, CardHeader, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import instance from "../authConfig/axios";
import MessageCard from "../componant/MessageCard";
import DialogPopup from "../componant/DialogPopup";

const MainDashboard = () => {
  const [isloading, setisloading] = React.useState(true);
  const navigate = useNavigate();

  const [Cart, setCart] = useState([]);

  const GetCart = async () => {
    //api/cartView

    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/cartView",
        method: "GET",
      }).then((res) => {
        // handle success
        setCart(res.data);
        setisloading(false);
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    GetCart();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [odr, setodr] = React.useState([]);

  const [grid, setgrid] = React.useState([]);

  const my_order = [];

  const get_od = (id) => {
    //const my_cart = Cart.map((elem) => return(elem.id === id));

    let obj = Cart.find((i) => i.id === id);
    setodr(obj);
    //console.log("Cart with " + id + " is : " + JSON.stringify(obj));

    let orrder = obj.order;

    console.log("order " + id + " is : " + JSON.stringify(orrder));

    /*
    setodr(Cart[id - 1].order);
    console.log("item from Get_od" + JSON.stringify(Cart[id - 1].order));
    odr.map((item) =>
      my_order.push({
        id: item.id,
        name: item.product.name,
        quantity: item.qtu,
        message: item.message,
      })
    );
    setgrid(my_order);
    console.log("my new array" + JSON.stringify(my_order));
    console.log("my new grid " + JSON.stringify(grid));*/
  };

  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <>
      {isloading ? (
        <Typography variant="h2">Loading ...</Typography>
      ) : (
        <div>
          {Cart.length === 0 ? (
            <Typography variant="h2">nothink here</Typography>
          ) : (
            <>
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
                  <SwiperSlide key={elem.id}>
                    <CurrenOrder
                      amount={elem.amount}
                      state={elem.status}
                      table={elem.table_number}
                      id={elem.id}
                      time={elem.time}
                      click={() => {
                        // handelMoreInfo(elem.id);
                        get_od(elem.id);
                        handleClickOpen();
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
          <Typography sx={{ marginTop: "20px" }} variant="h3">
            Serverd Orders:
          </Typography>

          <Button
            onClick={() => {
              get_od(1);
              //setOpenT(true);
              handleClickOpen();
            }}
          >
            test
          </Button>
          <Grid sx={{ marginTop: "20px" }} container spacing={3}>
            {Cart.map((item) => {
              if (item.status === "waiting") {
                return (
                  <Grid key={item.id} item xs={12} sm={6} md={3}>
                    <MessageCard
                      avatar={item.customer.points}
                      title={item.customer.name}
                      date={moment(item.created_at).format("YYYY/MM/DD")}
                      content={`${item.time} min`}
                      expaned={item.message}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
          <DialogPopup
            open={open}
            Close={handleClose}
            contentText={"add the Details here and click save"}
            title={"Titleee"}
            id={odr.id}
            odr={grid}
            time={odr.time}
            ammount={odr.amount}
            custName={odr.customer.name}
            tableNumber={odr.table_number}
          ></DialogPopup>
        </div>
      )}
    </>
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
