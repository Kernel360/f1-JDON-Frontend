import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../api/api";

const RedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);

      const value = searchParams.get("value");
      const hmac = searchParams.get("hmac");
      const code = searchParams.get("code");
      console.log(value, hmac, code);
      if (hmac) {
        navigate("/info");
        //  setData((prev) => ({ ...prev, encrypted: value, hmac: hmac }));
      } else {
        navigate("/");
        localStorage.setItem("isLoggedInState", true);
      }
    } catch (error) {
      if (error.response) {
        console.error("API 호출 실패:", error.response.data.message);
        // setError("API 호출 실패: " + error.response.data.message);
      } else if (error.request) {
        // 요청이 전송되지 않은 경우
        console.error("API 요청 실패:", error.request);
        // setError("API 요청 실패: 서버 응답이 없습니다.");
      } else {
        // 다른 오류
        console.error("API 호출 오류:", error.message);
        //  setError("API 호출 오류: " + error.message);
      }
      navigate("/fail");
    }
  };

  // 컴포넌트 마운트 시 소셜 로그인 처리 실행
  handleLogin();

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default RedirectPage;
