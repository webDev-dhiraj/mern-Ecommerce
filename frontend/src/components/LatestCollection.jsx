import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products);
  }, [products]);

  return (
    <div className="my-10 sm:my-8">
      <div className="text-center py-6 sm:py-4">
        <h2 className="text-4xl font-bold">
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        </h2>
        <p className="w-11/12 sm:w-3/4 m-auto text-sm sm:text-base text-gray-600 mt-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat facilis sunt maxime accusantium dignissimos quam nisi laborum nemo voluptates tempore, voluptas, rerum illo optio corporis, quas qui corrupti non ut!
        </p>
      </div>

      {/* Rendering Product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
        {latestProducts.map((item, index) => (
          <div key={index} className="transform hover:scale-105 transition duration-300">
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;

