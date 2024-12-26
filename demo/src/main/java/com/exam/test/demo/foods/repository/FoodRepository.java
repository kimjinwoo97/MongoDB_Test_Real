package com.exam.test.demo.foods.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.exam.test.demo.food.domain.Food;

@Repository
public interface FoodRepository extends MongoRepository<Food, String> {
  Optional<Food> findById(String id);
  List<Food> findAll();
  Optional<Food> findByFoodName(String foodName);
}