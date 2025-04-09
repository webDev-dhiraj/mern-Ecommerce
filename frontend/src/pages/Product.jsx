import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(" ");
  const [size, setSize] = useState(""); 
  const [showError, setShowError] = useState(false); 

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 px-4 sm:px-8 lg:px-20 transition-opacity ease-in duration-500 opacity-100 bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] min-h-screen">

      {/* Product Data */}
      <div className="flex gap-12 flex-col lg:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col lg:flex-row-reverse gap-4">
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-scroll justify-start lg:w-[20%] w-full gap-3 scrollbar-thin scrollbar-thumb-gray-300">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt=""
                className="rounded-xl w-24 h-24 object-cover border cursor-pointer hover:scale-105 hover:ring-2 hover:ring-orange-400 transition-all duration-200"
              />
            ))}
          </div>
          <div className="w-full lg:w-[80%]">
            <img
              src={image}
              alt=""
              className="w-full h-[400px] object-contain bg-white rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-xl">
          <h1 className="font-semibold text-3xl mb-2 text-gray-800 tracking-tight">{productData.name}</h1>

          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className="pl-2 text-gray-600 text-sm">(122 Reviews)</p>
          </div>

          <p className="text-3xl font-bold text-orange-600">
            {currency} {productData.price}
          </p>

          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            {productData.description}
          </p>

          {/* Size Selector */}
          <div className="flex flex-col gap-3 mt-8">
            <p className="text-base font-medium text-gray-700">Select Size:</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => {
                    setSize(item);
                    setShowError(false); 
                  }}
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 transform hover:scale-105 ${
                    item === size
                      ? "bg-orange-500 text-white border-orange-500 shadow-md"
                      : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {showError && (
              <p className="text-red-600 text-sm font-medium">Please select a size!</p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              if (!size.trim()) {
                setShowError(true); 
                return;
              }
              addToCart(productData._id, size);
            }}
            className={`mt-6 px-8 py-3 rounded-lg shadow-md text-sm font-medium transition-all duration-200 ${
              size ? "bg-black hover:bg-gray-800 text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            🛒 ADD TO CART
          </button>

          <hr className="mt-8" />
          <div className="text-sm text-gray-600 mt-4 space-y-1">
            <p> 100% Original product.</p>
            <p> Cash on delivery available.</p>
            <p> 7-day return & exchange policy.</p>
          </div>
        </div>
      </div>

      {/* Description & Review */}
      <div className="mt-20">
        <div className="flex border-b">
          <button className="px-6 py-3 font-medium bg-white text-gray-700 text-sm border-t border-l border-r rounded-t-lg">
            Description
          </button>
          <button className="px-6 py-3 text-sm text-gray-500 hover:text-gray-700">
            Reviews (122)
          </button>
        </div>
        <div className="border p-6 text-sm text-gray-600 space-y-2 bg-white rounded-b-lg">
          <p>An e-commerce website is an online platform that facilitates the buying of goods.</p>
          <p>It typically displays products with detailed information and allows transactions.</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
