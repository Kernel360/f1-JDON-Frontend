import { Box } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function InfoBox({ data }) {
  const dateTime = data.meetDate;

  // Date 객체 생성
  const date = new Date(dateTime);

  // 날짜와 시간 포맷팅
  const formattedDate = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
  return (
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
        {data.currentRecruitCount}/{data.totalRecruitCount}
      </Box>
    </Box>
  );
}

export default InfoBox;
