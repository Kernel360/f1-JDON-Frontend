import { useNavigate } from "react-router-dom";
import { BtnStyle } from "../PageStyles";

export function GitHubLoginButton() {
  const navigation = useNavigate();
  // const CLIENT_ID = "YOUR_CLIENT_ID";
  // const REDIRECT_URI = "YOUR_REDIRECT_URI";

  const handleLogin = () => {
    // window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
    navigation("../info");
  };

  return (
    <div onClick={handleLogin} style={BtnStyle("git")}>
      <div>
        <span style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>
          깃허브 로그인
        </span>
      </div>
    </div>
  );
}
