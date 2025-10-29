import React, { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

const FoodCard = ({ item }) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-44 object-cover"
      />

      <div className="p-4 flex flex-col justify-between">
        {/* Title + Price */}
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-base font-semibold text-gray-800 leading-tight">
            {item.name}
          </h2>
          <span className="text-orange-600 font-bold">₹{item.price}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm mt-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-medium">{item.rating}</span>
          <span className="text-gray-500">({item.reviews})</span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-lg hover:bg-gray-100"
            onClick={() => qty > 1 && setQty(qty - 1)}
          >
            −
          </button>
          <span className="text-lg font-semibold">{qty}</span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-lg hover:bg-gray-100"
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const MenuGrid = () => {
  const [items, setItems] = useState([
    {
      name: "Double Cheese Tandoori Paneer Tikka Medium Pizza",
      price: 569,
      rating: 4.9,
      reviews: 12,
      image:
        "https://b.zmtcdn.com/data/dish_photos/0c7/1f0b9d9d8c28d60b7a0f20d6cbaf20c7.jpg",
      description:
        "Now with twice the cheesy goodness – Your pizza topped with flavourful Paneer Tikka, Onions, Tomato, Golden Corns and Cheese. (Energy: 1262KCal, Carbohydrates: 117gm, Proteins: 55gm, Fats: 62gm, Sodium: 2337mg)",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...form,
      price: Number(form.price),
      rating: 4.5,
      reviews: 1,
      image: preview || "https://via.placeholder.com/400x250?text=Food+Item",
    };
    setItems([...items, newItem]);

    // Reset form
    setForm({ name: "", price: "", description: "" });
    setImage(null);
    setPreview(null);
    setOpen(false);
  };

  return (
    <div className="p-6">
      {/* Add Item Button */}
      <div className="flex justify-center mb-6">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 shadow-md"
          onClick={() => setOpen(true)}
        >
          + Add Item
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <FoodCard key={idx} item={item} />
        ))}
      </div>

      {/* Popup Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md w-[95%] rounded-2xl p-6">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold z-50"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              🍔 Add New Item
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <Input
              name="name"
              placeholder="Item Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="price"
              placeholder="Price ₹"
              value={form.price}
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Write description..."
              value={form.description}
              onChange={handleChange}
            />

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Upload Item Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg shadow-md mt-2"
                />
              )}
            </div>

            <DialogFooter className="flex gap-2 mt-4 justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuGrid;
