import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);
const App = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};

export default App;
