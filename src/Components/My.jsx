// http://localhost:5000/v1/api/orders/68c8eed1a04c81d44d7120ac/confirm // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const UserOrders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // LocalStorage se userId nikalna
// //   const userData = JSON.parse(localStorage.getItem("user")) || null;
// //   const userId = userData?.id; 
// //   const API_BASE = import.meta.env.VITE_API_BASE_URL;
// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         if (!userId) {
// //           console.warn("No userId found in localStorage");
// //           setLoading(false);
// //           return;
// //         }


// //         const res = await axios.get(
// //           `${API_BASE}/user/${userId}`
// //         );

        
// //         setOrders(res.data.orders || []);
// //       } catch (error) {
// //         console.error("Error fetching orders:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchOrders();
// //   }, [userId]);

// //   if (loading) {
// //     return <p className="text-center mt-10 text-gray-600">Loading orders...</p>;
// //   }

// //   if (orders.length === 0) {
// //     return (
// //       <div className="text-center mt-20 text-gray-500">
// //         <img
// //           src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_262/empty-orders-image_acrbbw"
// //           alt="empty"
// //           className="w-32 mx-auto mb-4 opacity-70"
// //         />
// //         <p className="text-orange-500 font-medium">
// //           No orders found for your account.
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
// //       <div className="overflow-x-auto">
// //         <table className="w-full border-collapse border border-gray-200 text-left text-gray-700">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="border border-gray-200 px-4 py-2">#</th>
// //               <th className="border border-gray-200 px-4 py-2">Items</th>
// //               <th className="border border-gray-200 px-4 py-2">Total</th>
// //               <th className="border border-gray-200 px-4 py-2">Status</th>
// //               <th className="border border-gray-200 px-4 py-2">Date</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {orders.map((order, idx) => (
// //               <tr key={order._id} className="hover:bg-gray-50">
// //                 <td className="border border-gray-200 px-4 py-2">{idx + 1}</td>
// //                 <td className="border border-gray-200 px-4 py-2">
// //                   {order.items.map((item) => (
// //                     <div key={item._id}>
// //                       {item.name} × {item.quantity}
// //                     </div>
// //                   ))}
// //                 </td>
// //                 <td className="border border-gray-200 px-4 py-2">
// //                   ₹{order.totalAmount}
// //                 </td>
// //                 <td
// //                   className={`border border-gray-200 px-4 py-2 font-medium ${
// //                     order.status === "Pending"
// //                       ? "text-orange-500"
// //                       : order.status === "Completed"
// //                       ? "text-green-600"
// //                       : "text-red-500"
// //                   }`}
// //                 >
// //                   {order.status}
// //                 </td>
// //                 <td className="border border-gray-200 px-4 py-2">
// //                   {new Date(order.createdAt).toLocaleDateString()}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserOrders;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserOrders  = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const ordersPerPage = 3;
//   const API_BASE = import.meta.env.VITE_API_BASE_URL;


//   // Fetch restaurant orders dynamically from localStorage
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);

//       // Get restaurantId directly from localStorage
     
//  const restaurantId = localStorage.getItem("restaurantId");
//       if (!restaurantId) {
//         console.warn("Restaurant ID not found in localStorage");
//         setOrders([]);
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(
//         `${API_BASE}/restaurant-order/${restaurantId}`
//       );
//       if (res.data.success) {
//         setOrders(res.data.orders);
//       } else {
//         setOrders([]);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Filtering
//   const filteredOrders = orders.filter((order) => {
//     const matchesSearch =
//       order.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
//       order.items.some((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       ) ||
//       order._id.toLowerCase().includes(search.toLowerCase());

//     const matchesStatus =
//       statusFilter === "All" ? true : order.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   // Pagination
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(
//     indexOfFirstOrder,
//     indexOfLastOrder
//   );
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   if (loading) {
//     return <p className="p-6 text-gray-500">Loading orders...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders</h1>

//       {/* Search & Filter */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by Order ID, Customer, Item..."
//           className="px-4 py-2 border rounded-lg w-full sm:w-1/2 focus:ring-2 focus:ring-orange-400 outline-none"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//         />
//         <select
//           className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
//           value={statusFilter}
//           onChange={(e) => {
//             setStatusFilter(e.target.value);
//             setCurrentPage(1);
//           }}
//         >
//           <option value="All">All Orders</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Pending">Pending</option>
//           <option value="Preparing">Preparing</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white p-6 rounded-2xl shadow-lg">
//         {currentOrders.length > 0 ? (
//           <>
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-3">Order ID</th>
//                   <th className="p-3">Customer</th>
//                   <th className="p-3">Items</th>
//                   <th className="p-3">Total</th>
//                   <th className="p-3">Status</th>
//                   <th className="p-3">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentOrders.map((order) => (
//                   <tr
//                     key={order._id}
//                     className="border-b hover:bg-gray-50 transition cursor-pointer"
//                     onClick={() => setSelectedOrder(order)}
//                   >
//                     <td className="p-3">{order._id}</td>
//                     <td className="p-3">{order.userId?.name}</td>
//                     <td className="p-3">
//                       {order.items.map((item) => item.name).join(", ")}
//                     </td>
//                     <td className="p-3 font-medium">{order.totalAmount}</td>
//                     <td
//                       className={`p-3 font-semibold ${
//                         order.status === "Delivered"
//                           ? "text-green-600"
//                           : order.status === "Pending"
//                           ? "text-orange-500"
//                           : order.status === "Preparing"
//                           ? "text-blue-500"
//                           : "text-red-500"
//                       }`}
//                     >
//                       {order.status}
//                     </td>
//                     <td className="p-3">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div className="flex justify-between items-center mt-6">
//               <button
//                 className="px-4 py-2 border rounded-lg disabled:opacity-50"
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Prev
//               </button>
//               <div className="flex gap-2">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     className={`px-4 py-2 border rounded-lg ${
//                       currentPage === i + 1
//                         ? "bg-orange-500 text-white"
//                         : "hover:bg-gray-100"
//                     }`}
//                     onClick={() => goToPage(i + 1)}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//               <button
//                 className="px-4 py-2 border rounded-lg disabled:opacity-50"
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-500 py-6">
//             No orders found matching your criteria.
//           </p>
//         )}
//       </div>

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white w-96 p-6 rounded-2xl shadow-xl relative">
//             <h2 className="text-xl font-bold mb-4 text-gray-800">
//               Order Details
//             </h2>
//             <p>
//               <strong>Order ID:</strong> {selectedOrder._id}
//             </p>
//             <p>
//               <strong>Customer:</strong> {selectedOrder.userId?.name}
//             </p>
//             <p>
//               <strong>Items:</strong>{" "}
//               {selectedOrder.items.map((item) => item.name).join(", ")}
//             </p>
//             <p>
//               <strong>Total:</strong> {selectedOrder.totalAmount}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={
//                   selectedOrder.status === "Delivered"
//                     ? "text-green-600"
//                     : selectedOrder.status === "Pending"
//                     ? "text-orange-500"
//                     : selectedOrder.status === "Preparing"
//                     ? "text-blue-500"
//                     : "text-red-500"
//                 }
//               >
//                 {selectedOrder.status}
//               </span>
//             </p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(selectedOrder.createdAt).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Payment:</strong> {selectedOrder.paymentMode}
//             </p>

//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
//               onClick={() => setSelectedOrder(null)}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserOrders ; usre confirm cancel dono option lga do   with api ke sath http://localhost:5000/v1/api/orders/68c8eed1a04c81d44d7120ac/cancel http://localhost:5000/v1/api/orders/68c8eed1a04c81d44d7120ac/confirm tum kuch bhi chnage smat kro design me kisi bhi jgh chnageg m at kor bss tum jomne apu di usko lgao vo option lga do ki user confrim kre ya fir cancel kre vhi db me save ho