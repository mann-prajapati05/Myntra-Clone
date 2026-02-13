import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeItem from "../components/HomeItem";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { bagItemsActions, itemListActions } from "../store";
import axios from "axios";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const bagItemIds = useSelector((store) => store.bagItemIds);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const result = await axios.get(
        "http://localhost:3030",
        { withCredentials: true },
        { signal },
      );
      console.log(result);
      dispatch(itemListActions.itemsFromServer({ items: result.data }));
    })();

    return () => {
      console.log("Clean UP!!");
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const result = await axios.get(
        "http://localhost:3030/bag",
        { withCredentials: true },
        { signal },
      );
      console.log(result.data);
      dispatch(
        bagItemsActions.bagLoadedFromServer({ bagItemIds: result.data }),
      );
    })();

    return () => {
      console.log("Clean UP!!");
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
