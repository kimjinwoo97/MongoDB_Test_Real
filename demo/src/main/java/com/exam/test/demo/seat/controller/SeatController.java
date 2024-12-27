package com.exam.test.demo.seat.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.test.demo.dto.SeatDto;
import com.exam.test.demo.exception.CustomException;
import com.exam.test.demo.res.ResponseDto;
import com.exam.test.demo.seat.domain.Seat;
import com.exam.test.demo.seat.service.SeatService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/seats")
public class SeatController {
  private SeatService seatService;
  // private final SeatService SEAT_SERVICE; -> final을 쓸꺼면 이렇게 작성해야함
  private static final Logger logger = LoggerFactory.getLogger(SeatController.class);

  public SeatController(SeatService seatService) {
    this.seatService = seatService;
  }

  @GetMapping("/")
  public ResponseEntity<ResponseDto<?>> getSeatAll() {
    try {
      ResponseDto<List<SeatDto>> res = seatService.getSeatAll();

      logger.info("ResponseDto<List<SeatDto>>: {}", res);

      return ResponseEntity.ok().body(res);
    } catch (Exception e) {
      return ResponseEntity.internalServerError()
        .body(new ResponseDto<>("", "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."));
    }
  }

  @PostMapping("/add")
  public ResponseEntity<ResponseDto<String>> addSeat(@RequestBody SeatDto seatDto) {
      try {
        logger.info("SeatDto: {}", seatDto);

        ResponseDto<String> res = seatService.addSeat(seatDto); 
        return ResponseEntity.ok().body(res);
      } catch (Exception e) {
        return ResponseEntity.internalServerError().body(new ResponseDto<>("", "서버 오류로 인해 좌석 추가에 실패하였습니다. 잠시 후 다시 시도해 주세요."));
      }
  }
  
  @PutMapping("seat-update")
  public ResponseEntity<ResponseDto<?>> putMethodName(@RequestBody SeatDto seatDto) {
      try {      
        return ResponseEntity.ok().body(seatService.updateSeatOne(seatDto));
      } catch (CustomException e) {
        return ResponseEntity.badRequest().body(new ResponseDto<>("", e.getMessage()));
      } catch (Exception e) {
        return ResponseEntity.internalServerError().body(new ResponseDto<>("", "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."));
      }
  }
}
