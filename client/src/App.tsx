import React from "react";
import Button from "@mui/material/Button";
import { RouterProvider } from "react-router-dom";
import { routes } from "./app/router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className=" bg-black text-white h-screen">
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
};

export default App;
