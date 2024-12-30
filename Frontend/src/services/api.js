import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchStocks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stocks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

export const fetchStockById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/stocks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stock with id ${id}:`, error);
    throw error;
  }
};

export const addStock = async (stock) => {
  try {
    const response = await axios.post(`${BASE_URL}/stocks`, stock);
    return response.data;
  } catch (error) {
    console.error('Error adding stock:', error);
    throw error;
  }
};

export const updateStock = async (id, stock) => {
  try {
    const response = await axios.put(`${BASE_URL}/stocks/${id}`, stock);
    return response.data;
  } catch (error) {
    console.error(`Error updating stock with id ${id}:`, error);
    throw error;
  }
};

export const deleteStock = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/stocks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting stock with id ${id}:`, error);
    throw error;
  }
};
