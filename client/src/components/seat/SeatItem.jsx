import React from "react";
import "./SeatItem.scss"; // SCSS 파일 import
import Api from "../../axios/api";

const SeatItem = ({ seat, isAdmin }) => {
  const handleUpdate = async (data) => {
    try {
      await Api.put("/api/seats/seat-update", data);
    } catch (error) {}
  };

  return (
    <div>
      {/* 좌석에 대한 정보 */}
      <div className="seat-item">
        <div className="seat-number">{seat.seatNumber}번</div>
        <div className="seat-cost">{seat.cost}원</div>
      </div>

      {/* 좌석을 수정함 */}
      {isAdmin ? (
        <div className="btn-container">
          <button>수정</button>
          <button>삭제</button>
        </div>
      ) : null}
    </div>
  );
};

export default SeatItem;
