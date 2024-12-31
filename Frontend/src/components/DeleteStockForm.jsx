import React, { useState, useEffect } from 'react';
import { fetchStocks, deleteStock } from '../services/api';

const DeleteStockForm = ({ onSubmit }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        const data = await fetchStocks();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchAllStocks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStock(id);
      setStocks(stocks.filter((stock) => stock.id !== id));
      onSubmit();
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Manage Stocks</h2>
      <ul className="space-y-4">
        {stocks.map((stock) => (
          <li
            key={stock.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-gray-900">{stock.name} ({stock.ticker})</span>
              <span className="text-sm text-gray-600">Quantity: {stock.quantity}</span>
              <span className="text-sm text-gray-600">Price: ${stock.buyPrice}</span>
            </div>
            <button
              className="ml-4 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => handleDelete(stock.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteStockForm;
