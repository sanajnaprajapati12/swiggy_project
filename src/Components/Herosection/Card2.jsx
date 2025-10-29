import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const groceryItems = [
  {
    name: "Fresh Vegetables",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/43e3c412-4ca9-4894-82ba-24b69da80aa6_06c0d2a9-804c-4bf1-8725-7ebd234e144a",
  },
  {
    name: "Fresh Fruits",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/a1493d81-f21e-415f-9875-f78383590fc2_9f3f0f68-4fbe-40f6-8f5d-5472a03469bd",
  },
  {
    name: "Dairy, Bread and Eggs",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/6dea6676-ce07-45e6-b60c-a099c01c5462_6d33297a-5828-48ff-aa2a-c052ae97669e",
  },
  {
    name: "Rice, Atta and Dals",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/097900ca-5d2d-4bb0-8e54-aede1e58dfd8_eab3796c-ac17-48fd-bfc7-6356c6f89783",
  },
  {
    name: "Masalas and Dry Fruits",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/64714677-e6b6-41c1-b533-6644d43e55f7_76ef86af-0483-41a5-8387-37901bf4ca6a",
  },
  {
    name: "Oils and Ghee",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/8e48ee13-3b51-49ea-b765-5cf3e7a97c04_695caa8a-c2f6-4a1a-9672-53213fea21aa",
  },
  {
    name: "Munchies",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/7/6/73e018a7-d342-475e-aaca-ec5cd3d0c59f_228ff3d4-ff21-44db-9768-7a369c65ce6a",
  },
  {
    name: "Sweet Tooth",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/7/6/83a9b71b-1db7-4cbe-a9f7-ead650d26326_3afbe8c8-f5c8-4dd7-8357-f5711f80646b",
  },
  {
    name: "Cold Drinks and Juices",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/7/6/37d399b1-52d2-47ef-bdd8-8951e51819fc_0361a93d-e864-49be-a57d-46c958eb7b56",
  },
  {
    name: "Biscuits and Cakes",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/7/6/76a7104c-0f11-4182-aa51-0d48efc2be7f_aae098f9-aaff-4504-a222-bf13595d58cd",
  },
  {
    name: "Instant and Frozen Food",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/e160e4c4-2114-4e3d-97ff-3922125a3b2e_224bcfa1-77e3-47e5-aea5-1ab060585b4b",
  },
  {
    name: "Meat and Seafood",
    img: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/5/14/25be4b2d-a9de-495e-a9a4-9a6d6a3d13c0_5f571281-eef0-4820-9982-d8bdd9af91c6",
  },
];

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
  >
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
  >
    <FaChevronLeft />
  </button>
);

const GrocerySlider = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 6, slidesToScroll: 2 } }, // 2xl
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 2 } }, // xl
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } }, // lg
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 2 } }, // md
      {
        breakpoint: 640,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false },
      }, // sm
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      }, // xs
    ],
  };

  return (
    <section className="py-4 px-3 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shop groceries on Instamart</h2>

      <div>
        <Slider {...sliderSettings}>
          {groceryItems.map((item, index) => (
            <div
              key={index}
              className="p-1 rounded-xl bg-white hover:shadow-lg flex flex-col items-center text-center"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44 2xl:h-48 w-full object-contain mb-2"
              />
              <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg font-medium">
                {item.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default GrocerySlider;
