import { BtnStyle } from "../PageStyles";
import git from "../../assets/images/github.svg";

export function GitHubLoginButton() {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/github`;
  };

  return (
    <div onClick={handleLogin} style={BtnStyle("git")}>
      <div>
        <div
          style={{
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img src={git} />
          깃허브 로그인
        </div>
      </div>
    </div>
  );
}
