import React, { useState, useEffect } from "react";
import { addStock, updateStock } from "../services/api";

const StockForm = ({ currentStock, onSubmit }) => {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form fields based on `currentStock` prop
  useEffect(() => {
    if (currentStock) {
      setName(currentStock.name || "");
      setTicker(currentStock.ticker || "");
      setQuantity(currentStock.quantity || "");
      setBuyPrice(currentStock.buyPrice || "");
    } else {
      resetForm();
    }
  }, [currentStock]);

  // Reset form fields
  const resetForm = () => {
    setName("");
    setTicker("");
    setQuantity("");
    setBuyPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);

    const stockData = {
      name,
      ticker,
      quantity: parseInt(quantity, 10),
      buyPrice: parseFloat(buyPrice),
    };

    try {
      if (currentStock) {
        // Update existing stock
        const updatedStock = await updateStock(currentStock.id, stockData);
        alert("Stock updated successfully!");
        if (onSubmit) onSubmit(updatedStock); // Notify parent with updated stock
      } else {
        // Add new stock
        const newStock = await addStock(stockData);
        alert("Stock added successfully!");
        if (onSubmit) onSubmit(newStock); // Notify parent with new stock
      }

      resetForm(); // Clear form fields after submission
    } catch (error) {
      console.error("Error saving stock:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while saving the stock. Please try again."
      );
    } finally {
      setIsSubmitting(false); // Re-enable submissions
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {currentStock ? "Edit Stock" : "Add Stock"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stock Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Ticker</label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stock Ticker"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stock Quantity"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Buy Price</label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stock Buy Price"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : currentStock
            ? "Update Stock"
            : "Add Stock"}
        </button>
      </form>
    </div>
  );
};

export default StockForm;
