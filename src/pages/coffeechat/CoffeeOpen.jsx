import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import Header from "../../components/common/Header";
import NewInput from "../../components/common/new-input/NewInput";
import NewDayPicker from "../../components/common/new-daypicker/NewDayPicker";
import { useState } from "react";
import { registerCoffeeChat } from "../../api/api";
import { useNavigate } from "react-router-dom";

function Coffeeopen() {
  const [value, setValue] = useState([]);
  const navigate = useNavigate();
  const handleInputChange = async (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
    console.log("1111", value);
  };

  const hanldeRegister = async () => {
    console.log("2222", value);
    try {
      const data = await registerCoffeeChat(value);
      console.log("registerCoffeeChat 확인중", data);
      handleConfirm();
    } catch (error) {
      console.error("Error fetching hot skills:", error);
    }
  };

  function formatDateForStorage(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleConfirm = () => {
    if (
      window.confirm("신청이 완료되었어요! 커피챗 신청 내역을 확인해보실래요?")
    ) {
      // 사용자가 '확인'을 클릭한 경우
      navigate("/mypage");
    } else {
      // 사용자가 '취소'를 클릭한 경우
      console.log("User clicked cancel.");
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <CssBaseline />
        <Header title="커피챗 오픈" />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              paddingTop: 1,
              textAlign: "left",
            }}
          >
            커피챗 정보를 입력해주세요 ☕️
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              mt: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "13px",
              width: "100%",
            }}
          >
            <NewInput
              placeholder="커피챗 제목을 입력해주세요"
              label="제목"
              value={value.title}
              valid={false}
              onChange={(e) => {
                handleInputChange("title", e.target.value);
              }}
            />
            <NewInput
              placeholder="커피챗 내용을 입력해주세요"
              label="상세 내용"
              value={value.content}
              onChange={(e) => {
                handleInputChange("content", e.target.value);
              }}
            />
            <Box>
              <Grid
                container
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={5.6}>
                  <NewInput
                    placeholder="숫자만 입력해주세요"
                    label="총 모집 인원"
                    type="number"
                    value={value.totalRecruitCount}
                    onChange={(e) => {
                      handleInputChange("totalRecruitCount", e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={5.6}>
                  <NewInput
                    placeholder="숫자만 입력해주세요"
                    label="시간"
                    value={value.totalRecruitCount}
                    onChange={(e) => {
                      handleInputChange("totalRecruitCount", e.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={5.6}>
                  <NewDayPicker
                    label="일시"
                    isMeetDay={true}
                    value={value.meetDate}
                    onChange={(newValue) => {
                      const meetDate = new Date(newValue); // 예시로 현재 날짜를 사용
                      const formattedMeetDate = formatDateForStorage(meetDate);
                      console.log(formattedMeetDate);
                      //  handleInputChange("meetDate", formattedMeetDate);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <NewInput
              placeholder="오픈채팅방 링크를 입력해주세요"
              label="오픈채팅방 링크"
              value={value.openChatUrl}
              onChange={(e) => {
                handleInputChange("openChatUrl", e.target.value);
              }}
            />
            <Button
              onClick={hanldeRegister}
              sx={{
                mt: 3,
                mb: 3,
                width: "100%",
                p: "13px",
                borderRadius: "999px",
                background: "#6482FF",
                color: "#ffffff",
                fontSize: "16px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "#6482FF", // 클릭(마우스 오버) 시 배경색 변경
                },
              }}
            >
              등록하기
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default Coffeeopen;
