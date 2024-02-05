import * as React from "react";
import Typography from "@mui/material/Typography";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Box, Paper } from "@mui/material";
import { BadgeStyle, jobStyle } from "./CardStyle";
import { useNavigate } from "react-router-dom";

function CoffeeChatCard({ data }) {
  //  console.log(data);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`./${data.coffeeChatId}`);
  };
  return (
    <Paper
      onClick={handleClick}
      elevation={0}
      sx={{
        pointer: "cursor",
        my: 1,
        border: "1px solid #B9B9B9",
        borderRadius: "8px",
        height: "220px",
        position: "relative",
        opacity: data.activeStatus === "종료" ? 0.4 : 1,
        transition: "transform 0.3s ease", // Add smooth transition
        "&:hover": {
          transform: "scale(1.03)", // Scale on hover
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          top: "8px",
          right: "10px",
          gap: 1,
        }}
      >
        {data.job && (
          <div color="#FF814D" style={jobStyle(data.job)}>
            {data.job}
          </div>
        )}
        <div style={BadgeStyle(data.activeStatus)}>{data.activeStatus}</div>
      </Box>
      <Box
        sx={{
          flexDirection: "column",
          gap: "14px",
          padding: "25px 16px",
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
            WebkitLineClamp: 2,
            textOverflow: "ellipsis",
            height: 45,
            fontSize: "16px",
          }}
        >
          {data.title}
        </Typography>
        <Box
          sx={{
            mt: "22px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
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
            {data.meetDate.split(" ")[0].replace(/-/g, ".")}
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
            <AccessTimeFilledIcon
              sx={{ fontSize: "small", color: "#52BF91" }}
            />
            {data.meetDate.split(" ")[1]}
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
            {data.currentRecruitCount} / {data.totalRecruitCount}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default CoffeeChatCard;
