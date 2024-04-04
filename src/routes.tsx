import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import SetPassword from "./pages/SetPassword";
import Error404 from "./pages/Error-404";
import Test from "./pages/Test";
import UploadProject from "./pages/UploadProject";

const router = createBrowserRouter([
  {
    path: "home",
    element: <Home />,
  },
  { path: "project/upload", element: <UploadProject /> },
  { path: "auth/login", element: <Login /> },
  { path: "auth/new", element: <Signup /> },
  { path: "auth/reset", element: <Reset /> },
  { path: "auth/set-password", element: <SetPassword /> },
  { path: "*", element: <Error404 /> },
  { path: "/test", element: <Test /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
