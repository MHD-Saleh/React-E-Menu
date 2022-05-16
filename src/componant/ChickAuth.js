import { useEffect, useState } from "react";

const Isauthed = () => {
  const [isloged, setisloged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("islogin") === "true") {
      setisloged(true);
    } else {
      setisloged(false);
    }
  }, []);
  return isloged;
};
export default Isauthed;
