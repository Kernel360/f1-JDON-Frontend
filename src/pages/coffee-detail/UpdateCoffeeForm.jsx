import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import Header from "components/common/Header";
import NewInput from "components/common/new-input/NewInput";
import NewDayPicker from "components/common/new-daypicker/NewDayPicker";
import { useEffect, useState } from "react";
import {
  getCoffeeChatDetail,
  registerCoffeeChat,
  updateCoffeechat,
} from "api/api";
import { useNavigate, useParams } from "react-router-dom";
import { theme } from "styles/themeMuiStyle";

function UpdateCoffeeForm() {
  const { id } = useParams();
  const [coffeeChatData, setCoffeeChatData] = useState({
    title: "",
    content: "",
    totalRecruitCount: "",
    meetDate: "",
    openChatUrl: "",
  });
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCoffeeChatDetail(id);
        console.log(res);
        setCoffeeChatData(res);
      } catch (error) {
        console.error("Error fetching coffee chat detail:", error);
      }
    })();
  }, [id]);

  const handleInputChange = async (field, newValue) => {
    setCoffeeChatData((prev) => ({ ...prev, [field]: newValue }));
  };

  const hanldeRegister = async () => {
    try {
      if (id) {
        await updateCoffeechat(id, coffeeChatData);
        alert("커피챗이 수정되었습니다.");
      } else {
        await registerCoffeeChat(coffeeChatData);
        alert("커피챗이 생성되었습니다.");
      }
      navigate(`/coffee/${id}`);
    } catch (error) {
      console.error("Error fetching hot skills:", error);
    }
  };

  //시간 데이터 가공
  const formatDateTime = (date) => {
    console.log("@@날것확인", date);
    const dateString = date.toString(); // date 객체를 문자열로 변환

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

    const year = String(new Date(dateString).getFullYear());
    const month = String(new Date(dateString).getMonth() + 1).padStart(2, "0");
    const day = String(new Date(dateString).getDate()).padStart(2, "0");
    const hours = String(new Date(dateString).getHours()).padStart(2, "0");
    const minutes = String(new Date(dateString).getMinutes()).padStart(2, "0");

    const customFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    console.log("@@customFormattedDate 확인", customFormattedDate);

    handleInputChange("meetDate", customFormattedDate);
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
          flexGrow={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography fontSize={18} fontWeight={600} paddingTop={1}>
            수정하실 커피챗 정보를 입력해주세요 ☕️
          </Typography>
          <Box
            component="form"
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
              value={coffeeChatData.title}
              valid={false}
              onChange={(e) => {
                handleInputChange("title", e.target.value);
              }}
            />
            <NewInput
              placeholder="커피챗 내용을 입력해주세요"
              label="상세 내용"
              value={coffeeChatData.content}
              isMultiline={true}
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
                    min={0}
                    value={
                      coffeeChatData.totalRecruitCount &&
                      coffeeChatData.totalRecruitCount
                    }
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (!isNaN(newValue) && parseInt(newValue, 10) >= 0) {
                        handleInputChange(
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
                    value={coffeeChatData.meetDate}
                    onChange={(newValue) => {
                      formatDateTime(newValue);
                      // console.log("바로확인", newValue);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <NewInput
              placeholder="오픈채팅방 링크를 입력해주세요"
              label="오픈채팅방 링크"
              value={coffeeChatData.openChatUrl}
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
                background:
                  coffeeChatData.title &&
                  coffeeChatData.content &&
                  coffeeChatData.openChatUrl &&
                  coffeeChatData.meetDate &&
                  coffeeChatData.totalRecruitCount
                    ? theme.palette.primary.main
                    : "#EBEBEB",
                color:
                  coffeeChatData.title &&
                  coffeeChatData.content &&
                  coffeeChatData.openChatUrl &&
                  coffeeChatData.meetDate &&
                  coffeeChatData.totalRecruitCount
                    ? "white"
                    : "#BCBCC4",
                fontSize: "16px",
              }}
            >
              수정하기
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default UpdateCoffeeForm;
