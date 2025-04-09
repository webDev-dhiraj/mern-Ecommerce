import React, { useContext, useCallback } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const handleQuantityChange = useCallback(
    (productId, size, quantity) => {
      if (!quantity || typeof quantity !== "number" || isNaN(quantity)) return;
      updateQuantity(productId, size, quantity);
    },
    [updateQuantity]
  );

  if (!products.length)
    return <p className="text-center text-xl my-10 text-gray-600">Loading...</p>;

  return (
    <div className="text-2xl mb-3 px-2 sm:px-6 bg-slate-50 min-h-screen">
      <Title text1="YOUR" text2="CART" />

      <div>
        {Object.entries(cartItems).flatMap(([productId, sizes]) =>
          Object.entries(sizes)
            .filter(([size, quantity]) => ["S", "M", "L", "XL", "XXL"].includes(size) && quantity > 0)
            .map(([size, quantity]) => {
              const productData = products.find((product) => product._id === productId);
              if (!productData) return null;

              return (
                <div
                  key={`${productId}-${size}`}
                  className="py-4 px-2 sm:px-4 border-t border-b text-gray-800 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  {/* Product Info */}
                  <div className="flex items-start gap-4 sm:gap-6">
                    <img
                      src={productData.image?.[0] || assets.placeholder}
                      alt="Product"
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded shadow-md"
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-semibold line-clamp-2">
                        {productData.name || "Unknown Product"}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-green-600 font-semibold text-sm sm:text-base">
                          {currency} {productData.price || "N/A"}
                        </p>
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-sm border bg-green-100 text-green-800 rounded">
                          {size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <input
                    onChange={(e) =>
                      handleQuantityChange(productId, size, Number(e.target.value))
                    }
                    className="border border-green-400 w-12 sm:w-16 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-600 transition text-sm"
                    type="number"
                    min={1}
                    value={quantity}
                  />

                  {/* Delete Button */}
                  <img
                    onClick={() => updateQuantity(productId, size, 0)}
                    className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 active:scale-90 transition-transform"
                    src={assets.bin_icon}
                    alt="Delete"
                  />
                </div>
              );
            })
        )}
      </div>

      {/* Checkout Section */}
      <div className="flex justify-end my-16">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-green-700 text-white text-sm font-medium mt-6 px-8 py-3 rounded hover:bg-green-800 active:scale-95 transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
