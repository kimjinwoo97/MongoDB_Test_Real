import React, { useEffect, useState } from "react";
import Api from "../../axios/api";
import { toast } from "react-toastify";
import SeatItem from "../../components/seat/SeatItem";
import { Link } from "react-router-dom";

const SeatPage = () => {
  const [seatList, setSeatList] = useState([]); // 데이터를 사용하기 위한 getter, setter

  // 가장 먼저 해야하는 것
  const fetchSeatList = async () => {
    try {
      const res = await Api.get("/api/seats/");

      console.log(res.data); // res.data => responseDto -> 실제 화면을 꾸밀 data 인스턴스 변수만 뽑아온다 => res.data.data가 된다
      setSeatList(res.data.data);
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSeatList();
  }, []);

  // 컴포넌트화 시킴
  const seatListEls = seatList.map((seat) => (
    <SeatItem key={seat.id} seat={seat} />
  ));

  return (
    <div>
      <Link to="/seat-add">좌석 추가</Link>
      {seatListEls}
    </div>
  );
};

export default SeatPage;
