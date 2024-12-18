import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './pages/HomePage.jsx'
import HomePage from "./pages/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:'/movie/:id',
    element: <MovieDetail/>
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
);
