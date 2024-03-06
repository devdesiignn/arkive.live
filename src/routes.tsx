import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: "",
    children: [
      { path: "auth/login", element: <Login /> },
      { path: "auth/new", element: <Signup /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
