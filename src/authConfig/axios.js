import axios from "axios";

const instance = axios.create({
  baseURL: "https://e-menu-h.herokuapp.com/",
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("mytoken");

  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;
