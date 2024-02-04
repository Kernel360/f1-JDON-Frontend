import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

const KakaoRedirectPage = () => {
  console.log(2222);
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
      localStorage.setItem("isLoggedInState", false);
      setData((prev) => ({ ...prev, encrypted: value, hmac: hmac }));
    } else {
      navigate("/");
      localStorage.setItem("isLoggedInState", true);
    }
  }, [location, navigate, setData]);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default KakaoRedirectPage;
