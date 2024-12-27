import React from "react";
import "./SeatItem.scss"; // SCSS 파일 import

const SeatItem = ({ seat }) => {
  return (
    <div className="seat-item">
      <div className="seat-number">{seat.seatNumber}번</div>
      <div className="seat-cost">{seat.cost}원</div>
    </div>
  );
};

export default SeatItem;
