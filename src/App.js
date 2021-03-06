//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import axios from "axios";

import ThemeConfig from "./theme";

import Router from "./Routes";
import { BrowserRouter } from "react-router-dom";

axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;

function App() {
  return (
    <ThemeConfig>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeConfig>
  );
}

export default App;
