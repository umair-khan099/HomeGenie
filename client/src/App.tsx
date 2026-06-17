import { RouterProvider } from "react-router-dom";
import { routes } from "./app/router";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";

const App = () => {
  const token = useSelector((store: RootState) => store.auth.token);
  console.log(token);
  return (
    <div className=" bg-black text-white h-screen">
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
};

export default App;
