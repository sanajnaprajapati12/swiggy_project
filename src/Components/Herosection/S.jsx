import React from "react";

const ResponsiveCard = () => {
  return (
    <div className="p-4">
      {/* container wrapper */}
      <div className="container-normal w-full max-w-lg rounded-2xl border p-4 shadow-md bg-white">
        {/* image */}
        <img
          src="https://source.unsplash.com/random/600x400/?food"
          alt="Food"
          className="w-full h-40 object-cover rounded-xl mb-4"
        />

        {/* text content */}
        <div className="space-y-2">
          <h2 className="font-bold text-lg @sm:text-xl @md:text-2xl @lg:text-3xl">
            Delicious Pizza
          </h2>
          <p className="text-gray-600 text-sm @sm:text-base @md:text-lg">
            Freshly baked pizza topped with mozzarella, olives, and basil.
          </p>
        </div>

        {/* button */}
        <button className="mt-4 w-full rounded-xl bg-blue-500 py-2 text-white font-semibold hover:bg-blue-600 transition-all @sm:py-3 @md:text-lg">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ResponsiveCard;
