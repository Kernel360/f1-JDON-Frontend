import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Paper } from "@mui/material";
import example from "./../../../assets/images/example.png";

export default function CompanyCard({ name, content }) {
  return (
    <Paper elevation={0} sx={{ my: 1 }}>
      <CardActionArea>
        <CardMedia component="img" image={example} alt="green iguana" />
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="body3"
            component="div"
            color="#9A9AA1"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1, // 이 값으로 표시할 줄 수를 설정합니다.
              textOverflow: "ellipsis",
              height: 17, // 이 값은 줄 수와 폰트 크기에 따라 조정될 수 있습니다.
            }}
          >
            {name}
          </Typography>
          <Typography color="#545459" fontWeight="500">
            {content}
          </Typography>
        </Box>
      </CardActionArea>
    </Paper>
  );
}
