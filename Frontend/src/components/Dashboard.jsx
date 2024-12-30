import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Alpha Vantage API Key (replace with your key)
const API_KEY = "KPCMX3ZI3BMEUI9S";

// Function to get random 5 stock symbols
const getRandomStocks = (stocksList) => {
  let selectedStocks = [];
  while (selectedStocks.length < 5) {
    const randomIndex = Math.floor(Math.random() * stocksList.length);
    const randomStock = stocksList[randomIndex];
    if (!selectedStocks.includes(randomStock)) {
      selectedStocks.push(randomStock);
    }
  }
  return selectedStocks;
};

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [topStock, setTopStock] = useState(null);

  // Fetch stock symbols from backend (Replace with your backend URL)
  const fetchAllStocks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/stocks");
      return response.data.map(stock => stock.ticker); // Assuming the tickers are in the "ticker" field
    } catch (error) {
      console.error("Error fetching stock symbols from backend:", error);
      return [];
    }
  };

  // Function to fetch stock data from Alpha Vantage
  const fetchStockData = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      const timeSeries = response.data["Time Series (5min)"];
      if (timeSeries) {
        const latestTimestamp = Object.keys(timeSeries)[0];
        const latestPrice = parseFloat(timeSeries[latestTimestamp]["4. close"]);
        return { name: symbol, currentPrice: latestPrice };
      }
      return null;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      return null;
    }
  };

  // Fetch 5 random stocks from backend and their data
  const fetchPortfolioStocks = async () => {
    const stockSymbols = await fetchAllStocks(); // Get stock symbols from backend
    if (stockSymbols.length === 0) return;

    const randomStocks = getRandomStocks(stockSymbols); // Get random 5 stocks
    const stocksData = [];
    for (let symbol of randomStocks) {
      const stock = await fetchStockData(symbol);
      if (stock) {
        stocksData.push(stock);
      }
    }
    setStocks(stocksData);
    calculatePortfolioMetrics(stocksData);
  };

  useEffect(() => {
    fetchPortfolioStocks();
  }, []);

  const calculatePortfolioMetrics = (stocks) => {
    let total = 0;
    let top = null;

    stocks.forEach((stock) => {
      const currentValue = stock.currentPrice; // Quantity is assumed to be 1
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
        data: stocks.map((stock) => stock.currentPrice),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderColor: "#fff", // White border to make the slices stand out
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: stocks.map((stock) => stock.name),
    datasets: [
      {
        label: "Stock Value",
        data: stocks.map((stock) => stock.currentPrice),
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
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
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Portfolio Distribution (Pie Chart)</h2>
        <div className="flex justify-center items-center">
          <div style={{ width: '300px', height: '300px', borderRadius: '50%', padding: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Pie data={portfolioDistribution} />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Stock Values (Bar Chart)</h2>
        <div className="flex justify-center">
          <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Stock' } }, y: { title: { display: true, text: 'Value in $' }, beginAtZero: true } } }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
