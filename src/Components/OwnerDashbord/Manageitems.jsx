import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    description: "",
    size: "",
    quantity: "",
  });
  const [images, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [restaurantOpen, setRestaurantOpen] = useState(true);
  const [formOpen, setFormOpen] = useState(true);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (selectedRestaurant) fetchItems(selectedRestaurant);
  }, [selectedRestaurant]);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/getrestaurants`,
        {},
        { withCredentials: true }
      );
      const list = Array.isArray(res.data.data) ? res.data.data : [];
      setRestaurants(list);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setRestaurants([]);
      navigate("/login");
    }
  };

  const fetchItems = async (restaurantId) => {
    try {
      const res = await axios.post(
        `${baseURL}/getItemById/${restaurantId}`,
        {},
        { withCredentials: true }
      );
      const itemsList = Array.isArray(res.data.items)
        ? res.data.items
        : Array.isArray(res.data)
        ? res.data
        : [];
      setItems(itemsList);
    } catch (err) {
      console.error("Error fetching items:", err);
      setItems([]);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImage(Array.from(e.target.files));

  const resetForm = () => {
    setFormData({
      itemName: "",
      price: "",
      description: "",
      size: "",
      quantity: "",
    });
    setImage(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRestaurant) return alert("Please select a restaurant first!");

    const data = new FormData();
    if (images && images.length > 0)
      images.forEach((img) => data.append("images", img));
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      if (editingId) {
        await axios.put(`${baseURL}/update/${editingId}`, data);
        alert("Item updated successfully");
      } else {
        await axios.post(`${baseURL}/${selectedRestaurant}/items`, data, {
          withCredentials: true,
        });
        alert("Item created successfully");
      }
      resetForm();
      fetchItems(selectedRestaurant);
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${baseURL}/items/${id}`, { withCredentials: true });
      alert("Item deleted successfully");
      fetchItems(selectedRestaurant);
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (item) => {
    setFormData({
      itemName: item.itemName || "",
      price: item.price || "",
      description: item.description || "",
      size: item.size || "",
      quantity: item.quantity || "",
    });
    setEditingId(item._id);
    setFormOpen(true); // Expand form when editing
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Manage Items
      </h1>

      {/* Restaurant Selector - Collapsible */}
      <div className="mb-4 border rounded-lg bg-white shadow">
        <button
          type="button"
          className="w-full flex justify-between items-center p-4 text-lg font-medium focus:outline-none"
          onClick={() => setRestaurantOpen(!restaurantOpen)}
        >
          Select Restaurant
          {restaurantOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {restaurantOpen && (
          <div className="p-4 border-t">
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">-- Choose a restaurant --</option>
              {restaurants.map((restro) => (
                <option key={restro._id} value={restro._id}>
                  {restro.name?.trim() || "Unnamed Restaurant"}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Item Form - Collapsible */}
      {selectedRestaurant && (
        <div className="mb-6 border rounded-lg bg-white shadow">
          <button
            type="button"
            className="w-full flex justify-between items-center p-4 text-lg font-medium focus:outline-none"
            onClick={() => setFormOpen(!formOpen)}
          >
            {editingId ? "Update Item" : "Create Item"}
            {formOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {formOpen && (
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "itemName", placeholder: "Item Name" },
                  { name: "price", placeholder: "Price", type: "number" },
                  { name: "description", placeholder: "Description" },
                  { name: "size", placeholder: "Size (Small, Medium, Large)" },
                  { name: "quantity", placeholder: "Quantity", type: "number" },
                ].map(({ name, placeholder, type = "text" }) => (
                  <input
                    key={name}
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={name === "itemName"}
                  />
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
              >
                {editingId ? "Update" : "Create"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Item List */}
      {selectedRestaurant && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg flex flex-col"
              >
                <img
                  src={
                    item.images?.[0] ||
                    item.image ||
                    "https://placehold.co/300x200"
                  }
                  alt={item.itemName}
                  className="w-full h-40 sm:h-48 object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-2">{item.itemName}</h3>
                <p className="text-gray-500 flex-1">{item.description}</p>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex-1 sm:flex-none text-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex-1 sm:flex-none text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No items found for this restaurant...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageItems;
