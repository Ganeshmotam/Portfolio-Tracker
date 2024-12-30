
import React from 'react';
import { Link } from 'react-router-dom';

const EditSelection = ({ stocks }) => {
  return (
    <div>
      <h2>Select a Stock to Edit</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.name} ({stock.ticker})
            <Link to={`/edit/${stock.id}`} className="text-blue-500 ml-2">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditSelection;
