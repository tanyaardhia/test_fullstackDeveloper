import { createBrowserRouter, redirect } from "react-router-dom";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import Layout from "./views/Layout";
import { DetailNewsById } from "./views/detailNewsById";

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
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/news/:id",
        element: <DetailNewsById />,
        loader: () => {
          const isLogin = localStorage.getItem("access_token");
          // console.log(isLogin, "masukk");
          if (!isLogin) {
            // console.log("masukk");
            return redirect("/login");
          }
          // console.log("masukk 2");

          return null;
        },
      },
      {
        path: "/profile",
        element: <h1>Profile</h1>,
      },
    ],
  },
]);
