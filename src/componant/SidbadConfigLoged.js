// component
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfigLoged = [
  //localStorage.setItem("islogin", "true");

  {
    title: "dashboard",
    path: "/dashboard/main",
    icon: getIcon("eva:home-fill"),
  },
  {
    title: "customer List",
    path: "/dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Dishes",
    path: "/dashboard/dishes",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "Edit Menu",
    path: "/dashboard/AddToMenu",
    icon: getIcon("eva:flip-2-fill"),
  },
  {
    title: "Offers",
    path: "/dashboard/Offers",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Reports",
    path: "/dashboard/Reports",
    icon: getIcon("eva:pie-chart-2-fill"),
  },

  {
    title: "Not found",
    path: "/404",
    icon: getIcon("eva:alert-triangle-fill"),
  },
];

export default sidebarConfigLoged;
