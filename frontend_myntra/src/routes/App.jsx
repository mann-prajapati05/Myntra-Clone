import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeItem from "../components/HomeItem";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { bagItemsActions, itemListActions, isAdminActions } from "../store";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setLogin] = useState(false);

  // Restore isAdmin state on page refresh if token exists
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        console.log("auth");
        const result = await axios.get(
          "http://localhost:3030/verify",
          { withCredentials: true },
          { signal },
        );
        const { userType } = result.data;
        console.log("type", userType);
        if (userType === "admin") {
          dispatch(isAdminActions.setAdminState(true));
        }
        setLogin(true);
      } catch (err) {
        dispatch(isAdminActions.setAdminState(false));
        setLogin(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setLogin={setLogin} />
      <Outlet context={{ setLogin }}></Outlet>
      <Footer />
    </>
  );
}

export default App;
