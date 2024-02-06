import { BtnStyle } from "../PageStyles";
import kakao from "../../assets/images/kakao.svg";

export function KaKaoLoginButton() {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div onClick={handleLogin} style={BtnStyle("kakao")}>
      <div
        style={{
          color: "#191919",
          fontSize: "14px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img src={kakao} />
        <span>카카오톡 로그인</span>
      </div>
    </div>
  );
}
