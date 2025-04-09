import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  //  Load cart from localStorage on first render
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Add to Cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size, quantity: 1 },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  //  Update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    if (!size?.trim()) {
      toast.error("Invalid size selected!");
      return;
    }

    let cartData = structuredClone(cartItems) || {};

    if (quantity > 0) {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    } else {
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
      }
    }

    setCartItems(cartData);

    if (token) {
      try {
        const res = await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } },
          { withCredentials: true }
        );

        if (res.data.success) {
          setCartItems(res.data.cartData);
          toast.success("Cart updated successfully!");
        } else {
          toast.error("Failed to update cart!");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    }
  };

  //  Get Cart Count
  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += Number(cartItems[itemId][size]) || 0;
      }
    }
    return total;
  };
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (product) => product._id.toString() === itemId.toString()
      );

      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        const validSizes = ["S", "M", "L", "XL", "XXL"]; // jo bhi sizes ho
        if (!validSizes.includes(size)) continue; // ❗skip invalid keys

        const qty = cartItems[itemId][size];
        if (typeof qty !== "number") continue; // ❗skip null or string ids

        totalAmount += (itemInfo.price || 0) * qty;
      }
    }

    return totalAmount;
  };

  //  Fetch Products
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data?.success && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  // Fetch User Cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (
        response.data?.success &&
        typeof response.data.cartData === "object"
      ) {
        setCartItems(response.data.cartData);
      } else {
        setCartItems({});
      }
    } catch (error) {
      toast.error(error.message);
      setCartItems({});
    }
  };

  //  On First Mount
  useEffect(() => {
    getProductsData();
  }, []);

  //  When Token changes
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

  //  Save cart to localStorage on update
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Context Value
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
