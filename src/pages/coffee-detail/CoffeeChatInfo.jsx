import {
  Box,
  Divider,
  Typography,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { URLInput } from "../PageStyles";
import TotalInputForm from "../../components/common/total-input-form/TotalInputForm";
import { useRef, useState } from "react";

function CoffeeChatInfo({ coffeeChatData, canView, isParticipant }) {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef(null);
  const hasAuthenticate = canView || isParticipant;

  const dateTime = coffeeChatData.meetDate;

  const date = new Date(dateTime);

  const formattedDate = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(coffeeChatData.openChatUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
    }
  };

  return (
    <>
      <Typography sx={{ px: "6px", fontSize: "20px", mt: "22px" }}>
        {coffeeChatData.title}
      </Typography>
      <Box
        sx={{
          borderRadius: "10px",
          width: "100%",
          heigth: "64px",
          background: "#F3F5FF",
          my: "24px",
          py: "16px",
          px: "16px",
        }}
      >
        <Box
          sx={{
            pb: "10px",
            color: "#373737",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          [ 모집 정보 ]
        </Box>
        <Box
          sx={{
            pb: "5px",
            color: "#9A9AA1",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CalendarMonthIcon sx={{ fontSize: "small", color: "#FF6565" }} />{" "}
          {formattedDate}
        </Box>
        <Box
          sx={{
            pb: "5px",
            color: "#9A9AA1",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <AccessTimeFilledIcon sx={{ fontSize: "small", color: "#52BF91" }} />
          {formattedTime}
        </Box>
        <Box
          sx={{
            pb: "5px",
            color: "#9A9AA1",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <PeopleAltIcon sx={{ fontSize: "small", color: "#575757" }} />
          {coffeeChatData.currentRecruitCount}/
          {coffeeChatData.totalRecruitCount}
        </Box>
      </Box>
      <Divider />
      <Typography sx={{ color: "#545459", py: 3, minHeight: "180px" }}>
        {coffeeChatData.content}
      </Typography>
      <TotalInputForm value={false} label="오픈채팅 링크">
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={URLInput}
          ref={inputRef}
          value={
            hasAuthenticate
              ? coffeeChatData.openChatUrl
              : "신청 후 확인 가능합니다"
          }
          InputProps={{
            readOnly: true,
            disabled: true,
            endAdornment: hasAuthenticate && (
              <InputAdornment position="end" sx={{ background: "transparent" }}>
                <Button onClick={handleCopyClick}>
                  {isCopied ? (
                    <p style={{ fontSize: "12px" }}>Copied!</p>
                  ) : (
                    <FileCopyIcon sx={{ fontSize: 20, color: "#BCBCC4" }} />
                  )}
                </Button>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </TotalInputForm>
    </>
  );
}

export default CoffeeChatInfo;
