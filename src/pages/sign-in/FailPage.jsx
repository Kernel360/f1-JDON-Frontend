import { Box, Button, Container, Typography } from "@mui/material";
import { infoBasicStyles } from "../info/InfoStyles";
import { buttonStyle } from "../../components/common/navigation-btn/NavigationBtnStyles";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

export function FailPage() {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography sx={{ fontSize: "25px", fontWeight: 500, p: 4 }}>
        로그인 실패
      </Typography>
      <Typography sx={infoBasicStyles.typographySubtitle}>
        사용자의 이메일이 등록되지 않았거나 정보 매칭에 실패하였습니다
      </Typography>
      <Box sx={{ padding: 4 }}>
        <Close sx={{ fontSize: "40px" }} />
      </Box>
      <Button
        sx={buttonStyle.EndButton}
        onClick={() => {
          navigate("/signin");
        }}
      >
        로그인 재시도
      </Button>
    </Container>
  );
}
