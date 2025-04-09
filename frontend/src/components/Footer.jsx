import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12 text-gray-700 text-sm">
        {/* Logo & Description */}
        <div>
          <span className="font-bold text-2xl text-gray-800 hidden sm:inline">
            <span className="text-blue-600">SHOP</span>ZONE
          </span>
          <p className="max-w-sm text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            quasi eveniet vitae corporis quisquam praesentium voluptate.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-indigo-600 transition">Home</li>
            <li className="hover:text-indigo-600 transition">About Us</li>
            <li className="hover:text-indigo-600 transition">Delivery</li>
            <li className="hover:text-indigo-600 transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Get in Touch
          </h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-indigo-600 transition">
              +1-212-456-7890
            </li>
            <li className="hover:text-indigo-600 transition">
              dhiraj@shopzone.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-6">
        <p className="text-center py-6 text-xs text-gray-500">
          © 2024 dhiraj@shopzone.com — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
