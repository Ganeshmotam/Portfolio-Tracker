import React from 'react';
import { Link } from 'react-router-dom';

const EditSelection = ({ stocks }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Select a Stock to Edit
      </h2>
      <ul className="space-y-4">
        {stocks.map((stock) => (
          <li key={stock.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
            <div>
              <span className="font-semibold text-lg text-gray-900">{stock.name}</span>
              <span className="text-sm text-gray-600">({stock.ticker})</span>
            </div>
            <Link
              to={`/edit/${stock.id}`}
              className="ml-4 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditSelection;
