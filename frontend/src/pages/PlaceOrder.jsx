import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method.toUpperCase(),
      };

      switch (method) {
        case "cod":
          const codResponse = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (codResponse.data.success) {
            toast.success("Payment Successful 🎉");
            setCartItems({});
            localStorage.removeItem("cart");
            navigate("/orders");
          } else {
            toast.error(codResponse.data.message);
          }
          break;

        case "stripe":
          const stripeResponse = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            {
              headers: {
                token,
                origin: window.location.origin,
              },
            }
          );

          if (stripeResponse.data.success) {
            const { session_url } = stripeResponse.data;
            window.location.replace(session_url);
          } else {
            toast.error(stripeResponse.data.message);
          }
          break;

        case "razorpay":
          // Placeholder for Razorpay logic
          toast.info("Razorpay integration coming soon 🛠️");
          break;

        default:
          toast.error("Invalid payment method selected.");
          break;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const inputStyle =
    "border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-lg py-2 px-4 w-full transition duration-300";

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT SIDE: Delivery Info */}
      <div className="w-full sm:max-w-[480px] p-6 border rounded-xl shadow-sm bg-white">
        <div className="text-xl sm:text-2xl mb-6">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              className={inputStyle}
              type="text"
              placeholder="First name"
            />
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              className={inputStyle}
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            required
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className={inputStyle}
            type="email"
            placeholder="Email"
          />
          <input
            required
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            className={inputStyle}
            type="text"
            placeholder="Street"
          />
          <div className="flex gap-3">
            <input
              required
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              className={inputStyle}
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              className={inputStyle}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              className={inputStyle}
              type="number"
              placeholder="Zipcode"
            />
            <input
              required
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              className={inputStyle}
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            className={inputStyle}
            type="number"
            placeholder="Phone"
          />
        </div>
      </div>

      {/* RIGHT SIDE: Cart + Payment */}
      <div className="flex flex-col gap-6 w-full">
        <div className="mt-4 min-w-80 p-6 border rounded-xl shadow-sm bg-white">
          <CartTotal />
        </div>

        <div className="w-full border rounded-xl p-6 shadow-sm bg-white">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex flex-col sm:flex-col gap-4 mt-4">
            {/* Stripe */}
            <PaymentOption
              selected={method === "stripe"}
              onClick={() => setMethod("stripe")}
              logo={assets.stripe_logo}
              label="Stripe"
            />
            {/* Razorpay */}
            <PaymentOption
              selected={method === "razorpay"}
              onClick={() => setMethod("razorpay")}
              logo={assets.razorpay_logo}
              label="Razorpay"
            />
            {/* COD */}
            <PaymentOption
              selected={method === "cod"}
              onClick={() => setMethod("cod")}
              label="CASH ON DELIVERY"
            />
          </div>

          <div className="w-full text-end mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition duration-300 text-white font-semibold rounded-lg shadow-lg px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function PaymentOption({ selected, onClick, logo, label }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 border-2 rounded-lg p-3 px-4 cursor-pointer transition duration-300 w-full sm:w-auto ${
        selected ? "border-emerald-500 bg-emerald-50" : "hover:border-gray-400"
      }`}
    >
      <div
        className={`min-w-4 h-4 border-2 rounded-full ${
          selected ? "bg-emerald-500 border-emerald-500" : "border-gray-400"
        }`}
      ></div>
      {logo ? (
        <img src={logo} alt={label} className="h-6 mx-4" />
      ) : (
        <p className="text-gray-600 text-sm font-medium mx-4">{label}</p>
      )}
    </div>
  );
}

export default PlaceOrder;
