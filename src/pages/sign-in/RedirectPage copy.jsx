import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { Outh } from "../../api/api";

const RedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useRecoilState(userInfo);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("isLoggedInState", false);
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);
    const errorMessage = searchParams.get("error_message");

    // 에러 메시지가 있으면 알림
    if (errorMessage) {
      alert(errorMessage);
    }
    const value = searchParams.get("value");
    const hmac = searchParams.get("hmac");
    const code = searchParams.get("code");
    console.log(value, hmac, code);
    if (hmac) {
      navigate("/info");
      setData((prev) => ({ ...prev, encrypted: value, hmac: hmac }));
    } else {
      navigate("/");
      localStorage.setItem("isLoggedInState", true);
    }
  }, [location, navigate]);
  useEffect(() => {
    const handleLogin = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const value = searchParams.get("value");
        const hmac = searchParams.get("hmac");
        const code = searchParams.get("code");
        console.log(value, hmac, code);
        if (hmac) {
          navigate("/info");
          setData((prev) => ({ ...prev, encrypted: value, hmac: hmac }));
        } else {
          navigate("/");
          localStorage.setItem("isLoggedInState", true);
        }
      } catch (error) {
        if (error.response) {
          console.error("API 호출 실패:", error.response.data.message);
          setError("API 호출 실패: " + error.response.data.message);
        } else if (error.request) {
          // 요청이 전송되지 않은 경우
          console.error("API 요청 실패:", error.request);
          setError("API 요청 실패: 서버 응답이 없습니다.");
        } else {
          // 다른 오류
          console.error("API 호출 오류:", error.message);
          setError("API 호출 오류: " + error.message);
        }
        navigate("/fail");
      }
    };

    // 컴포넌트 마운트 시 소셜 로그인 처리 실행
    handleLogin();
  }, []);
  // userInfo에 이미 value와 hmac이 존재하는지 확인

  // useEffect(() => {
  //   const kakaoLogin = async () => {
  //     await axios({
  //       method: "GET",
  //       withCredentials: true,
  //       //url: `${REDIRECT_URI}/?code=${code}`,
  //       url: `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/kakao`,
  //       headers: {
  //         "Content-Type": "application/json;charset=utf-8",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         localStorage.setItem("name", res.data.account.kakaoName);
  //         navigate("/success");
  //       })
  //       .catch((err) => {
  //         console.log("에러", err);
  //         window.alert("로그인에 실패했습니다.");
  //       });
  //   };
  //   kakaoLogin();
  // }, []);
  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default RedirectPage;
