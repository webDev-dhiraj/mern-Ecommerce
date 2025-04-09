import React from "react";

function NewsletterBox() {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-12 px-4 sm:px-8">
      {" "}
      {/* <-- Reduced margin top */}
      <div className="max-w-screen-xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          Get <span className="text-indigo-600">20% Off</span> On Your First
          Order
        </h2>
        <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
          Join our newsletter and be the first to know about exclusive deals,
          new arrivals, and tips & tricks.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-sm shadow-sm"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-md transition-all duration-200"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-400">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

export default NewsletterBox;
