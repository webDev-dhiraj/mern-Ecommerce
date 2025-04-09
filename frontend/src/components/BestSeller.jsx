import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

function BestSellers() {
  const { products } = useContext(ShopContext);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    setBestsellers(products);
  }, [products]);

  return (
    <div className="my-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-4xl font-extrabold text-gray-800 tracking-wide relative inline-block after:content-[''] after:block after:h-1 after:w-2/4 after:bg-indigo-500 after:mx-auto after:mt-2">
          <Title text1={'BEST'} text2={'SELLERS'}/>
         
        </h2>
        <p className="w-4/5 sm:w-3/5 mx-auto mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
          Discover the most loved products by our customers, curated for quality and style.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {bestsellers.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
