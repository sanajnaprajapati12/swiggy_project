// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import axios from "axios";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // const Checkout = () => {
// //   const { user } = useSelector((state) => state.user);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [address, setAddress] = useState({
// //     flat: "",
// //     street: "",
// //     type: "Home",
// //   });
// //   const [quantities, setQuantities] = useState({});
// //   const deliveryFee = 66;
// //   const gst = 46.19;
// //   const navigate = useNavigate();

// //   // Load cart from localStorage or server
// //   useEffect(() => {
// //     const fetchCart = async () => {
// //       try {
// //         const storedCart = localStorage.getItem("cart");
// //         if (storedCart) {
// //           const parsed = JSON.parse(storedCart);
// //           setCartItems(parsed);

// //           const qty = {};
// //           parsed.forEach((item) => (qty[item._id || item.id] = item.qty || 1));
// //           setQuantities(qty);
// //         }

// //         if (user?._id || user?.id) {
// //           const res = await axios.get(
// //             `${API_BASE}/user/${user._id || user.id}`,
// //             {
// //               withCredentials: true,
// //             }
// //           );
// //           if (res.data?.items?.length > 0) {
// //             const items = res.data.items;
// //             setCartItems(items);

// //             const qty = {};
// //             items.forEach((item) => (qty[item._id || item.id] = 1));
// //             setQuantities(qty);

// //             if (res.data.address) setAddress(res.data.address);
// //           }
// //         }
// //       } catch (err) {
// //         console.error(
// //           "⚠️ Cart fetch failed:",
// //           err.response?.data || err.message
// //         );
// //       }
// //     };

// //     fetchCart();
// //   }, [user]);
  
// //   // Update quantity
// //   const updateQuantity = (id, change) => {
// //     setQuantities((prev) => ({
// //       ...prev,
// //       [id]: Math.max(1, (prev[id] || 1) + change),
// //     }));
// //   };

// //   // Calculate totals
// //   const itemTotal = cartItems.reduce(
// //     (sum, item) =>
// //       sum + (item.price || 0) * (quantities[item._id || item.id] || 1),
// //     0
// //   );
// //   const total = itemTotal + deliveryFee + gst;

// //   // Place order
// //   const handlePlaceOrder = async () => {
// //     if (!user?._id && !user?.id) {
// //       alert("⚠️ Please login frist!");
// //       navigate("/login");
// //       return;
// //     }
// //     if (!cartItems.length) return alert("⚠️ Cart is empty!");
// //     if (!address.flat?.trim() || !address.street?.trim())
// //       return alert("⚠️ Please enter delivery address!");
      
      

// //     const restaurantId =
// //       cartItems[0]?.restaurantId?._id || cartItems[0]?.restaurantId;
// //     const items = cartItems.map((item) => ({
// //       itemId: item._id || item.id,
// //       name: item.name,
// //       price: item.price,
// //       quantity: quantities[item._id || item.id] || 1,
// //     }));

// //     const orderData = {
// //       userId: user._id || user.id,
// //       restaurantId,
// //       items,
// //       totalAmount: total,
// //       paymentMode: "COD",
// //       address: `${address.flat}, ${address.street} (${address.type})`,
// //     };

// //     try {
// //       const res = await axios.post(`${API_BASE}/create-order`, orderData, {
// //         withCredentials: true,
// //       });
// //      if (restaurantId) {
// //        localStorage.setItem("restaurantId", restaurantId);
// //      }
// //       console.log(restaurantId)
// //       if (res.data?.success) {
// //         alert("✅ Order placed successfully!");
// //         localStorage.removeItem("cart");
// //         navigate("/orders");
// //       } else {
// //         alert(`❌ Order failed! ${res.data?.message || "Try again"}`);
// //       }
// //     } catch (err) {
// //       console.error("❌ Order Error:", err.response?.data || err.message);
// //       alert(
// //         `⚠️ Something went wrong: ${err.response?.data?.message || err.message}`
// //       );
// //     }
// //   };
 

// //   return (
// //     <div className="min-h-screen bg-gray-300 flex flex-col md:flex-row p-4 md:p-8 gap-6">
// //       {/* Left Section */}
// //       <div className="flex-1 bg-white shadow-md rounded-lg p-5 space-y-6">
// //         <h2 className="text-xl font-semibold">Delivery Address</h2>
// //         <input
// //           type="text"
// //           placeholder="Flat / House No."
// //           value={address.flat}
// //           onChange={(e) => setAddress({ ...address, flat: e.target.value })}
// //           className="w-full border rounded-md p-2 mb-2"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Street / Area"
// //           value={address.street}
// //           onChange={(e) => setAddress({ ...address, street: e.target.value })}
// //           className="w-full border rounded-md p-2 mb-2"
// //         />
// //         <select
// //           value={address.type}
// //           onChange={(e) => setAddress({ ...address, type: e.target.value })}
// //           className="w-full border rounded-md p-2"
// //         >
// //           <option value="Home">Home</option>
// //           <option value="Office">Office</option>
// //           <option value="Other">Other</option>
// //         </select>

// //         <div className="border rounded-lg p-4 mt-4">
// //           <h3 className="text-lg font-semibold text-gray-700">Payment</h3>
// //           <p className="text-sm text-gray-500 mt-2">
// //             Select payment method at the next step.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Right Section - Order Summary */}
// //       <div className="w-full md:w-1/3">
// //         <div className="shadow-lg rounded-lg bg-white p-5 space-y-6 min-h-[80vh]">
// //           <h3 className="text-lg font-bold">Order Summary</h3>

// //           <div className="space-y-3 border-b pb-4">
// //             {cartItems.map((item) => (
// //               <div
// //                 key={item._id || item.id}
// //                 className="flex justify-between items-center gap-2 border-b py-2"
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <img
// //                     src={item.image}
// //                     alt={item.name}
// //                     className="w-14 h-14 object-cover rounded-md border"
// //                   />
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-800">
// //                       {item.name}
// //                     </p>
// //                     <p className="text-xs text-gray-500">₹{item.price}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => updateQuantity(item._id || item.id, -1)}
// //                     className="px-2 py-1 border rounded"
// //                   >
// //                     −
// //                   </button>
// //                   <span>{quantities[item._id || item.id]}</span>
// //                   <button
// //                     onClick={() => updateQuantity(item._id || item.id, 1)}
// //                     className="px-2 py-1 border rounded"
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //                 <p className="font-medium">
// //                   ₹{item.price * (quantities[item._id || item.id] || 1)}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="border rounded-lg p-3 bg-gray-50">
// //             <h4 className="font-semibold mb-1">Delivery Address</h4>
// //             <p className="text-gray-700 text-sm">
// //               {address.flat}, {address.street} ({address.type})
// //             </p>
// //           </div>

// //           <div className="space-y-2 border-b pb-4 text-sm">
// //             <div className="flex justify-between">
// //               <span>Item Total</span>
// //               <span>₹{itemTotal}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>Delivery Fee</span>
// //               <span>₹{deliveryFee}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>GST & Other Charges</span>
// //               <span>₹{gst}</span>
// //             </div>
// //           </div>

// //           <div className="flex justify-between font-semibold text-lg">
// //             <span>TO PAY</span>
// //             <span>₹{total.toFixed(2)}</span>
// //           </div>

// //           <button
// //             onClick={handlePlaceOrder}
// //             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
// //           >
// //             Place Order
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Checkout;

// // // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import axios from "axios";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // const Checkout = () => {
// //   const { user } = useSelector((state) => state.user);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [address, setAddress] = useState({
// //     flat: "",
// //     street: "",
// //     type: "Home",
// //   });
// //   const [quantities, setQuantities] = useState({});
// //   const deliveryFee = 66;
// //   const gst = 46.19;
// //   const navigate = useNavigate();

// //   // Load cart from localStorage or server
// //   useEffect(() => {
// //     const fetchCart = async () => {
// //       try {
// //         const storedCart = localStorage.getItem("cart");
// //         if (storedCart) {
// //           const parsed = JSON.parse(storedCart);
// //           setCartItems(parsed);

// //           const qty = {};
// //           parsed.forEach((item) => (qty[item._id || item.id] = item.qty || 1));
// //           setQuantities(qty);
// //         }

// //         if (user?._id || user?.id) {
// //           const res = await axios.get(
// //             `${API_BASE}/user/${user._id || user.id}`,
// //             {
// //               withCredentials: true,
// //             }
// //           );
// //           if (res.data?.items?.length > 0) {
// //             const items = res.data.items;
// //             setCartItems(items);

// //             const qty = {};
// //             items.forEach((item) => (qty[item._id || item.id] = 1));
// //             setQuantities(qty);

// //             if (res.data.address) setAddress(res.data.address);
// //           }
// //         }
// //       } catch (err) {
// //         console.error(
// //           "⚠️ Cart fetch failed:",
// //           err.response?.data || err.message
// //         );
// //       }
// //     };

// //     fetchCart();
// //   }, [user]);
  
// //   // Update quantity
// //   const updateQuantity = (id, change) => {
// //     setQuantities((prev) => ({
// //       ...prev,
// //       [id]: Math.max(1, (prev[id] || 1) + change),
// //     }));
// //   };

// //   // Calculate totals
// //   const itemTotal = cartItems.reduce(
// //     (sum, item) =>
// //       sum + (item.price || 0) * (quantities[item._id || item.id] || 1),
// //     0
// //   );
// //   const total = itemTotal + deliveryFee + gst;

// //   // Place order
// //   const handlePlaceOrder = async () => {
// //     if (!user?._id && !user?.id) {
// //       alert("⚠️ Please login frist!");
// //       navigate("/login");
// //       return;
// //     }
// //     if (!cartItems.length) return alert("⚠️ Cart is empty!");
// //     if (!address.flat?.trim() || !address.street?.trim())
// //       return alert("⚠️ Please enter delivery address!");
      
      

// //     const restaurantId =
// //       cartItems[0]?.restaurantId?._id || cartItems[0]?.restaurantId;
// //     const items = cartItems.map((item) => ({
// //       itemId: item._id || item.id,
// //       name: item.name,
// //       price: item.price,
// //       quantity: quantities[item._id || item.id] || 1,
// //     }));

// //     const orderData = {
// //       userId: user._id || user.id,
// //       restaurantId,
// //       items,
// //       totalAmount: total,
// //       paymentMode: "COD",
// //       address: `${address.flat}, ${address.street} (${address.type})`,
// //     };

// //     try {
// //       const res = await axios.post(`${API_BASE}/create-order`, orderData, {
// //         withCredentials: true,
// //       });
// //      if (restaurantId) {
// //        localStorage.setItem("restaurantId", restaurantId);
// //      }
// //       console.log(restaurantId)
// //       if (res.data?.success) {
// //         alert("✅ Order placed successfully!");
// //         localStorage.removeItem("cart");
// //         navigate("/orders");
// //       } else {
// //         alert(`❌ Order failed! ${res.data?.message || "Try again"}`);
// //       }
// //     } catch (err) {
// //       console.error("❌ Order Error:", err.response?.data || err.message);
// //       alert(
// //         `⚠️ Something went wrong: ${err.response?.data?.message || err.message}`
// //       );
// //     }
// //   };
 

// //   return (
// //     <div className="min-h-screen bg-gray-300 flex flex-col md:flex-row p-4 md:p-8 gap-6">
// //       {/* Left Section */}
// //       <div className="flex-1 bg-white shadow-md rounded-lg p-5 space-y-6">
// //         <h2 className="text-xl font-semibold">Delivery Address</h2>
// //         <input
// //           type="text"
// //           placeholder="Flat / House No."
// //           value={address.flat}
// //           onChange={(e) => setAddress({ ...address, flat: e.target.value })}
// //           className="w-full border rounded-md p-2 mb-2"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Street / Area"
// //           value={address.street}
// //           onChange={(e) => setAddress({ ...address, street: e.target.value })}
// //           className="w-full border rounded-md p-2 mb-2"
// //         />
// //         <select
// //           value={address.type}
// //           onChange={(e) => setAddress({ ...address, type: e.target.value })}
// //           className="w-full border rounded-md p-2"
// //         >
// //           <option value="Home">Home</option>
// //           <option value="Office">Office</option>
// //           <option value="Other">Other</option>
// //         </select>

// //         <div className="border rounded-lg p-4 mt-4">
// //           <h3 className="text-lg font-semibold text-gray-700">Payment</h3>
// //           <p className="text-sm text-gray-500 mt-2">
// //             Select payment method at the next step.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Right Section - Order Summary */}
// //       <div className="w-full md:w-1/3">
// //         <div className="shadow-lg rounded-lg bg-white p-5 space-y-6 min-h-[80vh]">
// //           <h3 className="text-lg font-bold">Order Summary</h3>

// //           <div className="space-y-3 border-b pb-4">
// //             {cartItems.map((item) => (
// //               <div
// //                 key={item._id || item.id}
// //                 className="flex justify-between items-center gap-2 border-b py-2"
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <img
// //                     src={item.image}
// //                     alt={item.name}
// //                     className="w-14 h-14 object-cover rounded-md border"
// //                   />
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-800">
// //                       {item.name}
// //                     </p>
// //                     <p className="text-xs text-gray-500">₹{item.price}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => updateQuantity(item._id || item.id, -1)}
// //                     className="px-2 py-1 border rounded"
// //                   >
// //                     −
// //                   </button>
// //                   <span>{quantities[item._id || item.id]}</span>
// //                   <button
// //                     onClick={() => updateQuantity(item._id || item.id, 1)}
// //                     className="px-2 py-1 border rounded"
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //                 <p className="font-medium">
// //                   ₹{item.price * (quantities[item._id || item.id] || 1)}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="border rounded-lg p-3 bg-gray-50">
// //             <h4 className="font-semibold mb-1">Delivery Address</h4>
// //             <p className="text-gray-700 text-sm">
// //               {address.flat}, {address.street} ({address.type})
// //             </p>
// //           </div>

// //           <div className="space-y-2 border-b pb-4 text-sm">
// //             <div className="flex justify-between">
// //               <span>Item Total</span>
// //               <span>₹{itemTotal}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>Delivery Fee</span>
// //               <span>₹{deliveryFee}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>GST & Other Charges</span>
// //               <span>₹{gst}</span>
// //             </div>
// //           </div>

// //           <div className="flex justify-between font-semibold text-lg">
// //             <span>TO PAY</span>
// //             <span>₹{total.toFixed(2)}</span>
// //           </div>

// //           <button
// //             onClick={handlePlaceOrder}
// //             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
// //           >
// //             Place Order
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // // };

// // export default Checkout;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// const Checkout = () => {
//   const { user } = useSelector((state) => state.user);
//   const [cartItems, setCartItems] = useState([]);
//   const [deliveryAddress, setDeliveryAddress] = useState({
//     flat: "",
//     street: "",
//     type: "Home",
//   });
//   const [quantities, setQuantities] = useState({});
//   const deliveryFee = 66;
//   const gst = 46.19;
//   const navigate = useNavigate();

//   // Load cart from localStorage or server
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const storedCart = localStorage.getItem("cart");
//         if (storedCart) {
//           const parsed = JSON.parse(storedCart);
//           setCartItems(parsed);

//           const qty = {};
//           parsed.forEach((item) => (qty[item._id || item.id] = item.qty || 1));
//           setQuantities(qty);
//         }

//         if (user?._id || user?.id) {
//           const res = await axios.get(
//             `${API_BASE}/user/${user._id || user.id}`,
//             {
//               withCredentials: true,
//             }
//           );
//           if (res.data?.items?.length > 0) {
//             const items = res.data.items;
//             setCartItems(items);

//             const qty = {};
//             items.forEach((item) => (qty[item._id || item.id] = 1));
//             setQuantities(qty);

//             if (res.data.address) setDeliveryAddress(res.data.address);
//           }
//         }
//       } catch (err) {
//         console.error(
//           "⚠️ Cart fetch failed:",
//           err.response?.data || err.message
//         );
//       }
//     };

//     fetchCart();
//   }, [user]);

//   // Update quantity
//   const updateQuantity = (id, change) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(1, (prev[id] || 1) + change),
//     }));
//   };

//   // Calculate totals
//   const itemTotal = cartItems.reduce(
//     (sum, item) =>
//       sum + (item.price || 0) * (quantities[item._id || item.id] || 1),
//     0
//   );
//   const total = itemTotal + deliveryFee + gst;

//   // Place order
//   const handlePlaceOrder = async () => {
//     if (!user?._id && !user?.id) {
//       alert("⚠️ Please login frist!");
//       navigate("/login");
//       return;
//     }
//     if (!cartItems.length) return alert("⚠️ Cart is empty!");
//     if (!deliveryAddress.flat?.trim() || !deliveryAddress.street?.trim())
//       return alert("⚠️ Please enter delivery address!");

//     const restaurantId =
//       cartItems[0]?.restaurantId?._id || cartItems[0]?.restaurantId;
//     const items = cartItems.map((item) => ({
//       itemId: item._id || item.id,
//       name: item.name,
//       price: item.price,
//       quantity: quantities[item._id || item.id] || 1,
//     }));

//     const orderData = {
//       userId: user._id || user.id,
//       restaurantId,
//       items,
//       totalAmount: total,
//       paymentMode: "COD",
//       // address: `${deliveryAddress.flat}, ${deliveryAddress.street} (${deliveryAddress.type})`,
//       deliveryAddress: {
//         house: deliveryAddress.flat, // required
//         street: deliveryAddress.street, // optional
//         city: "", // optional, send empty string if not collected
//         state: "",
//         pincode: "",
//       },
//     };

//     try {
//       const res = await axios.post(`${API_BASE}/create-order`, orderData, {
//         withCredentials: true,
//       });
//       if (restaurantId) {
//         localStorage.setItem("restaurantId", restaurantId);
//       }
//       console.log(restaurantId);
//       if (res.data?.success) {
//         alert("✅ Order placed successfully!");
//         localStorage.removeItem("cart");
//         navigate("/orders");
//       } else {
//         alert(`❌ Order failed! ${res.data?.message || "Try again"}`);
//       }
//     } catch (err) {
//       console.error("❌ Order Error:", err.response?.data || err.message);
//       alert(
//         `⚠️ Something went wrong: ${err.response?.data?.message || err.message}`
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-300 flex flex-col md:flex-row p-4 md:p-8 gap-6">
//       {/* Left Section */}
//       <div className="flex-1 bg-white shadow-md rounded-lg p-5 space-y-6">
//         <h2 className="text-xl font-semibold">Delivery Address</h2>
//         <input
//           type="text"
//           placeholder="Flat / House No."
//           value={deliveryAddress.flat}
//           onChange={(e) =>
//             setDeliveryAddress({ ...deliveryAddress, flat: e.target.value })
//           }
//           className="w-full border rounded-md p-2 mb-2"
//         />
//         <input
//           type="text"
//           placeholder="Street / Area"
//           value={deliveryAddress.street}
//           onChange={(e) =>
//             setDeliveryAddress({ ...deliveryAddress, street: e.target.value })
//           }
//           className="w-full border rounded-md p-2 mb-2"
//         />
//         <select
//           value={deliveryAddress.type}
//           onChange={(e) =>
//             setDeliveryAddress({ ...deliveryAddress, type: e.target.value })
//           }
//           className="w-full border rounded-md p-2"
//         >
//           <option value="Home">Home</option>
//           <option value="Office">Office</option>
//           <option value="Other">Other</option>
//         </select>

//         <div className="border rounded-lg p-4 mt-4">
//           <h3 className="text-lg font-semibold text-gray-700">Payment</h3>
//           <p className="text-sm text-gray-500 mt-2">
//             Select payment method at the next step.
//           </p>
//         </div>
//       </div>

//       {/* Right Section - Order Summary */}
//       <div className="w-full md:w-1/3">
//         <div className="shadow-lg rounded-lg bg-white p-5 space-y-6 min-h-[80vh]">
//           <h3 className="text-lg font-bold">Order Summary</h3>

//           <div className="space-y-3 border-b pb-4">
//             {cartItems.map((item) => (
//               <div
//                 key={item._id || item.id}
//                 className="flex justify-between items-center gap-2 border-b py-2"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-14 h-14 object-cover rounded-md border"
//                   />
//                   <div>
//                     <p className="text-sm font-medium text-gray-800">
//                       {item.name}
//                     </p>
//                     <p className="text-xs text-gray-500">₹{item.price}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => updateQuantity(item._id || item.id, -1)}
//                     className="px-2 py-1 border rounded"
//                   >
//                     −
//                   </button>
//                   <span>{quantities[item._id || item.id]}</span>
//                   <button
//                     onClick={() => updateQuantity(item._id || item.id, 1)}
//                     className="px-2 py-1 border rounded"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <p className="font-medium">
//                   ₹{item.price * (quantities[item._id || item.id] || 1)}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="border rounded-lg p-3 bg-gray-50">
//             <h4 className="font-semibold mb-1">Delivery Address</h4>
//             <p className="text-gray-700 text-sm">
//               {deliveryAddress.flat}, {deliveryAddress.street} (
//               {deliveryAddress.type})
//             </p>
//           </div>

//           <div className="space-y-2 border-b pb-4 text-sm">
//             <div className="flex justify-between">
//               <span>Item Total</span>
//               <span>₹{itemTotal}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Delivery Fee</span>
//               <span>₹{deliveryFee}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>GST & Other Charges</span>
//               <span>₹{gst}</span>
//             </div>
//           </div>

//           <div className="flex justify-between font-semibold text-lg">
//             <span>TO PAY</span>
//             <span>₹{total.toFixed(2)}</span>
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import axios from "axios";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // const Checkout = () => {
// //   const { user } = useSelector((state) => state.user);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [address, setAddress] = useState({
// //     flat: "",
// //     street: "",
// //     type: "Home",
// //   });
// //   const [quantities, setQuantities] = useState({});
// //   const deliveryFee = 66;
// //   const gst = 46.19;
// //   const navigate = useNavigate();

// //   // Load cart from localStorage or server
// //   useEffect(() => {
// //     const fetchCart = async () => {
// //       try {
// //         const storedCart = localStorage.getItem("cart");
// //         if (storedCart) {
// //           const parsed = JSON.parse(storedCart);
// //           setCartItems(parsed);

// //           const qty = {};
// //           parsed.forEach((item) => (qty[item._id || item.id] = item.qty || 1));
// //           setQuantities(qty);
// //         }

// //         if (user?._id || user?.id) {
// //           const res = await axios.get(
// //             `${API_BASE}/user/${user._id || user.id}`,
// //             {
// //               withCredentials: true,
// //             }
// //           );
// //           if (res.data?.items?.length > 0) {
// //             const items = res.data.items;
// //             setCartItems(items);

// //             const qty = {};
// //             items.forEach((item) => (qty[item._id || item.id] = 1));
// //             setQuantities(qty);

// //             if (res.data.address) setAddress(res.data.address);
// //           }
// //         }
// //       } catch (err) {
// //         console.error(
// //           "⚠️ Cart fetch failed:",
// //           err.response?.data || err.message
// //         );
// //       }
// //     };

// //     fetchCart();
// //   }, [user]);
  
// //   // Update quantity
// //   const updateQuantity = (id, change) => {
// //     setQuantities((prev) => ({
// //       ...prev,
// //       [id]: Math.max(1, (prev[id] || 1) + change),
// //     }));
// //   };

// //   // Calculate totals
// //   const itemTotal = cartItems.reduce(
// //     (sum, item) =>
// //       sum + (item.price || 0) * (quantities[item._id || item.id] || 1),
// //     0
// //   );
// //   const total = itemTotal + deliveryFee + gst;

// //   // Place order
// //   const handlePlaceOrder = async () => {
// //     if (!user?._id && !user?.id) {
// //       alert("⚠️ Please login frist!");
// //       navigate("/login");
// //       return;
// //     }
// //     if (!cartItems.length) return alert("⚠️ Cart is empty!");
// //     if (!address.flat?.trim() || !address.street?.trim())
// //       return alert("⚠️ Please enter delivery address!");
      
      

// //     const restaurantId =
// //       cartItems[0]?.restaurantId?._id || cartItems[0]?.restaurantId;
// //     const items = cartItems.map((item) => ({
// //       itemId: item._id || item.id,
// //       name: item.name,
// //       price: item.price,
// //       quantity: quantities[item._id || item.id] || 1,
// //     }));

// //     const orderData = {
// //       userId: user._id || user.id,
// //       restaurantId,
// //       items,
// //       totalAmount: total,
// //       paymentMode: "COD",
// //       address: `${address.flat}, ${address.street} (${address.type})`,
// //     };

// //     try {
// //       const res = await axios.post(`${API_BASE}/create-order`, orderData, {
// //         withCredentials: true,
// //       });
// //      if (restaurantId) {
// //        localStorage.setItem("restaurantId", restaurantId);
// //      }
// //       console.log(restaurantId)
// //       if (res.data?.success) {
// //         alert("✅ Order placed successfully!");
// //         localStorage.removeItem("cart");
// //         navigate("/orders");
// //       } else {
// //         alert(`❌ Order failed! ${res.data?.message || "Try again"}`);
// //       }
// //     } catch (err) {
// //       console.error("❌ Order Error:", err.response?.data || err.message);
// //       alert(
// //         `⚠️ Something went wrong: ${err.response?.data?.message || err.message}`
// //       );
// //     }
// //   };
 

// //   return (
// //     <div className="min-h-screen bg-gray-300 flex flex-col md:flex-row p-4 md:p-8 gap-6">
// //       {/* Left Section */}
// //       <div className="flex-1 bg-white shadow-md rounded-lg p-5 space-y-6">
// //         <h2 className="text-xl font-semibold">Delivery Address</h2>
// //         <input
// //           type="text"
// //           placeholder="Flat / House No."
// //           value={address.flat}
// //           onChange={(e) => setAddress({ ...address, flat: e.target.value })}
// //           className="w-full border rounded-md p-2 mb-2"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Street / Area"
// //           value={address.street}
// //           onChange={(e) => setAddress({ ...address, street: e.target.value })}
// //           className="w-full border rounded-md p-2 mb-2"
// //         />
// //         <select
// //           value={address.type}
// //           onChange={(e) => setAddress({ ...address, type: e.target.value })}
// //           className="w-full border rounded-md p-2"
// //         >
// //           <option value="Home">Home</option>
// //           <option value="Office">Office</option>
// //           <option value="Other">Other</option>
// //         </select>

// //         <div className="border rounded-lg p-4 mt-4">
// //           <h3 className="text-lg font-semibold text-gray-700">Payment</h3>
// //           <p className="text-sm text-gray-500 mt-2">
// //             Select payment method at the next step.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Right Section - Order Summary */}
// //       <div className="w-full md:w-1/3">
// //         <div className="shadow-lg rounded-lg bg-white p-5 space-y-6 min-h-[80vh]">
// //           <h3 className="text-lg font-bold">Order Summary</h3>

// //           <div className="space-y-3 border-b pb-4">
// //             {cartItems.map((item) => (
// //               <div
// //                 key={item._id || item.id}
// //                 className="flex justify-between items-center gap-2 border-b py-2"
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <img
// //                     src={item.image}
// //                     alt={item.name}
// //                     className="w-14 h-14 object-cover rounded-md border"
// //                   />
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-800">
// //                       {item.name}
// //                     </p>
// //                     <p className="text-xs text-gray-500">₹{item.price}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => updateQuantity(item._id || item.id, -1)}
// //                     className="px-2 py-1 border rounded"
// //                   >
// //                     −
// //                   </button>
// //                   <span>{quantities[item._id || item.id]}</span>
// //                   <button
// //                     onClick={() => updateQuantity(item._id || item.id, 1)}
// //                     className="px-2 py-1 border rounded"
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //                 <p className="font-medium">
// //                   ₹{item.price * (quantities[item._id || item.id] || 1)}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="border rounded-lg p-3 bg-gray-50">
// //             <h4 className="font-semibold mb-1">Delivery Address</h4>
// //             <p className="text-gray-700 text-sm">
// //               {address.flat}, {address.street} ({address.type})
// //             </p>
// //           </div>

// //           <div className="space-y-2 border-b pb-4 text-sm">
// //             <div className="flex justify-between">
// //               <span>Item Total</span>
// //               <span>₹{itemTotal}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>Delivery Fee</span>
// //               <span>₹{deliveryFee}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>GST & Other Charges</span>
// //               <span>₹{gst}</span>
// //             </div>
// //           </div>

// //           <div className="flex justify-between font-semibold text-lg">
// //             <span>TO PAY</span>
// //             <span>₹{total.toFixed(2)}</span>
// //           </div>

// //           <button
// //             onClick={handlePlaceOrder}
// //             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
// //           >
// //             Place Order
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Checkout;

// // // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import axios from "axios";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // const Checkout = () => {
// //   const { user } = useSelector((state) => state.user);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [address, setAddress] = useState({
// //     flat: "",
// //     street: "",
// //     type: "Home",
// //   });
// //   const [quantities, setQuantities] = useState({});
// //   const deliveryFee = 66;
// //   const gst = 46.19;
// //   const navigate = useNavigate();

// //   // Load cart from localStorage or server
// //   useEffect(() => {
// //     const fetchCart = async () => {
// //       try {
// //         const storedCart = localStorage.getItem("cart");
// //         if (storedCart) {
// //           const parsed = JSON.parse(storedCart);
// //           setCartItems(parsed);

// //           const qty = {};
// //           parsed.forEach((item) => (qty[item._id || item.id] = item.qty || 1));
// //           setQuantities(qty);
// //         }

// //         if (user?._id || user?.id) {
// //           const res = await axios.get(
// //             `${API_BASE}/user/${user._id || user.id}`,
// //             {
// //               withCredentials: true,
// //             }
// //           );
// //           if (res.data?.items?.length > 0) {
// //             const items = res.data.items;
// //             setCartItems(items);

// //             const qty = {};
// //             items.forEach((item) => (qty[item._id || item.id] = 1));
// //             setQuantities(qty);

// //             if (res.data.address) setAddress(res.data.address);
// //           }
// //         }
// //       } catch (err) {
// //         console.error(
// //           "⚠️ Cart fetch failed:",
// //           err.response?.data || err.message
// //         );
// //       }
// //     };

// //     fetchCart();
// //   }, [user]);
  
// //   // Update quantity
// //   const updateQuantity = (id, change) => {
// //     setQuantities((prev) => ({
// //       ...prev,
// //       [id]: Math.max(1, (prev[id] || 1) + change),
// //     }));
// //   };

// //   // Calculate totals
// //   const itemTotal = cartItems.reduce(
// //     (sum, item) =>
// //       sum + (item.price || 0) * (quantities[item._id || item.id] || 1),
// //     0
// //   );
// //   const total = itemTotal + deliveryFee + gst;

// //   // Place order
// //   const handlePlaceOrder = async () => {
// //     if (!user?._id && !user?.id) {
// //       alert("⚠️ Please login frist!");
// //       navigate("/login");
// //       return;
// //     }
// //     if (!cartItems.length) return alert("⚠️ Cart is empty!");
// //     if (!address.flat?.trim() || !address.street?.trim())
// //       return alert("⚠️ Please enter delivery address!");
      
      

// //     const restaurantId =
// //       cartItems[0]?.restaurantId?._id || cartItems[0]?.restaurantId;
// //     const items = cartItems.map((item) => ({
// //       itemId: item._id || item.id,
// //       name: item.name,
// //       price: item.price,
// //       quantity: quantities[item._id || item.id] || 1,
// //     }));

// //     const orderData = {
// //       userId: user._id || user.id,
// //       restaurantId,
// //       items,
// //       totalAmount: total,
// //       paymentMode: "COD",
// //       address: `${address.flat}, ${address.street} (${address.type})`,
// //     };

// //     try {
// //       const res = await axios.post(`${API_BASE}/create-order`, orderData, {
// //         withCredentials: true,
// //       });
// //      if (restaurantId) {
// //        localStorage.setItem("restaurantId", restaurantId);
// //      }
// //       console.log(restaurantId)
// //       if (res.data?.success) {
// //         alert("✅ Order placed successfully!");
// //         localStorage.removeItem("cart");
// //         navigate("/orders");
// //       } else {
// //         alert(`❌ Order failed! ${res.data?.message || "Try again"}`);
// //       }
// //     } catch (err) {
// //       console.error("❌ Order Error:", err.response?.data || err.message);
// //       alert(
// //         `⚠️ Something went wrong: ${err.response?.data?.message || err.message}`
// //       );
// //     }
// //   };
 

// //   return (
// //     <div className="min-h-screen bg-gray-300 flex flex-col md:flex-row p-4 md:p-8 gap-6">
// //       {/* Left Section */}
// //       <div className="flex-1 bg-white shadow-md rounded-lg p-5 space-y-6">
// //         <h2 className="text-xl font-semibold">Delivery Address</h2>
// //         <input
// //           type="text"
// //           placeholder="Flat / House No."
// //           value={address.flat}
// //           onChange={(e) => setAddress({ ...address, flat: e.target.value })}
// //           className="w-full border rounded-md p-2 mb-2"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Street / Area"
// //           value={address.street}
// //           onChange={(e) => setAddress({ ...address, street: e.target.value })}
// //           className="w-full border rounded-md p-2 mb-2"
// //         />
// //         <select
// //           value={address.type}
// //           onChange={(e) => setAddress({ ...address, type: e.target.value })}
// //           className="w-full border rounded-md p-2"
// //         >
// //           <option value="Home">Home</option>
// //           <option value="Office">Office</option>
// //           <option value="Other">Other</option>
// //         </select>

// //         <div className="border rounded-lg p-4 mt-4">
// //           <h3 className="text-lg font-semibold text-gray-700">Payment</h3>
// //           <p className="text-sm text-gray-500 mt-2">
// //             Select payment method at the next step.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Right Section - Order Summary */}
// //       <div className="w-full md:w-1/3">
// //         <div className="shadow-lg rounded-lg bg-white p-5 space-y-6 min-h-[80vh]">
// //           <h3 className="text-lg font-bold">Order Summary</h3>

// //           <div className="space-y-3 border-b pb-4">
// //             {cartItems.map((item) => (
// //               <div
// //                 key={item._id || item.id}
// //                 className="flex justify-between items-center gap-2 border-b py-2"
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <img
// //                     src={item.image}
// //                     alt={item.name}
// //                     className="w-14 h-14 object-cover rounded-md border"
// //                   />
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-800">
// //                       {item.name}
// //                     </p>
// //                     <p className="text-xs text-gray-500">₹{item.price}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => updateQuantity(item._id || item.id, -1)}
// //                     className="px-2 py-1 border rounded"
// //                   >
// //                     −
// //                   </button>
// //                   <span>{quantities[item._id || item.id]}</span>
// //                   <button
// //                     onClick={() => updateQuantity(item._id || item.id, 1)}
// //                     className="px-2 py-1 border rounded"
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //                 <p className="font-medium">
// //                   ₹{item.price * (quantities[item._id || item.id] || 1)}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="border rounded-lg p-3 bg-gray-50">
// //             <h4 className="font-semibold mb-1">Delivery Address</h4>
// //             <p className="text-gray-700 text-sm">
// //               {address.flat}, {address.street} ({address.type})
// //             </p>
// //           </div>

// //           <div className="space-y-2 border-b pb-4 text-sm">
// //             <div className="flex justify-between">
// //               <span>Item Total</span>
// //               <span>₹{itemTotal}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>Delivery Fee</span>
// //               <span>₹{deliveryFee}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>GST & Other Charges</span>
// //               <span>₹{gst}</span>
// //             </div>
// //           </div>

// //           <div className="flex justify-between font-semibold text-lg">
// //             <span>TO PAY</span>
// //             <span>₹{total.toFixed(2)}</span>
// //           </div>

// //           <button
// //             onClick={handlePlaceOrder}
// //             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
// //           >
// //             Place Order
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // // };

// // export default Checkout;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// const Checkout = () => {
//   const { user } = useSelector((state) => state.user);
//   const [cartItems, setCartItems] = useState([]);
//   const [deliveryAddress, setDeliveryAddress] = useState({
//     flat: "",
//     street: "",
//     type: "Home",
//   });
//   const [quantities, setQuantities] = useState({});
//   const deliveryFee = 66;
//   const gst = 46.19;
//   const navigate = useNavigate();

//   // Load cart from localStorage or server
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const storedCart = localStorage.getItem("cart");
//         if (storedCart) {
//           const parsed = JSON.parse(storedCart);
//           setCartItems(parsed);

//           const qty = {};
//           parsed.forEach((item) => (qty[item._id || item.id] = item.qty || 1));
//           setQuantities(qty);
//         }

//         if (user?._id || user?.id) {
//           const res = await axios.get(
//             `${API_BASE}/user/${user._id || user.id}`,
//             {
//               withCredentials: true,
//             }
//           );
//           if (res.data?.items?.length > 0) {
//             const items = res.data.items;
//             setCartItems(items);

//             const qty = {};
//             items.forEach((item) => (qty[item._id || item.id] = 1));
//             setQuantities(qty);

//             if (res.data.address) setDeliveryAddress(res.data.address);
//           }
//         }
//       } catch (err) {
//         console.error(
//           "⚠️ Cart fetch failed:",
//           err.response?.data || err.message
//         );
//       }
//     };

//     fetchCart();
//   }, [user]);

//   // Update quantity
//   const updateQuantity = (id, change) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(1, (prev[id] || 1) + change),
//     }));
//   };

//   // Calculate totals
//   const itemTotal = cartItems.reduce(
//     (sum, item) =>
//       sum + (item.price || 0) * (quantities[item._id || item.id] || 1),
//     0
//   );
//   const total = itemTotal + deliveryFee + gst;

//   // Place order
//   const handlePlaceOrder = async () => {
//     if (!user?._id && !user?.id) {
//       alert("⚠️ Please login frist!");
//       navigate("/login");
//       return;
//     }
//     if (!cartItems.length) return alert("⚠️ Cart is empty!");
//     if (!deliveryAddress.flat?.trim() || !deliveryAddress.street?.trim())
//       return alert("⚠️ Please enter delivery address!");

//     const restaurantId =
//       cartItems[0]?.restaurantId?._id || cartItems[0]?.restaurantId;
//     const items = cartItems.map((item) => ({
//       itemId: item._id || item.id,
//       name: item.name,
//       price: item.price,
//       quantity: quantities[item._id || item.id] || 1,
//     }));

//     const orderData = {
//       userId: user._id || user.id,
//       restaurantId,
//       items,
//       totalAmount: total,
//       paymentMode: "COD",
//       // address: `${deliveryAddress.flat}, ${deliveryAddress.street} (${deliveryAddress.type})`,
//       deliveryAddress: {
//         house: deliveryAddress.flat, // required
//         street: deliveryAddress.street, // optional
//         city: "", // optional, send empty string if not collected
//         state: "",
//         pincode: "",
//       },
//     };

//     try {
//       const res = await axios.post(`${API_BASE}/create-order`, orderData, {
//         withCredentials: true,
//       });
//       if (restaurantId) {
//         localStorage.setItem("restaurantId", restaurantId);
//       }
//       console.log(restaurantId);
//       if (res.data?.success) {
//         alert("✅ Order placed successfully!");
//         localStorage.removeItem("cart");
//         navigate("/orders");
//       } else {
//         alert(`❌ Order failed! ${res.data?.message || "Try again"}`);
//       }
//     } catch (err) {
//       console.error("❌ Order Error:", err.response?.data || err.message);
//       alert(
//         `⚠️ Something went wrong: ${err.response?.data?.message || err.message}`
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-300 flex flex-col md:flex-row p-4 md:p-8 gap-6">
//       {/* Left Section */}
//       <div className="flex-1 bg-white shadow-md rounded-lg p-5 space-y-6">
//         <h2 className="text-xl font-semibold">Delivery Address</h2>
//         <input
//           type="text"
//           placeholder="Flat / House No."
//           value={deliveryAddress.flat}
//           onChange={(e) =>
//             setDeliveryAddress({ ...deliveryAddress, flat: e.target.value })
//           }
//           className="w-full border rounded-md p-2 mb-2"
//         />
//         <input
//           type="text"
//           placeholder="Street / Area"
//           value={deliveryAddress.street}
//           onChange={(e) =>
//             setDeliveryAddress({ ...deliveryAddress, street: e.target.value })
//           }
//           className="w-full border rounded-md p-2 mb-2"
//         />
//         <select
//           value={deliveryAddress.type}
//           onChange={(e) =>
//             setDeliveryAddress({ ...deliveryAddress, type: e.target.value })
//           }
//           className="w-full border rounded-md p-2"
//         >
//           <option value="Home">Home</option>
//           <option value="Office">Office</option>
//           <option value="Other">Other</option>
//         </select>

//         <div className="border rounded-lg p-4 mt-4">
//           <h3 className="text-lg font-semibold text-gray-700">Payment</h3>
//           <p className="text-sm text-gray-500 mt-2">
//             Select payment method at the next step.
//           </p>
//         </div>
//       </div>

//       {/* Right Section - Order Summary */}
//       <div className="w-full md:w-1/3">
//         <div className="shadow-lg rounded-lg bg-white p-5 space-y-6 min-h-[80vh]">
//           <h3 className="text-lg font-bold">Order Summary</h3>

//           <div className="space-y-3 border-b pb-4">
//             {cartItems.map((item) => (
//               <div
//                 key={item._id || item.id}
//                 className="flex justify-between items-center gap-2 border-b py-2"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-14 h-14 object-cover rounded-md border"
//                   />
//                   <div>
//                     <p className="text-sm font-medium text-gray-800">
//                       {item.name}
//                     </p>
//                     <p className="text-xs text-gray-500">₹{item.price}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => updateQuantity(item._id || item.id, -1)}
//                     className="px-2 py-1 border rounded"
//                   >
//                     −
//                   </button>
//                   <span>{quantities[item._id || item.id]}</span>
//                   <button
//                     onClick={() => updateQuantity(item._id || item.id, 1)}
//                     className="px-2 py-1 border rounded"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <p className="font-medium">
//                   ₹{item.price * (quantities[item._id || item.id] || 1)}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="border rounded-lg p-3 bg-gray-50">
//             <h4 className="font-semibold mb-1">Delivery Address</h4>
//             <p className="text-gray-700 text-sm">
//               {deliveryAddress.flat}, {deliveryAddress.street} (
//               {deliveryAddress.type})
//             </p>
//           </div>

//           <div className="space-y-2 border-b pb-4 text-sm">
//             <div className="flex justify-between">
//               <span>Item Total</span>
//               <span>₹{itemTotal}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Delivery Fee</span>
//               <span>₹{deliveryFee}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>GST & Other Charges</span>
//               <span>₹{gst}</span>
//             </div>
//           </div>

//           <div className="flex justify-between font-semibold text-lg">
//             <span>TO PAY</span>
//             <span>₹{total.toFixed(2)}</span>
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState({
    flat: "",
    street: "",
    type: "Home",
  });
  const [savedAddress, setSavedAddress] = useState(null);
  const [quantities, setQuantities] = useState({});
  const deliveryFee = 66;
  const gst = 46.19;
  const navigate = useNavigate();

  // Load cart from localStorage or server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const parsed = JSON.parse(storedCart);
          setCartItems(parsed);
          const qty = {};
          parsed.forEach((item) => (qty[item._id || item.id] = item.qty || 1));
          setQuantities(qty);
        }

        if (user?._id || user?.id) {
          const res = await axios.get(
            `${API_BASE}/user/${user._id || user.id}`,
            {
              withCredentials: true,
            }
          );
          if (res.data?.items?.length > 0) {
            const items = res.data.items;
            setCartItems(items);
            const qty = {};
            items.forEach((item) => (qty[item._id || item.id] = 1));
            setQuantities(qty);
            if (res.data.address) setDeliveryAddress(res.data.address);
          }
        }
      } catch (err) {
        console.error(
          "⚠️ Cart fetch failed:",
          err.response?.data || err.message
        );
      }
    };
    fetchCart();
  }, [user]);

  // Update quantity
  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  // Calculate totals
  const itemTotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.price || 0) * (quantities[item._id || item.id] || 1),
    0
  );
  const total = itemTotal + deliveryFee + gst;

  // Load Razorpay SDK
  const loadRazorpay = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  const handleSaveAddress = async () => {
    setSavedAddress(deliveryAddress);
    localStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));
  }
  // Handle payment
  const handlePayment = async () => {
    if (!user?._id && !user?.id) {
      alert("⚠️ Please login first!");
      navigate("/login");
      return;
    }
    if (!cartItems.length) return alert("⚠️ Cart is empty!");
    if (!deliveryAddress.flat?.trim() || !deliveryAddress.street?.trim())
      return alert("⚠️ Please enter delivery address!");

    const restaurantId =
      cartItems[0]?.restaurantId?._id || cartItems[0]?.restaurantId;
    const items = cartItems.map((item) => ({
      itemId: item._id || item.id,
      name: item.name,
      image: item.image || item.images?.[0] || "",
      price: item.price,
      quantity: quantities[item._id || item.id] || 1,
     
    }));

    try {
      // 1️⃣ Load Razorpay SDK
      const res = await loadRazorpay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Check your internet connection.");
        return;
      }

      // 2️⃣ Create order on backend
      const { data } = await axios.post(
        `${API_BASE}/payments/create-order`,
        {
          amount: total,
          orderId: `order_${new Date().getTime()}`, // unique order id
        },
        { withCredentials: true }
      );

      const { order } = data;

      // 3️⃣ Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Feasto",
        description: "Food Order Payment",
        order_id: order.id,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone || "9999999999",
          id:user?.id
        },
        theme: { color: "#F97316" },
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${API_BASE}/v1/api/payments/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: order.receipt,
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              alert("✅ Payment Successful 🎉");
              localStorage.removeItem("cart");
              navigate("/orders");
            } else {
              alert("❌ Payment verification failed!");
            }
          } catch (err) {
            console.error(err);
            alert("⚠️ Error verifying payment");
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("❌ Payment Error:", err.response?.data || err.message);
      alert("⚠️ Something went wrong with payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col md:flex-row p-4 md:p-8 gap-6">
      {/* Left Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-5 space-y-6">
        <h2 className="text-xl font-semibold">Delivery Address</h2>
        <input
          type="text"
          placeholder="Flat / House No."
          value={deliveryAddress.flat}
          onChange={(e) =>
            setDeliveryAddress({ ...deliveryAddress, flat: e.target.value })
          }
          className="w-full border rounded-md p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Street / Area"
          value={deliveryAddress.street}
          onChange={(e) =>
            setDeliveryAddress({ ...deliveryAddress, street: e.target.value })
          }
          className="w-full border rounded-md p-2 mb-2"
        />
        <select
          value={deliveryAddress.type}
          onChange={(e) =>
            setDeliveryAddress({ ...deliveryAddress, type: e.target.value })
          }
          className="w-full border rounded-md p-2"
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={handleSaveAddress}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Save Address
        </button>

        {/* ✅ Show saved address below */}
        {savedAddress && (
          <div className="mt-4 p-3 border rounded bg-gray-50">
            <h4 className="font-semibold">Saved Address:</h4>
            <p>
              {savedAddress.flat}, {savedAddress.street}
            </p>
            <p className="text-sm text-gray-500">{savedAddress.type}</p>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3">
        <div className="shadow-lg rounded-lg bg-white p-5 space-y-6 min-h-[90vh]">
          <h3 className="text-lg font-bold">Order Summary</h3>

          <div className="space-y-3 border-b pb-4">
            {cartItems.map((item) => (
              <div
                key={item._id || item.id}
                className="flex justify-between items-center gap-2 border-b py-2"
              >
                <div className="flex items-center gap-3">
                  {/* ✅ Image fix with fallback */}
                  <img
                    src={
                      item.image || item.images?.[0] || "/no-image.png" // fallback
                    }
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <div>
                    {/* ✅ Show restaurant name instead of item name */}
                    <p className="text-sm font-medium text-gray-800">
                      {item.restaurantName || "Unknown Restaurant"}
                    </p>

                    <p className="text-xs text-gray-500">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id || item.id, -1)}
                    className="px-2 py-1 border rounded"
                  >
                    −
                  </button>
                  <span>{quantities[item._id || item.id]}</span>
                  <button
                    onClick={() => updateQuantity(item._id || item.id, 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
                <p className="font-medium">
                  ₹{item.price * (quantities[item._id || item.id] || 1)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-b pb-4 text-sm">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>GST & Other Charges</span>
              <span>₹{gst}</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>TO PAY</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 