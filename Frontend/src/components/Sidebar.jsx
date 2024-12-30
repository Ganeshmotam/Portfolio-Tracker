import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, PlusCircleIcon,  PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Stock Manager</div>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/" className="flex items-center">
              <HomeIcon className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/add" className="flex items-center">
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add Stock
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/edit" className="flex items-center">
              <PencilSquareIcon className="h-5 w-5 mr-2" />
              Edit Stock
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/delete" className="flex items-center">
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete Stock
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
