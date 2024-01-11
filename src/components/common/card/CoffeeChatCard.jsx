import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import { BadgeStyle } from "./CardStyle";
import { useNavigate, useParams } from "react-router-dom";

function CoffeeChatCard({ data }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`./${data.coffeechatId}`);
  };
  return (
    <Paper
      onClick={handleClick}
      elevation={0}
      sx={{
        pointer: "cursor",
        my: 1,
        border: "1px solid #BCBCC4",
        borderRadius: "8px",
        height: "220px",
        position: "relative",
        opacity: data.activeStatus === "종료" ? 0.4 : 1,
      }}
    >
      <div style={BadgeStyle(data.activeStatus)}>{data.activeStatus}</div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          padding: "20px 16px",
          height: "100%",
        }}
      >
        <Typography variant="body2" color="#9A9AA1" sx={{ display: "flex" }}>
          {data.nickname}
        </Typography>
        <Typography
          color="#545459"
          fontWeight="600"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // 이 값으로 표시할 줄 수를 설정합니다.
            textOverflow: "ellipsis",
            height: 45,
            fontSize: "16px",
          }}
        >
          {data.title}
        </Typography>
        <Typography variant="body2" color="#9A9AA1" fontSize="13px">
          <div>일시: {data.meetDate.split(" ")[0].replace(/-/g, ".")}</div>
          <div>시간: {data.meetDate.split(" ")[1]}</div>
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="#FF814D"
        border="1px solid #FF814D"
        borderRadius="999px"
        sx={{
          position: "absolute",
          bottom: 20,
          left: "16px",
          width: "fit-content",
          padding: "3px 6px",
          fontSize: "12px",
        }}
      >
        {data.job}
      </Typography>
    </Paper>
  );
}

export default CoffeeChatCard;
