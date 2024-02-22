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
import { theme } from "../../styles/themeMuiStyle";

function Coffeeopen() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    totalRecruitCount: "",
    meetDate: "",
    openChatUrl: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const updateFormValue = (field, newValue) => {
    setFormValue((prev) => ({ ...prev, [field]: newValue }));
  };

  const submitCoffeeChat = async () => {
    if (isRegistered) {
      alert("이미 등록된 커피챗입니다");
      return;
    }
    try {
      console.log("등록시", formValue);
      await registerCoffeeChat(formValue);
      setIsRegistered(true);
      if (
        window.confirm(
          "신청이 완료되었습니다. 커피챗 신청 내역을 확인하시겠습니까?"
        )
      ) {
        navigate("/mypage");
      }
    } catch (error) {
      console.error("Error registering coffee chat:", error);
    }
  };

  const formatDateTime = (date) => {
    if (!date) return;
    console.log("변환전 데이터", date);

    // const dateString = date.toString(); // date 객체를 문자열로 변환
    // const year = String(new Date(dateString).getFullYear());
    // const month = String(new Date(dateString).getMonth() + 1).padStart(2, "0");
    // const day = String(new Date(dateString).getDate()).padStart(2, "0");
    // const hours = String(new Date(dateString).getHours()).padStart(2, "0");
    // const minutes = String(new Date(dateString).getMinutes()).padStart(2, "0");
    // const customFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    const time = date.getHours() + ":" + date.getMinutes();

    const isoDate = date.toISOString();

    // ISO 형식에서 날짜와 시간 부분을 추출
    const [datePart] = isoDate.split("T");

    // 시간 부분을 hh:mm 형식으로 추출
    // const time = timePart.substring(0, 5);

    // 날짜 부분을 yyyy-mm-dd 형식으로 추출
    const [year, month, day] = datePart.split("-");
    const formattedDate = `${year}-${month}-${day} ${time}`;

    updateFormValue("meetDate", formattedDate);

    console.log("변환한 데이터", formattedDate);
  };

  const allFieldsFilled = Object.values(formValue).every((value) => value);

  return (
    <>
      <Container maxWidth="sm" display="flex" flexDirection="column">
        <CssBaseline />
        <Header title="커피챗 오픈" />
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            fontSize={18}
            fontWeight={600}
            paddingTop={1}
            textAlign="left"
          >
            커피챗 정보를 입력해주세요 ☕️
          </Typography>
          <Box
            component="form"
            noValidate
            mt="30px"
            display="flex"
            flexDirection="column"
            gap="13px"
            width="100%"
          >
            <NewInput
              placeholder="커피챗 제목을 입력해주세요"
              label="제목"
              value={formValue.title}
              valid={false}
              onChange={(e) => {
                updateFormValue("title", e.target.value);
              }}
            />
            <NewInput
              placeholder="커피챗 내용을 입력해주세요"
              label="상세 내용"
              value={formValue.content}
              isMultiline={true}
              onChange={(e) => {
                updateFormValue("content", e.target.value);
              }}
            />
            <Box>
              <Grid
                container
                width="100%"
                display="flex"
                justifyContent="space-between"
              >
                <Grid item xs={5.6}>
                  <NewInput
                    placeholder="숫자만 입력해주세요"
                    label="총 모집 인원"
                    type="number"
                    min={0}
                    value={
                      formValue.totalRecruitCount && formValue.totalRecruitCount
                    }
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (!isNaN(newValue) && parseInt(newValue, 10) >= 0) {
                        updateFormValue(
                          "totalRecruitCount",
                          parseInt(newValue, 10)
                        );
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={5.6}>
                  <NewDayPicker
                    label="일시"
                    daytime={true}
                    value={formValue.meetDate}
                    onChange={(newValue) => {
                      formatDateTime(newValue);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <NewInput
              placeholder="오픈채팅방 링크를 입력해주세요"
              label="오픈채팅방 링크"
              value={formValue.openChatUrl}
              onChange={(e) => {
                updateFormValue("openChatUrl", e.target.value);
              }}
            />
            <Button
              onClick={submitCoffeeChat}
              disabled={!allFieldsFilled || isRegistered}
              sx={{
                mt: 3,
                mb: 3,
                width: "100%",
                p: "13px",
                fontSize: "16px",
                borderRadius: "999px",
                background:
                  !isRegistered && allFieldsFilled
                    ? theme.palette.primary.main
                    : "#EBEBEB",
                color: !isRegistered && allFieldsFilled ? "white" : "#BCBCC4",
              }}
            >
              {isRegistered ? "이미 등록된 커피챗입니다" : "등록하기"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default Coffeeopen;
