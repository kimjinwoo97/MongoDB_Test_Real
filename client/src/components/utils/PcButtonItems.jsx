import React from "react";
import style from "./PcButtonItem.module.scss";

const PcButtonItems = ({ time, price }) => {
  // time 가공
  const hour = Math.floor(time / 60);
  const minute = time % 60;

  // price 가공
  const formattedPrice = price.toLocaleString();

  return (
    <div className={`${style.pc_item_container}`}>
      <span className={`${style.pc_item__time}`}>
        {hour > 0 ? `${hour}시간` : ""} {minute > 0 ? `${minute}분` : ""}
      </span>
      <button className={`${style.pc_item__price}`}>
        가격: {formattedPrice}
      </button>
    </div>
  );
};

export default PcButtonItems;
