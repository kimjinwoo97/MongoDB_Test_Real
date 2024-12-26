package com.exam.test.demo.seat.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.exam.test.demo.dto.SeatDto;
import com.exam.test.demo.res.ResponseDto;
import com.exam.test.demo.seat.domain.Seat;
import com.exam.test.demo.seat.repository.SeatRepository;

@Service
public class SeatService {
  private SeatRepository seatRepository;
  private final ModelMapper modelMapper;
  private static final Logger logger = LoggerFactory.getLogger(SeatService.class);

  public SeatService(SeatRepository seatRepository, ModelMapper modelMapper) { // constructor 라고 한다
    this.seatRepository = seatRepository;
    this.modelMapper = modelMapper;
  }

  public ResponseDto<List<SeatDto>> getSeatAll() {
    List<Seat> seatList = seatRepository.findAll();

    logger.info("seatList: {}", seatList);

    List<SeatDto> seatDtoList = seatList.stream()
      .map(seat -> modelMapper.map(seat, SeatDto.class))
      .toList();

    logger.info("seatDtoList: {}", seatDtoList);

    return new ResponseDto<>(seatDtoList, "좌석 데이터 반환");
  }

  public ResponseDto<String> addSeat(SeatDto seatDto) {
    
    Seat seat = seatRepository.save(modelMapper.map(seatDto, Seat.class));

    return new ResponseDto<>("", seat.getSeatNumber() + "번 좌석이 추가되었습니다.");
  }
}
