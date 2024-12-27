import React, { useState } from "react";
import Api from "../../axios/api";
import { toast } from "react-toastify";

const SeatAddPage = () => {
  const [newSeat, setNewSeat] = useState({ seatNumber: "", cost: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSeat({ ...newSeat, [name]: value });
  };

  const fetchSeatAdd = async () => {
    try {
      console.log(newSeat);
      const res = await Api.post("/api/seats/add", newSeat);
      setNewSeat({ seatNumber: "", cost: "" });
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSeatAdd();
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="seatNumber"
            onChange={handleInputChange}
            placeholder="좌석번호"
          />
          <input
            type="number"
            name="cost"
            onChange={handleInputChange}
            placeholder="좌석가격"
          />
          <button type="submit">추가</button>
        </form>
      </div>
    </div>
  );
};

export default SeatAddPage;
