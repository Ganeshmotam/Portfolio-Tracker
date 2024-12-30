
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
    <div>
      <h2>Manage Stocks</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.name} ({stock.ticker}) - {stock.quantity} units at ${stock.buyPrice}
            <button onClick={() => handleDelete(stock.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteStockForm;
