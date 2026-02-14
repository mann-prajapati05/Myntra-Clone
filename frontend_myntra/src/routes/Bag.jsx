import Footer from "../components/Footer";
import Header from "../components/Header";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Bag = () => {
  const dispatch = useDispatch();
  const bagItemIds = useSelector((store) => store.bagItemIds);
  const [bagItems, setBagItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const result = await axios.get(
          "http://localhost:3030/bag/items",
          { withCredentials: true },
          { signal },
        );
        console.log("i got the Bag in Bag.jsx..", result.data);
        setBagItems(result.data);
      } catch (err) {
        navigate("/login");
      }
    })();

    return () => {
      console.log("bro ...Clean UP!!");
      controller.abort();
    };
  }, [bagItemIds]);

  return (
    <>
      <main>
        <div className="bag-page">
          <div className="bag-items-container">
            {bagItems.map((item) => (
              <BagItem key={item._id} item={item}></BagItem>
            ))}
          </div>
          <div className="bag-summary">
            <BagSummary></BagSummary>
          </div>
        </div>
      </main>
    </>
  );
};
export default Bag;
