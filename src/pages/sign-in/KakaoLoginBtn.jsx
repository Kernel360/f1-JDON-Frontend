import { useNavigate } from "react-router-dom";
import { BtnStyle } from "../PageStyles";

export function KaKaoLoginButton() {
  // const CLIENT_ID = "YOUR_CLIENT_ID"; // 여기에 Google Client ID를 넣으세요
  // const REDIRECT_URI = "YOUR_REDIRECT_URI"; // 리디렉션될 URI를 넣으세요
  const navigation = useNavigate();

  const handleLogin = () => {
    // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    navigation("../info");
  };

  return (
    <div onClick={handleLogin} style={BtnStyle("kakao")}>
      <div style={{ color: "#191919", fontSize: "16px", fontWeight: "600" }}>
        <span>카카오톡 로그인</span>
      </div>
    </div>
  );
}
