import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: "",
    children: [{ path: "auth/login", element: <Login /> }],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
