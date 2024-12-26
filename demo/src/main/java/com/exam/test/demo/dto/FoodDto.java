package com.exam.test.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodDto {
  private String id;
  private String foodName;
  private int price;
  private String imageUrl; // 이미지 URL을 저장할 필드 추가
}
