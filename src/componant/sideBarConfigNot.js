// component
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const sidebarConfigNotLoged = [
  //localStorage.setItem("islogin", "true");

  {
    title: "Login",
    path: "/login",
    icon: getIcon("eva:person-fill"),
  },
];

export default sidebarConfigNotLoged;
