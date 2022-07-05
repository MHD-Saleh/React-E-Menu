import axios from "axios";

const instance = axios.create({
  baseURL: "http://e-menu-h.herokuapp.com/",
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("mytoken");
  console.log("MMMMMYYYY :" + token);
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;
