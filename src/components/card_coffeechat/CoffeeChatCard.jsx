import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Paper } from "@mui/material";

export default function CoffeeChatCard({ name, content, price, img }) {
  return (
    <Paper
      elevation={0}
      sx={{
        my: 1,
        border: "1px solid #BCBCC4",
        borderRadius: "8px",
        height: "220px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "fit-content",
          background: "#FFEBC3",
          borderRadius: "4px",
          padding: "2px 4px",
          fontSize: "12px",
          color: "#323236",
          fontWeight: 500,
        }}
      >
        모집중
      </div>
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
          nickname
        </Typography>
        <Typography color="#545459" fontWeight="500">
          커피챗 제목의 예시
        </Typography>
        <Typography variant="body2" component="div" color="#9A9AA1">
          일시: 2024. 01 . 01
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
        }}
      >
        backend
      </Typography>
    </Paper>
  );
}
