import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StockTable = ({ stocks, onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (stockId) => {
    if (isLoading) return; // Prevent multiple calls
    setIsLoading(true);
    await onDelete(stockId);
    setIsLoading(false);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Quantity</th>
          <th>Buy Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id}>
            <td>{stock.name}</td>
            <td>{stock.ticker}</td>
            <td>{stock.quantity}</td>
            <td>{stock.buyPrice}</td>
            <td>
              <Link to={`/edit/${stock.id}`} className="text-blue-500">Edit</Link>
              <button
                onClick={() => handleDelete(stock.id)}
                className="text-red-500 ml-4"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
