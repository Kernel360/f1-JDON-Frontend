import { BtnStyle } from "../PageStyles";

export function KaKaoLoginButton() {
  const handleLogin = () => {
    window.location.href = "https://jdon.kr/oauth2/authorization/kakao";
  };

  return (
    <div onClick={handleLogin} style={BtnStyle("kakao")}>
      <div style={{ color: "#191919", fontSize: "16px", fontWeight: "600" }}>
        <span>카카오톡 로그인</span>
      </div>
    </div>
  );
}
