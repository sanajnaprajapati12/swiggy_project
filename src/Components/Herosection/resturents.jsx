// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Menu } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie"; // ✅ added

// const baseURL = import.meta.env.VITE_API_BASE_URL;


// const initialFormData = {
//   name: "",
//   description: "",
//   category: "",
//   cuisine: "",
//   deliveryTime: "",
//   timing: {
//     open: "",
//     close: "",
//   },
//   location: {
//     address: "",
//     city: "",
//     pincode: "",
//     area: "",
//   },
//   offers: [],
//   images: [],
//   tags: [],

//   popularDishes: "",
//   isPureVeg: false,
//   type: "",
//   rating: "",
//   isOpen: false,
//   isClose: false,
// };

// // -------------------- FORM COMPONENT --------------------
// const RestaurantForm = ({
//   fetchRestaurants,
//   editingRestaurant,
//   setEditingRestaurant,
// }) => {
//   const [formData, setFormData] = useState(initialFormData);
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (editingRestaurant) {
//       setFormData(editingRestaurant);
//       setImages([]);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [editingRestaurant]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const resetForm = () => {
//     setFormData(initialFormData);
//     setImages([]);
//     setEditingRestaurant(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       location: {
//         address: formData.address,
//         area: formData.area,
//         city: formData.city,
//         pincode: formData.pincode,
//       },
//       timing: {
//         open: formData.openTime,
//         close: formData.closeTime,
//       },
//       offers: formData.offers
//         ? formData.offers.split(",").map((o) => o.trim())
//         : [],
//       tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
//       popularDishes: formData.popularDishes
//         ? formData.popularDishes.split(",").map((d) => d.trim())
//         : [],
//     };

//     const data = new FormData();

//     // ✅ append images
//     images.forEach((image) => data.append("images", image));

//     // ✅ stringify objects & arrays properly
//     Object.keys(payload).forEach((key) => {
//       if (typeof payload[key] === "object") {
//         data.append(key, JSON.stringify(payload[key]));
//       } else {
//         data.append(key, payload[key]);
//       }
//     });

//    try {
//   const token = Cookies.get("token"); // 🔑 get token from cookie

//   if (editingRestaurant) {
//     await axios.put(`${baseURL}/update/${editingRestaurant._id}`, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
       
//       },
//       withCredentials: true,
//     });
//     alert("Restaurant updated successfully!");
//   } else {
//     await axios.post(`${baseURL}/createrestaurants`, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         // ✅ send token
//       },
//       withCredentials: true,
//     });
//     alert("Restaurant created!");
//   }

//   resetForm();
//   fetchRestaurants();
// } catch (err) {
//   alert("Error: " + (err.response?.data?.message || err.message));
// }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow p-6 rounded-lg space-y-4 mb-10"
//     >
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">
//         {editingRestaurant ? "Update Restaurant" : "Create Restaurant"}
//       </h2>

//       <div className="grid grid-cols-2 gap-4">
//         {[
//           { name: "name", placeholder: "Name" },
//           { name: "description", placeholder: "Description" },
//           { name: "address", placeholder: "Address" },
//           { name: "area", placeholder: "Area" },
//           { name: "city", placeholder: "City" },
//           { name: "pincode", placeholder: "Pincode" },
//           { name: "cuisine", placeholder: "Cuisine" },
//           { name: "rating", placeholder: "Rating", type: "number" },
//           { name: "type", placeholder: "Type (Veg, Non-Veg)" },
//           { name: "category", placeholder: "Category (Chinese, Indian)" },
//           {
//             name: "deliveryTime",
//             placeholder: "Delivery Time (min)",
//             type: "number",
//           },
//           { name: "openTime", placeholder: "Open Time", type: "time" },
//           { name: "closeTime", placeholder: "Close Time", type: "time" },
//           { name: "offers", placeholder: "Offers (comma separated)" },
//           {
//             name: "popularDishes",
//             placeholder: "Popular Dishes (comma separated)",
//           },
//           { name: "tags", placeholder: "Tags (comma separated)" },
//         ].map(({ name, placeholder, type = "text" }) => (
//           <input
//             key={name}
//             name={name}
//             type={type}
//             placeholder={placeholder}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={formData[name] || ""}
//             onChange={handleChange}
//             required={["name", "address"].includes(name)}
//           />
//         ))}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Images
//         </label>
//         <input
//           type="file"
//           multiple
//           onChange={handleImageChange}
//           className="mt-1"
//         />
//         {images.length > 0 && (
//           <div className="flex gap-2 mt-2">
//             {images.map((img, i) => (
//               <img
//                 key={i}
//                 src={URL.createObjectURL(img)}
//                 alt="preview"
//                 className="w-20 h-20 rounded object-cover"
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
//         {[
//           { label: "Pure Veg", name: "isPureVeg" },
//           { label: "Is Open", name: "isOpen" },
//           { label: "Is Close", name: "isClose" },
//           { label: "Featured", name: "featured" },
//         ].map(({ label, name }) => (
//           <label key={name} className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name={name}
//               checked={formData[name] || false}
//               onChange={handleChange}
//             />
//             {label}
//           </label>
//         ))}
//       </div>

//       <div className="flex gap-4">
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {editingRestaurant ? "Update" : "Create"}
//         </button>
//         {editingRestaurant && (
//           <button
//             type="button"
//             onClick={resetForm}
//             className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// // -------------------- LIST COMPONENT --------------------
// const RestaurantList = ({
//   restaurants,
//   fetchRestaurants,
//   setEditingRestaurant,
// }) => {
//   const navigate = useNavigate();

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${baseURL}/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("token")}`, // ✅ send token
//         },
//         withCredentials: true,
//       });
//       alert("Restaurant deleted");
//       fetchRestaurants();
//     } catch (err) {
//       alert("Delete failed: " + err.message);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-6 rounded-lg shadow">
//       <h1 className="text-2xl font-bold mb-6">Top Restaurants</h1>

//       <div className="flex overflow-x-auto gap-5 scroll-smooth [&::-webkit-scrollbar]:hidden">
//         {restaurants.length > 0 ? (
//           restaurants.map((restro) => (
//             <div
//               key={restro._id}
//               onClick={() => navigate(`/restaurant/${restro._id}`)}
//               className="min-w-[280px] max-w-[280px] hover:scale-105 cursor-pointer shadow-xl rounded-xl p-2 bg-white"
//             >
//               <img
//                 src={restro.images?.[0]}
//                 alt={restro.name}
//                 className="rounded-xl w-full h-[170px] object-cover"
//               />

//               <div className="mt-4 mx-2">
//                 <div className="text-gray-500 text-sm flex justify-between">
//                   <p>{restro.name}</p>
//                   <p>{restro.price || "₹200 for two"}</p>
//                 </div>
//                 <div className="text-gray-500 text-sm mt-2 flex justify-between">
//                   <p>{restro.city || "Indore"}</p>
//                   <p>{restro.distance || "2 km"}</p>
//                 </div>
//               </div>

//               <div className="mt-4 mx-2">
//                 <button className="bg-green-500 w-full rounded-md py-1">
//                   <div className="flex justify-between font-bold text-white px-2 text-sm">
//                     <h1>{restro.offer || "20% OFF"}</h1>
//                     <p>{restro.more || "UPTO ₹100"}</p>
//                   </div>
//                 </button>
//                 <button className="bg-green-200 mt-2 w-full rounded-md py-1">
//                   <div className="flex justify-between font-bold text-green-500 px-2 text-sm">
//                     <h1>{restro.freeDelivery || "Free Delivery"}</h1>
//                     <p>{restro.more || "Limited Time"}</p>
//                   </div>
//                 </button>
//               </div>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(restro._id);
//                 }}
//                 className="bg-red-500 text-white w-full mt-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setEditingRestaurant(restro);
//                 }}
//                 className="bg-yellow-500 text-white w-full mt-3 py-1 rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">Loading restaurants...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// // -------------------- MAIN COMPONENT --------------------
// const Restaurants = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [editingRestaurant, setEditingRestaurant] = useState(null);

//   const fetchRestaurants = async () => {
//     try {
//       const res = await axios.post(
//         `${baseURL}/getrestaurants`,
//         {},
//         {
//           headers: {
//             // Authorization: `Bearer ${Cookies.get("token")}`, // ✅ send token
//           },
//           withCredentials: true,
//         }
//       );
//       setRestaurants(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRestaurants();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-4 mt-6">
//       <div className="flex items-center gap-[110vh] mb-4">
//         <Link to="/restourentdasboard">
//           <Menu size={22} className="text-gray-600" />
//         </Link>
//         <h1 className="text-2xl font-bold text-gray-800">Manage Restaurants</h1>
//       </div>

//       <RestaurantForm
//         fetchRestaurants={fetchRestaurants}
//         editingRestaurant={editingRestaurant}
//         setEditingRestaurant={setEditingRestaurant}
//       />

//       <RestaurantList
//         restaurants={restaurants}
//         fetchRestaurants={fetchRestaurants}
//         setEditingRestaurant={setEditingRestaurant}
//       />
//     </div>
//   );
// };

// export default Restaurants;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // ✅ for auth token

const baseURL = import.meta.env.VITE_API_BASE_URL;

const initialFormData = {
  name: "",
  description: "",
  category: "",
  cuisine: "",
  deliveryTime: "",
  timing: {
    open: "",
    close: "",
  },
  location: {
    address: "",
    city: "",
    pincode: "",
    area: "",
  },
  offers: [],
  images: [],
  tags: [],
  popularDishes: "",
  isPureVeg: false,
  type: "",
  rating: "",
  isOpen: false,
  isClose: false,
  featured: false,
};

// -------------------- FORM COMPONENT --------------------
const RestaurantForm = ({
  fetchRestaurants,
  editingRestaurant,
  setEditingRestaurant,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState([]);

  // ✅ Prefill when editing
  useEffect(() => {
    if (editingRestaurant) {
      setFormData({
        ...editingRestaurant,
        address: editingRestaurant.location?.address || "",
        area: editingRestaurant.location?.area || "",
        city: editingRestaurant.location?.city || "",
        pincode: editingRestaurant.location?.pincode || "",
        openTime: editingRestaurant.timing?.open || "",
        closeTime: editingRestaurant.timing?.close || "",
        offers: editingRestaurant.offers?.join(", ") || "",
        tags: editingRestaurant.tags?.join(", ") || "",
        popularDishes: editingRestaurant.popularDishes?.join(", ") || "",
      });
      setImages([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [editingRestaurant]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setImages([]);
    setEditingRestaurant(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      location: {
        address: formData.address,
        area: formData.area,
        city: formData.city,
        pincode: formData.pincode,
      },
      timing: {
        open: formData.openTime,
        close: formData.closeTime,
      },
      offers: formData.offers
        ? formData.offers.split(",").map((o) => o.trim())
        : [],
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      popularDishes: formData.popularDishes
        ? formData.popularDishes.split(",").map((d) => d.trim())
        : [],
    };

    const data = new FormData();
    images.forEach((image) => data.append("images", image));

    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === "object") {
        data.append(key, JSON.stringify(payload[key]));
      } else {
        data.append(key, payload[key]);
      }
    });

    try {
      const token = Cookies.get("token");

      if (editingRestaurant) {
        await axios.put(`${baseURL}/update/${editingRestaurant._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        alert("✅ Restaurant updated successfully!");
      } else {
        await axios.post(`${baseURL}/createrestaurants`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        alert("✅ Restaurant created!");
      }

      resetForm();
      fetchRestaurants();
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded-lg space-y-4 mb-10"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editingRestaurant ? "Update Restaurant" : "Create Restaurant"}
      </h2>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "name", placeholder: "Name" },
          { name: "description", placeholder: "Description" },
          { name: "address", placeholder: "Address" },
          { name: "area", placeholder: "Area" },
          { name: "city", placeholder: "City" },
          { name: "pincode", placeholder: "Pincode" },
          { name: "cuisine", placeholder: "Cuisine" },
          { name: "rating", placeholder: "Rating", type: "number" },
          { name: "type", placeholder: "Type (Veg, Non-Veg)" },
          { name: "category", placeholder: "Category (Chinese, Indian)" },
          {
            name: "deliveryTime",
            placeholder: "Delivery Time (min)",
            type: "number",
          },
          { name: "openTime", placeholder: "Open Time", type: "time" },
          { name: "closeTime", placeholder: "Close Time", type: "time" },
          { name: "offers", placeholder: "Offers (comma separated)" },
          {
            name: "popularDishes",
            placeholder: "Popular Dishes (comma separated)",
          },
          { name: "tags", placeholder: "Tags (comma separated)" },
        ].map(({ name, placeholder, type = "text" }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData[name] || ""}
            onChange={handleChange}
            required={["name", "address"].includes(name)}
          />
        ))}
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Images
        </label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="mt-1"
        />
        {images.length > 0 && (
          <div className="flex gap-2 mt-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 rounded object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
        {[
          { label: "Pure Veg", name: "isPureVeg" },
          { label: "Is Open", name: "isOpen" },
          { label: "Is Close", name: "isClose" },
          { label: "Featured", name: "featured" },
        ].map(({ label, name }) => (
          <label key={name} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              checked={formData[name] || false}
              onChange={handleChange}
            />
            {label}
          </label>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {editingRestaurant ? "Update" : "Create"}
        </button>
        {editingRestaurant && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

// -------------------- LIST COMPONENT --------------------
const RestaurantList = ({
  restaurants,
  fetchRestaurants,
  setEditingRestaurant,
}) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        withCredentials: true,
      });
      alert("✅ Restaurant deleted");
      fetchRestaurants();
    } catch (err) {
      alert("❌ Delete failed: " + err.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Top Restaurants</h1>

      <div className="flex overflow-x-auto gap-5 scroll-smooth [&::-webkit-scrollbar]:hidden">
        {restaurants.length > 0 ? (
          restaurants.map((restro) => (
            <div
              key={restro._id}
              onClick={() => navigate(`/restaurant/${restro._id}`)}
              className="min-w-[280px] max-w-[280px] hover:scale-105 cursor-pointer shadow-xl rounded-xl p-2 bg-white"
            >
              <img
                src={restro.images?.[0]}
                alt={restro.name}
                className="rounded-xl w-full h-[170px] object-cover"
              />

              <div className="mt-4 mx-2">
                <div className="text-gray-500 text-sm flex justify-between">
                  <p>{restro.name}</p>
                  <p>{restro.price || "₹200 for two"}</p>
                </div>
                <div className="text-gray-500 text-sm mt-2 flex justify-between">
                  <p>{restro.city || "Indore"}</p>
                  <p>{restro.distance || "2 km"}</p>
                </div>
              </div>

              <div className="mt-4 mx-2">
                <button className="bg-green-500 w-full rounded-md py-1">
                  <div className="flex justify-between font-bold text-white px-2 text-sm">
                    <h1>{restro.offer || "20% OFF"}</h1>
                    <p>{restro.more || "UPTO ₹100"}</p>
                  </div>
                </button>
                <button className="bg-green-200 mt-2 w-full rounded-md py-1">
                  <div className="flex justify-between font-bold text-green-500 px-2 text-sm">
                    <h1>{restro.freeDelivery || "Free Delivery"}</h1>
                    <p>{restro.more || "Limited Time"}</p>
                  </div>
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(restro._id);
                }}
                className="bg-red-500 text-white w-full mt-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingRestaurant(restro);
                }}
                className="bg-yellow-500 text-white w-full mt-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading restaurants...</p>
        )}
      </div>
    </div>
  );
};

// -------------------- MAIN COMPONENT --------------------
const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/getrestaurants`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredentials: true,
        }
      );
      setRestaurants(res.data.data || []);
    } catch (err) {
      console.error("❌ Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      <div className="flex items-center gap-[110vh] mb-4">
        <Link to="/restourentdasboard">
          <Menu size={22} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Manage Restaurants</h1>
      </div>

      <RestaurantForm
        fetchRestaurants={fetchRestaurants}
        editingRestaurant={editingRestaurant}
        setEditingRestaurant={setEditingRestaurant}
      />

      <RestaurantList
        restaurants={restaurants}
        fetchRestaurants={fetchRestaurants}
        setEditingRestaurant={setEditingRestaurant}
      />
    </div>
  );
};

export default Restaurants;
