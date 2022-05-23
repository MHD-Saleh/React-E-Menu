import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./pages/Dashboard";
import First from "./first";
import ProductList from "./pages/Dishes";
import Page404 from "./pages/Error";
import Login from "./pages/Login";
import Offers from "./pages/Offers";
import Home from "./pages/Home";
import Add2Menu from "./pages/Add2Menu";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "first", element: <First /> },
        { path: "Dishes", element: <ProductList /> },
        { path: "offers", element: <Offers /> },
        { path: "AddToMenu", element: <Add2Menu /> },
        // { path: 'blog', element: <Blog /> }
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
