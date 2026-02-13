import { IoMdPerson } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { TbLogin } from "react-icons/tb";

const Header = () => {
  const bagItemIds = useSelector((store) => store.bagItemIds);
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
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">
            Studio <sup>New</sup>
          </a>
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
          <Link
            to="/login"
            className="action_container text-decoration-none text-black"
          >
            <div className="action_container">
              <TbLogin />
              <span className="action_name">Login</span>
            </div>
          </Link>

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
