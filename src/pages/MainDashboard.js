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

import { Avatar, CardHeader } from "@mui/material";

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

  return (
    <div className="App">
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
        <SwiperSlide>
          <CurrenOrder
            amount="20,000"
            state="{cart.status}"
            name="table number 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <CurrenOrder
            amount="30,000"
            state="{cart.status}"
            name="table number 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <CurrenOrder
            amount="10,000"
            state="{cart.status}"
            name="table number 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <CurrenOrder
            amount="7,000"
            state="{cart.status}"
            name="table number 4"
          />
        </SwiperSlide>
        <SwiperSlide>
          <CurrenOrder
            amount="27,000"
            state="{cart.status}"
            name="table number 5"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainDashboard;

const CurrenOrder = (probs) => {
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
            R
          </Avatar>
        }
        action={
          <IconButton>
            <DeleteIcon />
          </IconButton>
        }
        title={probs.name}
        subheader="5 Min ago"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Amount: {probs.amount}
        </Typography>
        <Typography variant="h5" component="div">
          {probs.name}
        </Typography>
        <Button>more info</Button>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {probs.state}
        </Typography>
        <Typography variant="body2">{probs.detiles}</Typography>
      </CardContent>
    </Card>
  );
};
