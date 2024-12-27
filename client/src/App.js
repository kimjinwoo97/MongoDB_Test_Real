import "./App.scss";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./components/loading/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/nav/Navbar";
import FoodList from "./pages/food/FoodList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "./atoms/userAtom.js";
import Api from "./axios/api.js";
import Confirm from "./components/common/Confirm.jsx";

// 컴포넌트를 lazy loading으로 가져옴
const HomePage = lazy(() => import("./pages/home/HomePage"));
const SigninPage = lazy(() => import("./pages/auth/SigninPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const SeatPage = lazy(() => import("./pages/seat/SeatPage.jsx"));
const SeatAddPage = lazy(() => import("./pages/seat/SeatAddPage.jsx"));

const ProtectedRoute = () => {
  const { user, loading } = useRecoilValue(userState); // value가 들어가 있으면 getter고 set이 들어가있으면 setter

  if (loading) return <Loading />; // 로딩 중일 때 표시할 내용

  return user ? <Outlet /> : <Navigate to="/auth/signin" />; // 로그인 하지 않았다면 signin 페이지로 리다이렉트
};

function App() {
  const location = useLocation();
  const setUserInfo = useSetRecoilState(userState); // setter

  useEffect(() => {
    // localStorage.clear();

    const fetchUserData = async () => {
      try {
        const response = await Api.get("/api/auth/me");
        setUserInfo({ user: response.data.data, loading: false });
      } catch (error) {
        setUserInfo({ user: null, loading: false }); // 권한 없음 시 로그아웃 처리
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData();
    } else {
      setUserInfo({ user: null, loading: false });
    }
  }, [setUserInfo]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        // limit={1} // 알람 개수 제한
      />
      <Confirm />

      <Suspense fallback={<Loading />}>
        {location.pathname.startsWith("/auth") ? null : <Navbar />}
        <Routes>
          {/* Basic Redirect */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/food-menu" element={<FoodList />} />
            <Route path="/seat-menu" element={<SeatPage />} />
            <Route path="/seat-add" element={<SeatAddPage />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/auth">
            <Route path="signin" element={<SigninPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
