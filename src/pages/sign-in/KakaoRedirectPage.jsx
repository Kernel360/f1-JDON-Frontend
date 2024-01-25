import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

const KakaoRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useRecoilState(userInfo);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get("value");
    const hmac = searchParams.get("hmac");
    // if (data.hmac === hmac) {
    //   navigate("/main"); // 이미 존재하는 경우 메인 페이지로 이동
    // } else {
    //   navigate("/signin"); // 새로운 인증 정보인 경우 정보 입력 페이지로 이동
    //   setData((prev) => ({ ...prev, encrypted: value, hmac: hmac }));
    //   // userInfo에 이미 value와 hmac이 존재하는지 확인
    // }
    console.log(value, hmac);
  }, [location]);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default KakaoRedirectPage;
