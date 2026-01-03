import { useDispatch, useSelector } from "react-redux";
import { bagItemsActions } from "../store";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddtoBag = () => {
    dispatch(bagItemsActions.addToBag({ item }));
  };

  const bagItems = useSelector((Store) => Store.bagItems);

  return (
    <>
      <div className="item-container">
        <img className="item-image" src={item.image} alt="item image" />
        <div className="rating">
          {item.rating.stars} ⭐ | {item.rating.count}
        </div>
        <div className="company-name">{item.company}</div>
        <div className="item-name">{item.item_name}</div>
        <div className="price">
          <span className="current-price">Rs {item.current_price}</span>
          <span className="original-price">Rs {item.original_price}</span>
          <span className="discount">({item.discount_percentage}% OFF)</span>
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
