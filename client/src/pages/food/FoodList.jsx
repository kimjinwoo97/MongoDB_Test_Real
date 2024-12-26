import React, { useEffect, useState } from "react";
import Api from "../../axios/api";
import "./FoodList.scss";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({ foodName: "", price: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await Api.get("/api/foods");
      setFoods(response.data);
    } catch (error) {
      console.error("음식 목록 불러오기 실패:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("food", JSON.stringify(newFood));
    if (image) {
      formData.append("image", image);
    }

    try {
      await Api.post("/api/foods", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewFood({ foodName: "", price: "" });
      setImage(null);
      fetchFoods();
    } catch (error) {
      console.error("음식 추가 실패:", error);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      await Api.delete(`/api/foods/${id}`);
      fetchFoods();
    } catch (error) {
      console.error("음식 삭제 실패:", error);
    }
  };

  return (
    <div className="food-list-container">
      <h2>메뉴 목록</h2>
      <form onSubmit={handleAddFood} className="add-food-form">
        <input
          type="text"
          name="foodName"
          value={newFood.foodName}
          onChange={handleInputChange}
          placeholder="음식 이름"
          required
        />
        <input
          type="number"
          name="price"
          value={newFood.price}
          onChange={handleInputChange}
          placeholder="가격"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          accept="image/*"
        />
        <button type="submit">추가</button>
      </form>
      <ul className="food-list">
        {foods.map((food) => (
          <li key={food.id} className="food-item">
            {food.imageUrl && (
              <img
                src={`${process.env.REACT_APP_API_URL}${food.imageUrl}`}
                alt={food.foodName}
              />
            )}
            {food.foodName} - {food.price}원
            <button onClick={() => handleDeleteFood(food.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
