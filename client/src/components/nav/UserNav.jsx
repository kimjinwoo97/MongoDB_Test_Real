import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Api from "../../axios/api";
import style from "./nav.module.scss";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";

const UserNav = () => {
  const [{ user }, setUserInfo] = useRecoilState(userState);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await Api.post("/api/auth/signout", {}, { withCredentials: true });

      // 사용자 정보와 토큰 제거
      setUserInfo({ user: null, loading: false }); // Context에서 사용자 정보 제거
      localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거

      // 로그인 페이지로 리다이렉트 (쿼리 파라미터 추가)
      navigate("/auth/signin?signout=true");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="flex">
      <div>
        <div>
          <div>
            <Link to="/seat-menu">자리</Link>
          </div>
          <div>
            <Link to="#">요금</Link>
          </div>
          <div>
            <Link to="/foods">메뉴</Link>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="pointer"
      >
        <FaUserCircle size={30} />
      </button>
      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className={`flex ${style.dropdown_menu}`}>
          <div>
            <Link to="#">{user.userName}님</Link>
          </div>
          <div>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNav;
