import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/SignUp";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <>
        <NavBar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <NavBar />
        <SignUp />
      </>
    ),
  },
]);
