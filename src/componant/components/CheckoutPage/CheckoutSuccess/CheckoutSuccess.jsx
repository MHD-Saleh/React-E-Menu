import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

function CheckoutSuccess() {
  const { t, i18n, ready } = useTranslation("ns1", { useSuspense: false });

  const navigate = useNavigate();
  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm() {
    await _sleep(8000);
    navigate("/dashboard/main");
    localStorage.setItem("isNotFirst", "True");
  }

  useEffect(() => {
    document.title = "This is a title";
    _submitForm();
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        {i18n.t("thanks")}
      </Typography>
      <Typography variant="subtitle1">{i18n.t("more_info")}</Typography>
    </React.Fragment>
  );
}

export default CheckoutSuccess;
