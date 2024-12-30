package com.portfolio.service;

import com.portfolio.model.Stock;
import com.portfolio.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.portfolio.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }


    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }
    public Stock getStockById(Long id) {
        Optional<Stock> stock = stockRepository.findById(id);
        if (stock.isPresent()) {
            return stock.get();
        } else {
            throw new ResourceNotFoundException("Stock not found with id: " + id);
        }
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }


    public double calculatePortfolioValue(List<Stock> stocks) {
        return stocks.stream()
                .mapToDouble(stock -> stock.getBuyPrice() * stock.getQuantity())
                .sum();
    }

  
    public Stock updateStock(Long id, Stock updatedStock) {
        Optional<Stock> optionalStock = stockRepository.findById(id);
        if (optionalStock.isPresent()) {
            Stock existingStock = optionalStock.get();

            existingStock.setName(updatedStock.getName());
            existingStock.setTicker(updatedStock.getTicker());
            existingStock.setQuantity(updatedStock.getQuantity());
            existingStock.setBuyPrice(updatedStock.getBuyPrice());
            return stockRepository.save(existingStock);
        } else {
            throw new RuntimeException("Stock with ID " + id + " not found.");
        }
    }
}
