import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Api from "../../axios/api";

const AdminNav = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Api.post("/api/auth/signout", {}, { withCredentials: true });

      // 사용자 정보와 토큰 제거
      setUser(null); // Context에서 사용자 정보 제거
      localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거

      // 로그인 페이지로 리다이렉트 (쿼리 파라미터 추가)
      navigate("/auth/signin?signout=true");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div>
      <div>logo</div>
      <div>
        <div>
          <Link to="#">{user.userName}님</Link>
        </div>
        <div>
          <Link to="/seat-menu">자리</Link>
        </div>
        <div>
          <Link to="#">회원</Link>
        </div>
        <div>
          <Link to="#">요금</Link>
        </div>
        <div>
          <Link to="/foods">메뉴</Link>
        </div>
        <div>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;