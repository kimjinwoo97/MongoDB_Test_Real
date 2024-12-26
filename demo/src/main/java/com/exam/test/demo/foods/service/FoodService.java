package com.exam.test.demo.foods.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.exam.test.demo.food.domain.Food;
import com.exam.test.demo.foods.repository.FoodRepository;

@Service
public class FoodService {
  private final FoodRepository foodRepository;
  private final String uploadDir = "uploads/";

  public FoodService(FoodRepository foodRepository) {
      this.foodRepository = foodRepository;
  }

  public void initializeFoodData() {
      if (foodRepository.count() == 0) {
          Food food1 = new Food(null, "떡볶이", 5000, null);
          Food food2 = new Food(null, "치즈라면", 3500, null);
          Food food3 = new Food(null, "콜팝", 4500, null);

          foodRepository.save(food1);
          foodRepository.save(food2);
          foodRepository.save(food3);
      }
  }

  public List<Food> getAllFoods() {
      return foodRepository.findAll();
  }

  public Food addFood(Food food, MultipartFile image) throws IOException {
      if (image != null && !image.isEmpty()) {
          String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
          Path filePath = Paths.get(uploadDir + fileName);
          Files.write(filePath, image.getBytes());
          food.setImageUrl("/images/" + fileName);
      }
      return foodRepository.save(food);
  }

  public Food getFoodById(String id) {
      return foodRepository.findById(id).orElse(null);
  }

  public Food getFoodByName(String foodName) {
      return foodRepository.findByFoodName(foodName).orElse(null);
  }

  public Food updateFood(String id, Food updatedFood, MultipartFile image) throws IOException {
      Food existingFood = getFoodById(id);
      if (existingFood != null) {
          existingFood.setFoodName(updatedFood.getFoodName());
          existingFood.setPrice(updatedFood.getPrice());
          if (image != null && !image.isEmpty()) {
              String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
              Path filePath = Paths.get(uploadDir + fileName);
              Files.write(filePath, image.getBytes());
              existingFood.setImageUrl("/images/" + fileName);
          }
          return foodRepository.save(existingFood);
      }
      return null;
  }

  public void deleteFood(String id) {
      foodRepository.deleteById(id);
  }
}