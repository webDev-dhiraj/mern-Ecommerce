import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyPayment = async () => {
    try {
      if (!token) {
        console.log("Token missing, skipping verifyPayment");
        toast.error("Token missing, cannot verify payment.");
        return;
      }

      const response = await axios.get(backendUrl + "/api/order/verifyStripe", {
        params: { success, orderId },
        headers: { token },
      });
      console.log(" response data:", response.data);

      if (response.data.success) {
        setCartItems({});
        // console.log("Payment Successful!");

        toast.success("Payment Successful!");
        navigate("/orders");
      } else {
        toast.error("Payment Failed!");
        navigate("/cart");
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, [token, navigate]);
  return <div></div>;
};
export default Verify;
