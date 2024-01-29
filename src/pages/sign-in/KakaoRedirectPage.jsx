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
    const value = searchParams.get("value");
    const valueWithoutSpac = value.replace(/\s/g, "");
    const hmac = searchParams.get("hmac");
    const hmacWithoutSpace = hmac.replace(/\s/g, "");
    const code = searchParams.get("code");
    console.log(valueWithoutSpac, hmacWithoutSpace);

    if (hmac) {
      navigate("/info"); // 이미 존재하는 경우 메인 페이지로 이동
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
