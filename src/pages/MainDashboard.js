import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import moment from "moment";
import img from "../image/bg.jpg";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import pusherJs from "pusher-js";

import {
  Avatar,
  Box,
  CardActions,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import instance from "../authConfig/axios";
import MessageCard from "../componant/MessageCard";
import DialogPopup from "../componant/DialogPopup";
import CardMoreOption from "../componant/CardMoreOption";
import { PrintPage } from "../componant/PrintPage";

const MainDashboard = () => {
  var pusher = new pusherJs("6fcfe21f0c128f7ed849", {
    cluster: "ap2",
  });

  var channel = pusher.subscribe("new-order");
  channel.bind("new order", function (data) {
    alert(JSON.stringify(data));
  });

  const [isloading, setisloading] = React.useState(true);
  const navigate = useNavigate();

  const [Cart, setCart] = useState([]);
  const [CartGoning, setCartGoning] = useState([]);
  const [CartDone, setCartDone] = useState([]);

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

  const GetCartGoning = async () => {
    //api/cartView

    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/cartGoingView",
        method: "GET",
      }).then((res) => {
        // handle success

        setCartGoning(res.data);
        setisloading(false);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const GetCartDone = async () => {
    //api/cartView

    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/cartDoneView",
        method: "GET",
      }).then((res) => {
        // handle success

        setCartDone(res.data);
        setisloading(false);
      });
    } catch (e) {
      console.error(e);
    }
  };

  //api/cartgoing/1

  const setGoingOn = async (dd) => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/cartGoing/${dd}`,
        method: "POST",
      }).then(() => {
        // handle success
        GetCartGoning();
        GetCart();
        GetCartDone();
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  const setDone = async (dd) => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/cartDone/${dd}`,
        method: "POST",
      }).then(() => {
        // handle success
        GetCartGoning();
        GetCart();
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  useEffect(() => {
    GetCart();
    GetCartGoning();
    GetCartDone();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [odr, setodr] = React.useState([]);

  const [grid, setgrid] = React.useState([]);

  const [username, setusername] = React.useState("");

  const my_order = [];

  const get_od = (id) => {
    //const my_cart = Cart.map((elem) => return(elem.id === id));

    let obj = Cart.find((i) => i.id === id);
    setodr(obj);
    setusername(obj.customer.name);
    //console.log("Cart with " + id + " is : " + JSON.stringify(obj));

    let orrder = obj.order;

    console.log("order " + id + " is : " + JSON.stringify(orrder));

    orrder.map((item, index) =>
      my_order.push({
        id: index + 1,
        name: item.product.name,
        quantity: item.qtu,
        message: item.message,
      })
    );
    setgrid(my_order);
    console.log("my array is : " + JSON.stringify(my_order));
  };

  const handleClose = async () => {
    setOpen(false);
  };

  let componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {isloading ? (
        <Typography variant="h2">Loading ...</Typography>
      ) : (
        <div>
          {Cart.length === 0 ? (
            <>
              <Typography variant="h2">nothink here</Typography>
              <Box display="flex" alignItems="center" justifyContent="center">
                <img src={img} alt="login" />
              </Box>
            </>
          ) : (
            <>
              <Box
                bgcolor="primary.main"
                sx={{
                  borderRadius: 2,
                  paddingBottom: "20px",
                }}
              >
                <Typography
                  sx={{
                    marginBottom: "10px",
                    paddingLeft: "20px",
                    paddingTop: "5px",
                    width: 280,
                    height: 50,
                    backgroundColor: "primary.main",
                    color: "white",
                    borderRadius: "10px",
                  }}
                  variant="h3"
                >
                  waiting Orders:
                </Typography>

                <Swiper
                  autoplay={{
                    delay: 3500,
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
                        setgoing={() => {
                          setGoingOn(elem.id);
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </>
          )}
          <Divider
            sx={{
              borderBottomWidth: 5,
              paddingTop: "20px",
              borderColor: "gray",
            }}
          />
          <Typography
            sx={{
              marginTop: "20px",
              marginBottom: "10px",
              paddingLeft: "20px",
              width: 320,
              height: 50,
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "10px",
            }}
            variant="h3"
          >
            Going on Orders:
          </Typography>
          <Grid sx={{ marginTop: "20px" }} container spacing={3}>
            {CartGoning.map((item) => {
              return (
                <Grid key={item.id} item xs={12} sm={6} md={3}>
                  <MessageCard
                    avatar={item.id}
                    title={item.customer.name}
                    date={moment(item.created_at).format("YYYY/MM/DD")}
                    content={`${item.amount} sp`}
                    expaned={`${item.order.map(
                      (e) => e.product.name + " : " + e.qtu + " "
                    )}`}
                    check={() => setDone(item.id)}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Typography
            sx={{
              marginTop: "20px",
              marginBottom: "10px",
              paddingLeft: "20px",
              width: 280,
              height: 50,
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "10px",
            }}
            variant="h3"
          >
            Serverd Orders:
          </Typography>
          <Grid sx={{ marginTop: "20px" }} container spacing={3}>
            {CartDone.map((item) => {
              return (
                <Grid key={item.id} item xs={12} sm={6} md={3}>
                  <MessageCard
                    avatar={item.id}
                    title={item.customer.name}
                    date={moment(item.created_at).format("YYYY/MM/DD")}
                    content={`${item.amount} sp`}
                    expaned={`${item.order.map(
                      (e) => e.product.name + " : " + e.qtu + " "
                    )}`}
                    check={() => setDone(item.id)}
                  />
                </Grid>
              );
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
            custName={username}
            ammount={odr.amount}
            tableNumber={odr.table_number}
            print={() => handlePrint()}
          ></DialogPopup>
          <div style={{ display: "none" }}>
            <PrintPage
              id={odr.id}
              odr={grid}
              time={odr.time}
              custName={username}
              ammount={odr.amount}
              tableNumber={odr.table_number}
              ref={componentRef}
            />
          </div>
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
          <>
            <IconButton
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              size="small"
              aria-label="Check"
              onClick={probs.setgoing}
            >
              <HourglassBottomIcon />
            </IconButton>
          </>
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
