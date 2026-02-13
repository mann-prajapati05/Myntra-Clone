import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bag from "./routes/Bag.jsx";
import Home from "./routes/Home.jsx";
import { Provider } from "react-redux";
import { myStore } from "./store/index.js";
import Login from "./routes/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bag",
        element: <Bag />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
