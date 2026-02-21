import { useDispatch, useSelector } from "react-redux";
import { bagItemsActions } from "../store";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

import axios from "axios";
axios.defaults.withCredentials = true;

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddtoBag = async () => {
    try {
      const result = await axios.post(`http://localhost:3030/bag/${item._id}`);
      console.log(result.data);
      dispatch(bagItemsActions.addToBag({ itemId: item._id }));
    } catch (err) {
      navigate("/login");
    }
  };
  const handleDelete = async (e, pid) => {
    try {
      console.log("processing remove product..");
      await axios.delete(`http://localhost:3030/admin/remove-product/${pid}`);
      console.log("removed succesfully..");
    } catch (err) {
      console.log("Failed to remove product..", err);
      navigate("/");
    }
  };
  const handleEdit = async (pid) => {
    navigate(`/admin/add-product/${pid}`);
  };

  const bagItemIds = useSelector((Store) => Store.bagItemIds);
  const isAdmin = useSelector((store) => store.isAdmin);
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
        {!isAdmin && (
          <>
            {!bagItemIds.includes(item._id) ? (
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
          </>
        )}
        {isAdmin && (
          <>
            <button
              className="btn-add-bag text-white fw-bold"
              onClick={() => handleEdit(item._id)}
            >
              <RiEdit2Fill />
              <span className="m-2">Edit Details</span>
            </button>
            <button
              className="btn-add-bag text-white fw-bold"
              onClick={(e) => handleDelete(e, item._id)}
            >
              <MdDelete />
              <span className="m-2">Delete Details</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default HomeItem;
