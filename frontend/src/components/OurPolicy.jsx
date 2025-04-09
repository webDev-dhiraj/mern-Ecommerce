import React from "react";
import { assets } from "../assets/assets";
function OurPolicy() {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "We offer hassle-free exchange policy",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "We provide 7 days free return policy",
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "We provide 24/7 customer support",
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 transition-transform hover:-translate-y-1 hover:shadow-xl duration-300"
          >
            <img
              src={policy.icon}
              alt={policy.title}
              className="w-14 h-14 mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {policy.title}
            </h3>
            <p className="text-gray-500 text-sm">{policy.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurPolicy;
