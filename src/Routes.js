import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./pages/Dashboard";

import ProductList from "./pages/Dishes";
import Page404 from "./pages/Error";
import Login from "./pages/Login";
import Offers from "./pages/Offers";
import Home from "./pages/Home";
import Add2Menu from "./pages/Add2Menu";
import LabTabs from "./pages/Tabs";
import User from "./pages/UsersList";
import MainDashboard from "./pages/MainDashboard";
import Welcome from "./pages/FirstTime";
import WelcomeScreen from "./pages/Welcome";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "main", element: <MainDashboard /> },

        { path: "Dishes", element: <ProductList /> },
        { path: "offers", element: <Offers /> },
        { path: "AddToMenu", element: <Add2Menu /> }, //LabTabs
        { path: "Reports", element: <LabTabs /> },
        { path: "user", element: <User /> },
        // { path: 'blog', element: <Blog /> }
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/main" /> },
        { path: "home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "404", element: <Page404 /> },

        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/welcome",
      element: <WelcomeScreen />,
    },
  ]);
}
