import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

function Contact() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Section Title */}
      <div className="text-center pt-12 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          We'd love to hear from you!
        </p>
      </div>

      {/* Contact Content */}
      <div className="my-16 flex flex-col md:flex-row gap-12 items-center">
        <img
          src={assets.contact_img}
          alt="contact"
          className="w-full max-w-[500px] rounded-lg shadow-lg object-cover"
        />

        <div className="flex flex-col gap-6 max-w-xl">
          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-1">Our Store</h3>
            <p className="text-gray-600">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-1">Get in Touch</h3>
            <p className="text-gray-600">
              Tel: (415) 555-0132 <br />
              Email: <a href="mailto:dhiru@forever.com" className="underline">dhiru@forever.com</a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-1">Careers at Forever</h3>
            <p className="text-gray-600">
              Learn more about our team and job openings.
            </p>
            <button className="mt-3 bg-green-700 text-white px-6 py-2 text-sm rounded hover:bg-green-800 transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
}

export default Contact;
