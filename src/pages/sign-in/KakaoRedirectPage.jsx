import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

const KakaoRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useRecoilState(userInfo);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);
    const decodeValue = (value) => {
      try {
        return decodeURIComponent(value);
      } catch (error) {
        console.error("Error decoding value:", error);
        return null;
      }
    };

    const value = decodeValue(searchParams.get("value"));
    const hmac = decodeValue(searchParams.get("hmac"));
    const code = searchParams.get("code");

    console.log(value, hmac, code);
    if (hmac) {
      // navigate("/info"); // 이미 존재하는 경우 메인 페이지로 이동
      setData((prev) => ({ ...prev, encrypted: value, hmac: hmac }));
    }
  }, [location, navigate]);
  //   navigate("/signin"); // 새로운 인증 정보인 경우 정보 입력 페이지로 이동
  // userInfo에 이미 value와 hmac이 존재하는지 확인

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default KakaoRedirectPage;
