import React from "react";

const SeatItem = ({ seat }) => {
  return (
    <li>
      <div>{seat.number}</div>
      <div>{seat.cost}</div>
    </li>
  );
};

export default SeatItem;
