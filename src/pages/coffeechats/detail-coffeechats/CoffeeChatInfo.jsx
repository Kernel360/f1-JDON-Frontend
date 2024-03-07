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

import TotalInputForm from "components/common/total-input-form/TotalInputForm";
import React, { useRef, useState } from "react";
import { URLInput } from "pages/PageStyles";

function InfoItem({ icon, text, iconColor }) {
  return (
    <Box
      sx={{
        pb: "5px",
        color: "#696969",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {React.cloneElement(icon, {
        sx: { fontSize: "small", color: iconColor },
      })}
      {text}
    </Box>
  );
}

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
        <InfoItem
          icon={<CalendarMonthIcon />}
          text={formattedDate}
          iconColor="#FF6565"
        />

        <InfoItem
          icon={<AccessTimeFilledIcon />}
          text={formattedTime}
          iconColor="#52BF91"
        />

        <InfoItem
          icon={<PeopleAltIcon />}
          text={`${coffeeChatData.currentRecruitCount} / ${coffeeChatData.totalRecruitCount}`}
          iconColor="#575757"
        />
      </Box>
      <Divider />
      <Typography
        sx={{
          color: "#545459",
          minHeight: "180px",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        {coffeeChatData.content?.split("\n").map((line, index) => (
          <p key={index}>
            {line}
            <br />
          </p>
        ))}
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
