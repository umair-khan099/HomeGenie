import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/SignUp";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import ForgetPassword from "../features/auth/pages/ForgetPassword";

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
  {
    path: "/verify-otp",
    element: (
      <>
        <NavBar />
        <VerifyOtp />
      </>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <>
        <NavBar />
        <ForgetPassword />
      </>
    ),
  },
]);
