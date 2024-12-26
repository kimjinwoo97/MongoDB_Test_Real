import React from "react";
import style from "./PcNoticeItem.module.scss";

const PcNoticeItems = ({ title, content }) => {
  return (
    <div className={`${style.notice_item_container}`}>
      <h1 className={`${style.notice_title}`}>{title}</h1>
      <h4 className={`${style.notice_content}`}>{content}</h4>
    </div>
  );
};

export default PcNoticeItems;
