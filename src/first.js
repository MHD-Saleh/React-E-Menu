import React from "react";

import axios from "./authConfig/axios";

function First() {
  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const logout = async () => {
    await csrf();
    console.log(csrf());

    axios
      .post("/logout")
      .then(() => {
        // navigate("/");
        localStorage.removeItem("islogin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>first page</h1>
      <button onClick={logout}>click me</button>
    </div>
  );
}

export default First;
