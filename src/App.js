//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import axios from "axios";

import ThemeConfig from "./theme";

import Router from "./Routes";
import Welcome from "./pages/FirstTime";
import { BrowserRouter } from "react-router-dom";

axios.defaults.headers.post["Content-Type"] = "application/json";
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
