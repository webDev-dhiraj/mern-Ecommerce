import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="group block text-gray-700 hover:text-black transition">
      <div className="overflow-hidden rounded-xl shadow-sm hover:shadow-md bg-white">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium truncate">{name}</p>
      <p className="text-sm font-semibold text-indigo-600">
        {currency} {price}
      </p>
    </Link>
  );
}

export default ProductItem;

