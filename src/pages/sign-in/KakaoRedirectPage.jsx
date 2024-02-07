import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

const KakaoRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useRecoilState(userInfo);

  useEffect(() => {
    localStorage.setItem("isLoggedInState", false);
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);
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
  // userInfo에 이미 value와 hmac이 존재하는지 확인

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default KakaoRedirectPage;
