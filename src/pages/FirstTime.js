import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import MaterialLayout from "../componant/components/Layout/MaterialLayout";

import CheckoutPage from "../componant/components/CheckoutPage";
//import CheckoutPage from "./components/CheckoutPage";

function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isNotFirst") === "True") {
      navigate("/dashboard/main");
    }
  }, []);
  return (
    <div>
      <CheckoutPage />
    </div>
  );
}

export default Welcome;
