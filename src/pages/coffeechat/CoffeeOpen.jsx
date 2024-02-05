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
  };

  const hanldeRegister = async () => {
    console.log(value);
    try {
      const data = await registerCoffeeChat(value);
      console.log("registerCoffeeChat 확인중", data);
      handleConfirm();
    } catch (error) {
      console.error("Error fetching hot skills:", error);
    }
  };

  //시간 데이터 가공
  const formatDateTime = (date) => {
    console.log("@@날것확인", date);
    const dateString = date.toString(); // date 객체를 문자열로 변환

    // const formattedDate = dateString.split("T")[0];

    const formattedDate = new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식으로 표시
    });

    console.log("@@dateString 확인", dateString);
    console.log("@@포맷확인", formattedDate);

    // 시간이 없는 경우, 기본 시간을 추가
    // if (!dateString.includes(" ")) {
    //   formattedDate += " 00:00";
    // }
    // console.log("@@시간추가 확인", formattedDate);

    // 직접 형식을 지정하여 문자열 생성
    const year = String(new Date(dateString).getFullYear());
    const month = String(new Date(dateString).getMonth() + 1).padStart(2, "0");
    const day = String(new Date(dateString).getDate()).padStart(2, "0");
    const hours = String(new Date(dateString).getHours()).padStart(2, "0");
    const minutes = String(new Date(dateString).getMinutes()).padStart(2, "0");

    const customFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    console.log("@@customFormattedDate 확인", customFormattedDate);

    handleInputChange("meetDate", customFormattedDate);
  };

  // 완료후 안내
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
                  <NewDayPicker
                    label="일시"
                    isMeetDay={true}
                    daytime={true}
                    value={value.meetDate}
                    onChange={(newValue) => {
                      formatDateTime(newValue);
                      console.log("바로확인", newValue);
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
