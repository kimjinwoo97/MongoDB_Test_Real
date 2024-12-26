package com.exam.test.demo.food.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "food")
public class Food {
  @Id
  private String id;
  private String foodName;
  private int price;
  private String imageUrl; // 이미지 URL을 저장할 필드 추가
}