import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Forgot-password";

const router = createBrowserRouter([
  {
    path: "/",
    element: "",
    children: [
      { path: "auth/login", element: <Login /> },
      { path: "auth/new", element: <Signup /> },
      { path: "auth/reset", element: <Reset /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
