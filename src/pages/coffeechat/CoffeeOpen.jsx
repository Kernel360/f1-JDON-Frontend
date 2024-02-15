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
import { useEffect, useState } from "react";
import {
  deleteCoffeechat,
  getCoffeeChatDetail,
  registerCoffeeChat,
  updateCoffeechat,
} from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { theme } from "../../styles/themeMuiStyle";

function Coffeeopen() {
  const [value, setValue] = useState([]);
  const { coffeeChatId } = useParams();
  const [coffeeChatData, setCoffeeChatData] = useState({
    title: "",
    content: "",
    totalRecruitCount: "",
    meetDate: "",
    openChatUrl: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (coffeeChatId) {
      getCoffeeChatDetail(coffeeChatId)
        .then((data) => {
          setCoffeeChatData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching coffee chat detail:", error);
        });
    }
  }, [coffeeChatId]);

  const handleInputChange = async (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
  };

  const hanldeRegister = async () => {
    try {
      if (coffeeChatId) {
        // 수정 모드
        await updateCoffeechat(coffeeChatId, coffeeChatData);
        alert("커피챗이 수정되었습니다.");
      } else {
        // 생성 모드
        await registerCoffeeChat(coffeeChatData);
        alert("커피챗이 생성되었습니다.");
      }
      navigate("/coffeechats");
    } catch (error) {
      console.error("Error fetching hot skills:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteCoffeechat(coffeeChatId);
        alert("커피챗이 삭제되었습니다.");
        navigate("/coffeechats");
      } catch (error) {
        console.error("Error deleting coffee chat:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
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
  // const handleConfirm = () => {
  //   if (
  //     window.confirm("신청이 완료되었어요! 커피챗 신청 내역을 확인해보실래요?")
  //   ) {
  //     // 사용자가 '확인'을 클릭한 경우
  //     navigate("/mypage");
  //   } else {
  //     // 사용자가 '취소'를 클릭한 경우
  //     console.log("User clicked cancel.");
  //   }
  // };

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
                    value={value.totalRecruitCount && value.totalRecruitCount}
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
                    value={value.meetDate}
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
                background:
                  value.title &&
                  value.content &&
                  value.openChatUrl &&
                  value.meetDate &&
                  value.totalRecruitCount
                    ? theme.palette.primary.main
                    : "#EBEBEB",
                color:
                  value.title &&
                  value.content &&
                  value.openChatUrl &&
                  value.meetDate &&
                  value.totalRecruitCount
                    ? "white"
                    : "#BCBCC4",
                fontSize: "16px",
              }}
            >
              {coffeeChatId ? "수정하기" : "등록하기"}
            </Button>
            {coffeeChatId && <button onClick={handleDelete}>삭제하기</button>}
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default Coffeeopen;
