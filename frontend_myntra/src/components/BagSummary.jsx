import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const BagSummary = () => {
  console.log("im bag summary");
  const navigate = useNavigate();

  const [bagSummary, setBagSummary] = useState({
    totalItem: 0,
    totalMRP: 0,
    totalDiscount: 0,
    finalPayment: 0,
  });

  const bagItemIds = useSelector((store) => store.bagItemIds);
  const [bagItems, setBagItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const result = await axios.get(
          "https://myntra-clone-ultg.onrender.com/bag/items",
          { withCredentials: true },
          { signal },
        );
        console.log("i got the Bag in BagSummary.jsx..", result.data);
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

  useEffect(() => {
    console.log("i am useEffect of bag summary");

    let totalDiscount = 0;
    let totalMRP = 0;
    bagItems.map((item) => {
      totalMRP += item.MRP;
      totalDiscount += item.MRP - item.actualPrice;
    });

    setBagSummary({
      totalItem: bagItemIds.length,
      totalMRP,
      totalDiscount,
      finalPayment: bagItemIds.length == 0 ? 0 : totalMRP - totalDiscount + 99,
    });
  }, [bagItems]);

  return (
    <>
      <div className="bag-details-container">
        <div className="price-header">
          PRICE DETAILS ({bagSummary.totalItem} Items){" "}
        </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{bagSummary.totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{bagSummary.totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{bagSummary.finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order">
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </>
  );
};
export default BagSummary;
