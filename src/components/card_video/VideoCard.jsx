import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Paper } from "@mui/material";

export default function VideoCard({ name, content, price, img }) {
  return (
    <Paper elevation={0} sx={{ my: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          alt="green iguana"
          sx={{ borderRadius: "8px" }}
        />
        <Box sx={{ mt: 1, position: "relative" }}>
          <Typography
            color="#545459"
            fontWeight="500"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // 이 값으로 표시할 줄 수를 설정합니다.
              textOverflow: "ellipsis",
              height: 50, // 이 값은 줄 수와 폰트 크기에 따라 조정될 수 있습니다.
            }}
          >
            {content}
          </Typography>
          <Box sx={{ position: "absolute", top: 55, left: 0 }}>
            <Typography variant="body3" component="div" color="#9A9AA1">
              {name}
            </Typography>
            <Typography color="#545459" fontWeight="700">
              {price}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Paper>
  );
}
