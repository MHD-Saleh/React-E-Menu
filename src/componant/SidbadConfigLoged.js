// component
import Iconify from "./Iconify";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

var sidebarConfigLoged = [
  {
    title: i18n.t("dashboard"),
    path: "/dashboard/main",
    icon: getIcon("eva:home-fill"),
  },
  {
    title: i18n.t("user_List"),
    path: "/dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: i18n.t("Dishes"),
    path: "/dashboard/dishes",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: i18n.t("Edit_Menu"),
    path: "/dashboard/AddToMenu",
    icon: getIcon("eva:flip-2-fill"),
  },
  {
    title: i18n.t("Offers"),
    path: "/dashboard/Offers",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: i18n.t("Reports"),
    path: "/dashboard/Reports",
    icon: getIcon("eva:pie-chart-2-fill"),
  },

  {
    title: i18n.t("Not_found"),
    path: "/404",
    icon: getIcon("eva:alert-triangle-fill"),
  },
];

export default sidebarConfigLoged;
