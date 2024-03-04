import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import Header from "components/common/Header";
import NewInput from "components/common/new-input/NewInput";
import NewDayPicker from "components/common/new-daypicker/NewDayPicker";
import { useEffect, useState } from "react";
import { registerCoffeeChat } from "api/api";
import { useNavigate } from "react-router-dom";
import { theme } from "styles/themeMuiStyle";
import NewBtn from "components/common/new-btn/NewBtn";

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
  const [helperTexts, setHelperTexts] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const updateFormValue = (field, newValue) => {
    setFormValue((prev) => ({ ...prev, [field]: newValue }));
    validateField(field, newValue);
  };

  const validateField = (field, value) => {
    let helperText = "";
    switch (field) {
      case "title":
        helperText =
          value.length < 10 || value.length > 50
            ? "제목은 10자 이상 50자 이하로 작성해주세요"
            : "";
        break;
      case "content":
        helperText =
          value.length < 50 || value.length > 500
            ? "내용은 50자 이상 500자 이하로 작성해주세요"
            : "";
        break;
      case "totalRecruitCount":
        helperText =
          !isNaN(value) && value > 100
            ? "모집인원은 1명 이상 100명 이하로 설정해주세요"
            : "";
        break;
      case "openChatUrl":
        helperText =
          value && !isValidUrl(value) ? "URL형식이 올바르지 않습니다" : "";
        break;
      default:
        return;
    }
    setHelperTexts((prev) => ({ ...prev, [field]: helperText }));
  };

  const isValidUrl = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return pattern.test(url);
  };

  useEffect(() => {
    const isValid =
      Object.values(helperTexts).every((text) => text === "") &&
      Object.values(formValue).every((value) => value);
    setIsFormValid(isValid);
  }, [formValue, helperTexts]);

  const submitCoffeeChat = async (e) => {
    e.preventDefault();
    if (isRegistered) {
      alert("이미 등록된 커피챗입니다");
      return;
    }
    try {
      const res = await registerCoffeeChat(formValue);
      if (!res.data) {
        alert("커피챗 등록에 실패했습니다.");
        return;
      }
      setIsRegistered(true);
      alert("등록이 완료되었습니다");
      navigate(`/coffee/${res.data}`);
    } catch (error) {
      console.error("Error registering coffee chat:", error);
    }
  };

  const formatDateTime = (date) => {
    if (!date) return;
    const time = date.getHours() + ":" + date.getMinutes();
    const isoDate = date.toISOString();
    const [datePart] = isoDate.split("T");
    const [year, month, day] = datePart.split("-");
    const formattedDate = `${year}-${month}-${day} ${time}`;
    updateFormValue("meetDate", formattedDate);
  };

  return (
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
            helperText={helperTexts.title}
            value={formValue.title}
            onChange={(e) => updateFormValue("title", e.target.value)}
          />
          <NewInput
            placeholder="커피챗 내용을 입력해주세요"
            label="상세 내용"
            helperText={helperTexts.content}
            value={formValue.content}
            isMultiline={true}
            onChange={(e) => updateFormValue("content", e.target.value)}
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
                  helperText={helperTexts.totalRecruitCount}
                  type="number"
                  min={0}
                  value={formValue.totalRecruitCount}
                  onChange={(e) => {
                    updateFormValue(
                      "totalRecruitCount",
                      parseInt(e.target.value, 10)
                    );
                    // const newValue = e.target.value;
                    // if (!isNaN(newValue) && parseInt(newValue, 10) >= 0) {
                    //   updateFormValue(
                    //     "totalRecruitCount",
                    //     parseInt(newValue, 10)
                    //   );
                    // }
                  }}
                />
              </Grid>

              <Grid item xs={5.6}>
                <NewDayPicker
                  label="일시"
                  daytime={true}
                  value={formValue.meetDate}
                  onChange={(newValue) => formatDateTime(newValue)}
                />
              </Grid>
            </Grid>
          </Box>
          <NewInput
            placeholder="오픈채팅방 링크를 입력해주세요"
            label="오픈채팅방 링크"
            helperText={helperTexts.openChatUrl}
            value={formValue.openChatUrl}
            onChange={(e) => updateFormValue("openChatUrl", e.target.value)}
          />
          <NewBtn
            title={isRegistered ? "이미 등록된 커피챗입니다" : "등록하기"}
            onClick={submitCoffeeChat}
            disable={!isFormValid || isRegistered}
            isActive={!isFormValid || isRegistered}
            styles={{
              width: "100%",
              p: "13px",
              fontSize: "16px",
              borderRadius: "999px",
              background:
                !isRegistered && isFormValid
                  ? theme.palette.primary.main
                  : "#EBEBEB",
              color: !isRegistered && isFormValid ? "white" : "#BCBCC4",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
export default Coffeeopen;
