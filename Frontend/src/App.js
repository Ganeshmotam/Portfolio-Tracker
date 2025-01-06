
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
//import StockTable from './components/StockTable';
import { fetchStocks } from './services/api';
import DeleteStockForm from './components/DeleteStockForm';
import EditSelection from './components/EditSelection';
import {  fetchStockById, updateStock } from './services/api';
const App = () => {
  const [stocks, setStocks] = useState([]);
  const [setCurrentStock] = useState(null);

  const loadStocks = () => {
    fetchStocks().then(setStocks);
  };

  useEffect(() => {
    loadStocks();
  }, []);

  // const handleEdit = (stock) => {
  //   setCurrentStock(stock);
  // };

  const handleFormSubmit = () => {
    loadStocks();
    setCurrentStock(null);
  };

  // const handleDelete = () => {
  //   loadStocks();
  // };

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Routes>
            <Route
              path="/"
              element={<Dashboard stocks={stocks} />}
            />
            <Route
              path="/add"
              element={<StockForm onSubmit={handleFormSubmit} />}
            />
             <Route path="/edit" element={<EditSelection stocks={stocks} />} />
             <Route path="/edit/:id" element={<EditStockForm onSubmit={handleFormSubmit} />} />
            <Route
              path="/delete"
              element={<DeleteStockForm onSubmit={handleFormSubmit} />}
            />  

          </Routes>
        </div>
      </div>
    </Router>
  );
};
const EditStockForm = ({ onSubmit }) => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  console.log(id);
  useEffect(() => {
    const fetchStock = async () => {
      const stockData = await fetchStockById(id);
      setStock(stockData);
    };
    fetchStock();
  }, [id]);

  const handleSubmit = async (updatedStock) => {
    await updateStock(id, updatedStock);
    onSubmit();
  };

  if (!stock) {
    return <div>Loading...</div>;
  }

  return <StockForm currentStock={stock} onSubmit={handleSubmit} />;
};
export default App;
