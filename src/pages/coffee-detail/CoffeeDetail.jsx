import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/common/Header";
import InfoBox from "./InfoBox";
import paste from "../../assets/icons/paste.svg";
import { URLInput } from "../PageStyles";
import Buttons from "./Button";
import eye from "../../assets/icons/eye.svg";
import { useEffect } from "react";
import { getCoffeeChatDetail } from "../../api/api";

const MockData = {
  coffeechatId: 2,
  nickname: "안소",
  job: "backend",
  title: "주니어 백엔드 개발자를 대상으로 커피챗을 엽니다.",
  createdDate: "2023-10-10 19:30",
  status: "모집중",
  totalRecruitCount: 20,
  currentRecruitCount: 8,
  meetDate: "2023-10-10 19:30",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo",
  openChatUrl: "openkakao.dfkjwhf.wdjfhwkj/wkdjfhwkj",
  viewCount: 76,
};

function CoffeeDetail() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoffeeChatDetail(1);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching hot skills:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <CssBaseline />
      <Header title={MockData.title} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            px: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Typography
              sx={{ color: "#1D1D1D", fontWeight: 400, fontSize: "13px" }}
            >
              {MockData.nickname}
            </Typography>
            <Typography
              variant="body2"
              color="#FF814D"
              border="1px solid #FF814D"
              borderRadius="999px"
              sx={{
                width: "fit-content",
                padding: "3px 6px",
                fontSize: "12px",
              }}
            >
              {MockData.job}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "#B9B9B9",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <img src={eye} alt="조회수" />
            {MockData.viewCount}
          </Typography>
        </Box>
        <Typography sx={{ px: "6px", fontSize: "20px", mt: "22px" }}>
          {MockData.title}
        </Typography>
        <InfoBox data={MockData} />
        <Divider />

        <Typography sx={{ color: "#545459", py: 5 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatu Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id es
        </Typography>
        <Typography sx={{ fontWeight: 600, pt: "10px" }}>오픈채팅</Typography>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={URLInput}
          placeholder="openkakao.comasdkj/dkjfwkjdfhkwdjf"
          InputProps={{
            readOnly: true,
            disabled: true,
            endAdornment: (
              <InputAdornment position="end" sx={{ background: "transparent" }}>
                <Button>
                  <img src={paste} alt="복사" />
                </Button>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Buttons></Buttons>
      </Box>
    </Container>
  );
}

export default CoffeeDetail;
