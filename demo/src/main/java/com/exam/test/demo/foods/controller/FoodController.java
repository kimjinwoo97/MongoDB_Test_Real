// package com.exam.test.demo.foods.controller;

// import java.io.IOException;
// import java.util.List;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import com.exam.test.demo.food.domain.Food;
// import com.exam.test.demo.foods.service.FoodService;

// @RestController
// @RequestMapping("/api/foods")
// public class FoodController {
//   private final FoodService foodService;

//   public FoodController(FoodService foodService) {
//       this.foodService = foodService;
//   }

//   @GetMapping
//   public ResponseEntity<List<Food>> getAllFoods() {
//       return ResponseEntity.ok(foodService.getAllFoods());
//   }

//   @GetMapping("/{id}")
//   public ResponseEntity<Food> getFoodById(@PathVariable String id) {
//       Food food = foodService.getFoodById(id);
//       return food != null ? ResponseEntity.ok(food) : ResponseEntity.notFound().build();
//   }

//   @PostMapping
//   public ResponseEntity<Food> addFood(@RequestPart("food") Food food, 
//                                       @RequestPart(value = "image", required = false) MultipartFile image) {
//       try {
//           Food savedFood = foodService.addFood(food, image);
//           return ResponseEntity.ok(savedFood);
//       } catch (IOException e) {
//           return ResponseEntity.badRequest().build();
//       }
//   }

//   @PutMapping("/{id}")
//   public ResponseEntity<Food> updateFood(@PathVariable String id, 
//                                          @RequestPart("food") Food food,
//                                          @RequestPart(value = "image", required = false) MultipartFile image) {
//       try {
//           Food updatedFood = foodService.updateFood(id, food, image);
//           return updatedFood != null ? ResponseEntity.ok(updatedFood) : ResponseEntity.notFound().build();
//       } catch (IOException e) {
//           return ResponseEntity.badRequest().build();
//       }
//   }

//   @DeleteMapping("/{id}")
//   public ResponseEntity<Void> deleteFood(@PathVariable String id) {
//       foodService.deleteFood(id);
//       return ResponseEntity.noContent().build();
//   }
// }