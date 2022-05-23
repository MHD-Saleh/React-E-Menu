// component
import Iconify from "../componant/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  //localStorage.setItem("islogin", "true");

  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
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
    title: "Not found",
    path: "/404",
    icon: getIcon("eva:alert-triangle-fill"),
  },
];

export default sidebarConfig;
