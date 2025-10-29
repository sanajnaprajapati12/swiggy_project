import React, { useEffect, useState } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Dummy favorite data
    const dummyFavorites = [
      {
        _id: "f1",
        name: "Pizza House",
        category: "Italian",
        rating: 4.5,
        priceLevel: "$$",
        image:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/mvscwfkbjf7qqzchsm5b",
      },
      {
        _id: "f2",
        name: "Burger Hub",
        category: "Fast Food",
        rating: 4.2,
        priceLevel: "$",
        image:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/6/28/70ac135b-3c1c-48d7-adc3-e3f0ecb7d92f_image4580c5493637c4cb8a56950706e4a5281.JPG",
      },
      {
        _id: "f3",
        name: "Sushi World",
        category: "Japanese",
        rating: 4.8,
        priceLevel: "$$$",
        image:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/11/15/a7b57969-83b7-46f8-9742-67e8e9d52eba_156145.jpg",
      },
    ];

    setFavorites(dummyFavorites);
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 py-6">
          No favorites added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={fav.image}
                alt={fav.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg md:text-xl mb-1">
                  {fav.name}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-1">
                  Category: {fav.category}
                </p>
                <p className="text-gray-600 text-sm md:text-base mb-1">
                  Rating: {fav.rating} ⭐
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  Price: {fav.priceLevel}
                </p>
                <button
                  className="mt-3 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setFavorites(
                      favorites.filter((item) => item._id !== fav._id)
                    );
                  }}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
