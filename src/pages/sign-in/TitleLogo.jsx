import { Divider, Typography } from "@mui/material";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import "./index.scss"

function TitleLogo() {
  const navigate = useNavigate()
  
  const logoClickHandler = () => {
    navigate('/')
  }
  return (
    <>
      <Typography
        width="100%"
        sx={{
          fontSize: 16,
          fontWeight: 400,
          color: "#BCBCC4",
          textAlign: "center",
        }}
      >
        당신의 job description을 on 할 시간
      </Typography>
      
      <div class="loginLogo" onClick={logoClickHandler}><img src={logo} alt="logo" style={{ width: "45%" }} /></div>
      <Divider></Divider>
    </>
  );
}

export default TitleLogo;
