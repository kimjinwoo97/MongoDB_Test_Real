import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../../axios/api";
import { toast } from "react-toastify";

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await Api.post("/api/auth/signup", {
        userId: data.userId,
        userName: data.userName,
        pwd: data.pwd,
      });

      // 회원가입 성공 시
      if (res.status === 200) {
        navigate("/auth/signin?registered=true"); // 로그인 페이지로 리디렉션
      }
    } catch (error) {
      toast.error(
        error.response?.data.msg ||
          "알 수 없는 오류가 발새했습니다. 잠시 후 다시 시도해주세요."
      ); // 에러 메시지 표시
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <input
          type="text"
          {...register("userName", { required: true })}
          placeholder="NAME"
        />
        {errors.userName && <span>NAME is required</span>}
      </div>
      <div className="input-container">
        <input
          type="text"
          {...register("userId", { required: true })}
          placeholder="ID"
        />
        {errors.userId && <p>ID is required</p>}
      </div>
      <div className="input-container">
        <input
          type="password"
          {...register("pwd", { required: true })}
          placeholder="Password"
        />
        {errors.pwd && <p>Password is required</p>}
      </div>
      <div className="btn-container">
        <button className="btn" type="submit">
          로그인
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
