import React, { useEffect, useState } from "react";
import { fetchStocks } from "../services/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [topStock, setTopStock] = useState(null);

  useEffect(() => {
    fetchStocks().then((data) => {
      setStocks(data);
      calculatePortfolioMetrics(data);
    });
  }, []);

  const calculatePortfolioMetrics = (stocks) => {
    let total = 0;
    let top = null;

    stocks.forEach((stock) => {
      const currentValue = stock.currentPrice * stock.quantity;
      total += currentValue;
      if (!top || currentValue > top.currentValue) {
        top = { ...stock, currentValue };
      }
    });

    setTotalValue(total);
    setTopStock(top);
  };

  const portfolioDistribution = {
    labels: stocks.map((stock) => stock.name),
    datasets: [
      {
        data: stocks.map((stock) => stock.currentPrice * stock.quantity),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-center mb-4">Portfolio Dashboard</h1>
        <p className="text-lg text-gray-700">
          Total Portfolio Value: ${totalValue.toFixed(2)}
        </p>
        {topStock && (
          <p className="text-lg text-gray-700">
            Top-Performing Stock: {topStock.name} (${topStock.currentValue.toFixed(2)})
          </p>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Pie data={portfolioDistribution} />
      </div>
    </div>
  );
};

export default Dashboard;
