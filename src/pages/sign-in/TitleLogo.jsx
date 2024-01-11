import { Divider, Typography } from "@mui/material";
import logo from "../../assets/images/logo.svg";

function TitleLogo() {
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
        {" "}
        당신의 job description을 on 할 시간
      </Typography>
      <img src={logo} alt="logo" style={{ width: "45%" }} />
      <Divider></Divider>
    </>
  );
}

export default TitleLogo;
