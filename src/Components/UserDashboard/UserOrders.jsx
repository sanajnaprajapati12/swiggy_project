// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const API_BASE = import.meta.env.VITE_API_BASE_URL;
//   const userData = JSON.parse(localStorage.getItem("user")) || null;
//   const userId = userData?._id || userData?.id;

//   const token = localStorage.getItem("token");

//   const fetchOrders = async () => {
//      if (!userId) {
//        console.error("❌ userID ID not found in localStorage");
//        setLoading(false);
//        return;
//      }
//     try {
//       const res = await axios.get(`${API_BASE}/user/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("User ID:", userId);
//       console.log("Orders Response:", res.data);

//       if (res.data.success && Array.isArray(res.data.orders)) {
//         setOrders(res.data.orders);
//       } else {
//         setOrders([]);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching orders:", err);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 10000); // optional refresh
//     return () => clearInterval(interval);
//   }, [userId]);

//   if (loading) {
//     return <p className="p-6 text-gray-500">Loading orders...</p>;
//   }

//   return (
//     <div className="p-4 md:p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-500 py-6">No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white p-4 md:p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//             >
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-800 text-sm md:text-base">
//                   Order ID: {order._id}
//                 </p>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   User ID: {order.userId?._id || order.userId}
//                 </p>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Restaurant:{" "}
//                   {order.restaurantId?.name
//                     ? order.restaurantId.name.replace(/"/g, "")
//                     : "N/A"}
//                 </p>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Items:{" "}
//                   {order.items && order.items.length > 0
//                     ? order.items.map((i) => i.name).join(", ")
//                     : "No items"}
//                 </p>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Total: ₹{order.totalAmount}
//                 </p>
//                 <p
//                   className={`font-semibold text-sm md:text-base ${
//                     order.status === "Delivered"
//                       ? "text-green-600"
//                       : order.status === "Pending"
//                       ? "text-orange-500"
//                       : order.status === "Preparing"
//                       ? "text-blue-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   Status: {order.status}
//                 </p>
//                 <p className="text-gray-500 text-sm md:text-base">
//                   Date: {new Date(order.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserOrders;
import React, { useState, useEffect } from "react";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Dummy orders data
    const dummyOrders = [
      {
        _id: "1",
        status: "Delivered",
        paymentMode: "COD",
        paymentStatus: "Paid",
        totalAmount: 250,
        restaurantId: { name: "Spicy Bites" },
        deliveryAddress: {
          house: "123",
          street: "MG Road",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
        },
        items: [
          { _id: "a1", name: "Pav Bhaji", price: 200, quantity: 1 },
          { _id: "a2", name: "Coke", price: 50, quantity: 1 },
        ],
        cancellationReason: "",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        status: "Pending",
        paymentMode: "Online",
        paymentStatus: "Unpaid",
        totalAmount: 300,
        restaurantId: { name: "Pizza House" },
        deliveryAddress: {
          house: "456",
          street: "MG Road",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
        },
        items: [{ _id: "b1", name: "Pizza", price: 300, quantity: 1 }],
        cancellationReason: "",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "3",
        status: "Cancelled",
        paymentMode: "COD",
        paymentStatus: "Unpaid",
        totalAmount: 150,
        restaurantId: { name: "Burger Hub" },
        deliveryAddress: {
          house: "789",
          street: "MG Road",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
        },
        items: [{ _id: "c1", name: "Burger", price: 150, quantity: 1 }],
        cancellationReason: "Customer requested cancellation",
        createdAt: new Date().toISOString(),
      },
    ];

    setOrders(dummyOrders);
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        My Orders
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
          >
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Status:{" "}
                <span
                  className={`font-bold ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </span>
              </h2>

              <p className="text-gray-600 text-sm md:text-base mb-1">
                Payment: {order.paymentMode} ({order.paymentStatus})
              </p>

              <p className="text-gray-600 text-sm md:text-base mb-1">
                Total: ₹{order.totalAmount}
              </p>

              <p className="text-gray-600 text-sm md:text-base mb-2">
                Restaurant: {order.restaurantId.name}
              </p>

              {order.deliveryAddress && (
                <p className="text-gray-600 text-sm md:text-base mb-2">
                  Address: {order.deliveryAddress.house},{" "}
                  {order.deliveryAddress.street}, {order.deliveryAddress.city},{" "}
                  {order.deliveryAddress.state} -{" "}
                  {order.deliveryAddress.pincode}
                </p>
              )}

              <h3 className="font-semibold mt-2 mb-1 text-gray-700">Items:</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm md:text-base">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} x {item.quantity} - ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>

              {order.cancellationReason && (
                <p className="text-red-500 mt-2 text-sm md:text-base">
                  Cancellation Reason: {order.cancellationReason}
                </p>
              )}
            </div>

            <p className="text-gray-400 text-xs md:text-sm mt-4">
              Ordered on: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
