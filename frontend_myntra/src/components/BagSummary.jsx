import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BagSummary = () => {
  console.log("im bag summary");

  const [bagSummary, setBagSummary] = useState({
    totalItem: 0,
    totalMRP: 0,
    totalDiscount: 0,
    finalPayment: 0,
  });

  const bagItems = useSelector((store) => store.bagItems);

  useEffect(() => {
    console.log("i am useEffect of bag summary");

    let totalDiscount = 0;
    let totalMRP = 0;
    bagItems.map((item) => {
      totalMRP += item.original_price;
      totalDiscount += item.original_price - item.current_price;
    });

    setBagSummary({
      totalItem: bagItems.length,
      totalMRP,
      totalDiscount,
      finalPayment: bagItems.length == 0 ? 0 : totalMRP - totalDiscount + 99,
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
