
import React from 'react';
import { Link } from 'react-router-dom';

const StockTable = ({ stocks, onEdit, onDelete }) => {
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
