package com.exam.test.demo.initializer;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.exam.test.demo.food.domain.Food;
import com.exam.test.demo.foods.repository.FoodRepository;
import com.exam.test.demo.token.TokenService;
import com.exam.test.demo.user.domain.User;
import com.exam.test.demo.user.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenService tokenService;
  private final FoodRepository foodRepository;

  public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenService tokenService, FoodRepository foodRepository) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.tokenService = tokenService;
    this.foodRepository = foodRepository;
  }

  @Override
  public void run(String... args) {
    // users 에 아무런 데이터가 없을 때 super 관리자를 생성함
    if (userRepository.count() == 0) {
      User admin = new User();
      admin.setUserId("admin");
      admin.setUserName("admin");
      admin.setPwd(passwordEncoder.encode("admin1234"));
      admin.setRoles(Arrays.asList("ROLE_SUPER_ADMIN", "ROLE_ADMIN", "ROLE_USER"));

      admin.setToken(tokenService.generateToken(admin.getUserId())); // JWT 생성

      // users 테이블이 최초로 생성되면서 insert가 됨
      userRepository.save(admin);
    }

    // 음식이 하나도 없다면 음식 세 개 정도 넣어줌
    // 내가 최초에 해당 테이블에 데이터를 넣을 때 생성됨
    if (foodRepository.count() == 0) {
      Food food1 = new Food();
      food1.setFoodName("떡볶이");
      food1.setPrice(5000);

      Food food2 = new Food();
      food2.setFoodName("치즈라면");
      food2.setPrice(3500);

      Food food3 = new Food();
      food3.setFoodName("콜팝");
      food3.setPrice(4500);

      // food 테이블이 최초로 생성되면서 insert가 됨
      foodRepository.save(food1);
      foodRepository.save(food2);
      foodRepository.save(food3);
    }
  }
}
