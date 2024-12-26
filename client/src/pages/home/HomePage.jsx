import React from "react";
import pcData from "../../data/pcData.json";
import PcButtonItems from "../../components/utils/PcButtonItems";
import "./HomePage.scss";
import pcNotice from "../../data/pcNotice.json";
import PcNoticeItems from "../../components/utils/PcNoticeItems";

const HomePage = () => {
  const pcDataEls = pcData.map((el) => <PcButtonItems key={el.id} {...el} />);
  const pcNoticeEls = pcNotice.map((el) => (
    <PcNoticeItems key={el.id} {...el} />
  ));

  return (
    <div className="home-container">
      <main className="main-container">{pcDataEls}</main>
      <article className="second-container">{pcNoticeEls}</article>
    </div>
  );
};

export default HomePage;
