import { IoMdPerson } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { TbLogin } from "react-icons/tb";
import { BsFillSignIntersectionFill } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";
import { bagItemsActions, isAdminActions } from "../store";

const Header = ({ isLoggedIn, setLogin }) => {
  const bagItemIds = useSelector((store) => store.bagItemIds);
  const isAdmin = useSelector((store) => store.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const result = await axios.get(
          "http://localhost:3030/bag",
          { withCredentials: true },
          { signal },
        );
        console.log(result.data);
        dispatch(
          bagItemsActions.bagLoadedFromServer({ bagItemIds: result.data }),
        );
      } catch (err) {
        if (err.response?.status === 401) {
          dispatch(bagItemsActions.bagLoadedFromServer({ bagItemIds: [] }));
        }
      }
    })();

    return () => {
      console.log("Clean UP!!");
      controller.abort();
    };
  }, []);

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3030/logout",
      {},
      { withCredentials: true },
    );
    dispatch(isAdminActions.setAdminState(false));
    setLogin(false);
  };

  return (
    <>
      <header>
        <div className="logo_container">
          <Link to="/">
            <img
              className="myntra_home"
              src="../images/myntra_logo.webp"
              alt="Myntra Home"
            />
          </Link>
        </div>

        <nav className="nav_bar">
          {isAdmin && (
            <>
              <Link to="/admin/add-product">Add Product</Link>
              <Link to="/admin/modify-products">Modify Inventory</Link>
            </>
          )}
          {!isAdmin && (
            <>
              <a href="#">Men</a>
              <a href="#">Women</a>
              <a href="#">Kids</a>
              <a href="#">Home & Living</a>
              <a href="#">Beauty</a>
              <a href="#">
                Studio <sup>New</sup>
              </a>
            </>
          )}
        </nav>
        <div className="search_bar">
          <span className="material-symbols-outlined search_icon">
            <IoSearch />
          </span>
          <input
            className="search_input"
            placeholder="Search for products, brands and more"
          />
        </div>
        <div className="action_bar">
          {!isLoggedIn && (
            <>
              <Link
                to="/signup"
                className="action_container text-decoration-none text-black"
              >
                <div className="action_container">
                  <BsFillSignIntersectionFill />
                  <span className="action_name">Sign up</span>
                </div>
              </Link>
              <Link
                to="/login"
                className="action_container text-decoration-none text-black"
              >
                <div className="action_container">
                  <TbLogin />
                  <span className="action_name">Login</span>
                </div>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <button
                className="action_container btn btn-link text-black text-decoration-none p-0 border-0 shadow-none"
                onClick={handleLogout}
              >
                <div className="action_container">
                  <TbLogin />
                  <span className="action_name">Logout</span>
                </div>
              </button>
            </>
          )}

          <div className="action_container">
            <IoMdPerson />
            <span className="action_name">Profile</span>
          </div>

          <div className="action_container">
            <FaRegHeart />
            <span className="action_name">Wishlist</span>
          </div>

          <Link
            to="/bag"
            className="action_container text-decoration-none text-black"
          >
            <span className="position-relative">
              <BsHandbag />
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {bagItemIds.length}
              </span>
            </span>
            <span className="fw-bold pt-0px" style={{ fontSize: "x-small" }}>
              Bag
            </span>
            {/* <span className="bag-item-count">{bagItems.length}</span> */}
          </Link>
        </div>
      </header>
    </>
  );
};
export default Header;
