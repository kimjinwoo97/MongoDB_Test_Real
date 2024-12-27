package com.exam.test.demo.seat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.exam.test.demo.seat.domain.Seat;

@Repository
public interface SeatRepository extends MongoRepository<Seat, String>{
  List<Seat> findAll(); // 전체를 가져온다는 의미

  Optional<Seat> findBySeatNumber(int number);

  Optional<Seat> findById(String id);

  boolean existsById(String id);
}