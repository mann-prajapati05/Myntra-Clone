import { useDispatch } from "react-redux";
import { bagItemsActions } from "../store";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
axios.defaults.withCredentials = true;

const BagItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromBag = async (e) => {
    const result = await axios.delete(
      `https://myntra-clone-ultg.onrender.com/bag/${item._id}`,
    );
    console.log(result.data);
    dispatch(bagItemsActions.removeFromBag({ itemId: item._id }));
  };
  return (
    <>
      <div className="bag-item-container">
        <div className="item-left-part">
          <img className="bag-item-img" src={item.photo} />
        </div>
        <div className="item-right-part">
          <div className="company">{item.title}</div>
          <div className="item-name">{item.description}</div>
          <div className="price-container">
            <span className="current-price">Rs {item.actualPrice}</span>
            <span className="original-price">Rs {item.MRP}</span>
            <span className="discount-percentage">({item.discounts}% OFF)</span>
          </div>
          <div className="return-period">
            <span className="return-period-days">
              {item.return_period} days
            </span>{" "}
            return available
          </div>
          <div className="delivery-details">
            Delivery by
            <span className="delivery-details-days">{item.delivery_date}</span>
          </div>
        </div>

        <div className="remove-from-cart">
          <span onClick={(e) => handleRemoveFromBag(e)}>
            <RxCross2 />
          </span>
        </div>
      </div>
    </>
  );
};
export default BagItem;
