import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import SetPassword from "./pages/SetPassword";
import Error404 from "./pages/Error-404";

const router = createBrowserRouter([
  {
    path: "/",
    element: "",
    children: [
      { path: "auth/login", element: <Login /> },
      { path: "auth/new", element: <Signup /> },
      { path: "auth/reset", element: <Reset /> },
      { path: "auth/set-password", element: <SetPassword /> },
      { path: "*", element: <Error404 /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
