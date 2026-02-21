import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeItem from "../components/HomeItem";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { bagItemsActions, itemListActions, isAdminActions } from "../store";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const bagItemIds = useSelector((store) => store.bagItemIds);
  const itemList = useSelector((store) => store.itemList);

  // Restore isAdmin state on page refresh if token exists
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const result = await axios.get(
          "http://localhost:3030/admin/verify",
          { withCredentials: true },
          { signal },
        );
        // If request succeeds, user is admin
        dispatch(isAdminActions.setAdminState(true));
      } catch (err) {
        // If request fails (401 or other error), user is not admin
        dispatch(isAdminActions.setAdminState(false));
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default App;
