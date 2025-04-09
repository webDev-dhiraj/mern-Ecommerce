import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import Shoping from "../assets/Shoping.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setShowDropdown(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between py-5 px-4 sm:px-10 font-medium shadow-sm bg-white sticky top-0 z-30">
      {/*  Logo + Name (Clickable) */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={Shoping}
          className="w-14 h-14 object-cover rounded-full"
          alt="logo"
        />
        <span className="font-bold text-2xl text-gray-800 hidden sm:inline">
          <span className="text-blue-600">SHOP</span>ZONE
        </span>
      </div>

      {/*  Navbar Links */}
      <ul className="hidden sm:flex gap-6 text-base text-gray-700 font-semibold">
        <NavLink to="/" className="hover:text-black transition">
          HOME
        </NavLink>
        <NavLink to="/collection" className="hover:text-black transition">
          COLLECTION
        </NavLink>
        <NavLink to="/about" className="hover:text-black transition">
          ABOUT
        </NavLink>
        <NavLink to="/contact" className="hover:text-black transition">
          CONTACT
        </NavLink>
      </ul>

      {/*  Right Side Icons */}
      <div className="flex items-center gap-5">
        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />

        {/* Profile Icon with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            onClick={() => {
              if (token) {
                setShowDropdown((prev) => !prev);
              } else {
                navigate("/login");
              }
            }}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
          />
          {token && showDropdown && (
            <div className="absolute right-0 top-7 w-40 bg-white shadow-lg rounded-md p-3 z-20 transition-all">
              <p
                className="py-1 px-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  console.log("Profile icon clicked");
                  navigate("/profile");
                  setShowDropdown(false);
                }}
              >
                My Profile
              </p>
              <p
                className="py-1 px-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  navigate("/orders");
                  setShowDropdown(false);
                }}
              >
                Orders
              </p>
              <p
                className="py-1 px-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          {getCartCount() > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {getCartCount() > 99 ? "99+" : getCartCount()}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
