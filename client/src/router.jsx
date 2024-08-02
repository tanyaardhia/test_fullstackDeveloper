import { createBrowserRouter, redirect } from "react-router-dom";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import Layout from "./views/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const isLogin = localStorage.getItem("access_token");
      if (isLogin) {
        return redirect("/dashboard");
      } else {
        return null;
      }
    },
  },
  {
    element: <Layout />,
    loader: () => !localStorage.getItem("access_token") && redirect("/"),
    children: [
      {
        path: "/dashboard",
        element: <h1>Dashboard</h1>,
      },
      {
        path: "/profile",
        element: <h1>Profile</h1>,
      },
      {
        path: "/logout",
        element: () => {
          localStorage.removeItem("access_token");
          return redirect("/");
        },
      },
    ],
  },
]);
