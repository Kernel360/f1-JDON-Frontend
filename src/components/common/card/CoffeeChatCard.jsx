import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import { BadgeStyle } from "./CardStyle";

function CoffeeChatCard({ data }) {
  return (
    <Paper
      elevation={0}
      sx={{
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
          padding: "30px 10px",
          height: "100%",
        }}
      >
        <Typography
          variant="body2"
          component="div"
          color="#9A9AA1"
          sx={{ display: "flex" }}
        >
          {data.nickname}
        </Typography>
        <Typography color="#545459" fontWeight="500">
          {data.title}
        </Typography>
        <Typography variant="body2" component="div" color="#9A9AA1">
          일시: {data.meetDate.split(" ")[0].replace(/-/g, ".")}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="#FF814D"
        border="1px solid #FF814D"
        borderRadius="999px"
        sx={{
          position: "absolute",
          bottom: 30,
          left: "10px",
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
