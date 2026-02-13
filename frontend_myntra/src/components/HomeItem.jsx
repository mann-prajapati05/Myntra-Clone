import { useDispatch, useSelector } from "react-redux";
import { bagItemsActions } from "../store";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddtoBag = async () => {
    const result = await axios.post(`http://localhost:3030/bag/${item._id}`);
    console.log(result.data);
    dispatch(bagItemsActions.addToBag({ itemId: item._id }));
  };

  const bagItems = useSelector((Store) => Store.bagItems);

  return (
    <>
      <div className="item-container">
        <img className="item-image" src={item.photo} alt="item image" />
        <div className="rating">
          {item.rating} ⭐ | {item.reviewNumbers}
        </div>
        <div className="company-name">{item.title}</div>
        <div className="item-name">{item.description}</div>
        <div className="price">
          <span className="current-price">Rs {item.actualPrice}</span>
          <span className="original-price">Rs {item.MRP}</span>
          <span className="discount">({item.discounts}% OFF)</span>
        </div>
        {!bagItems.includes(item) ? (
          <button
            className="btn-add-bag text-white fw-bold"
            onClick={handleAddtoBag}
          >
            <BsFillHandbagFill />
            <span className="m-2">ADD TO BAG</span>
          </button>
        ) : (
          <Link to="/bag">
            <button className="btn-add-bag text-white fw-bold">
              <span className="m-2">GO TO BAG</span>
              <FaArrowRightLong />
            </button>
          </Link>
        )}
      </div>
    </>
  );
};
export default HomeItem;
