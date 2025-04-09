import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

function About() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Section Title with Gradient Text */}
      <div className="text-center pt-16 pb-8">
        <Title 
          text1="ABOUT" 
          text2="US" 
          customClass="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-pink-500"
        />
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          We're passionate about making your experience amazing.
        </p>
      </div>

      {/* About Content */}
      <div className="my-16 flex flex-col md:flex-row gap-12 items-center">
        <div className="relative">
          <img
            className="w-full md:max-w-[450px] rounded-lg shadow-lg object-cover transform hover:scale-105 transition-transform duration-500"
            src={assets.about_img}
            alt="About Us"
          />
        </div>

        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos temporibus ex deleniti aut at,
            sunt soluta! Eum sit, in esse magnam harum culpa, modi, quibusdam impedit reprehenderit illo
            odit itaque.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo iusto incidunt eveniet pariatur
            officiis commodi sint aliquid, inventore quos voluptates eligendi vitae molestiae. Eveniet
            ullam, rerum necessitatibus ipsa voluptate doloribus.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Mission</h3>
            <p>
              Our Mission Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis facere maxime
              dolores sint odit similique necessitatibus ipsum molestias, eum voluptas natus, deserunt,
              facilis ducimus iste vitae quas blanditiis maiores voluptatum.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center py-6">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {/* Card 1 */}
        <div className="flex flex-col border rounded-xl p-6 sm:p-10 hover:shadow-xl transition-all duration-500 transform hover:scale-105">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Quality Assurance</h4>
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde in temporibus voluptate
            possimus. Eligendi, quis? Nobis minima soluta esse! Eaque, illum? Perspiciatis id magnam culpa
            laudantium sequi et corrupti quaerat!
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col border rounded-xl p-6 sm:p-10 hover:shadow-xl transition-all duration-500 transform hover:scale-105">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Convenience</h4>
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde in temporibus voluptate
            possimus. Eligendi, quis? Nobis minima soluta esse! Eaque, illum? Perspiciatis id magnam culpa
            laudantium sequi et corrupti quaerat!
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col border rounded-xl p-6 sm:p-10 hover:shadow-xl transition-all duration-500 transform hover:scale-105">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Exceptional Customer Service</h4>
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde in temporibus voluptate
            possimus. Eligendi, quis? Nobis minima soluta esse! Eaque, illum? Perspiciatis id magnam culpa
            laudantium sequi et corrupti quaerat!
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
}

export default About;
