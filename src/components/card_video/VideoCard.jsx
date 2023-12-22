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
          height="120"
          image={img}
          alt="green iguana"
          sx={{ borderRadius: "8px" }}
        />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body3" component="div" color="#9A9AA1">
            {name}
          </Typography>
          <Typography color="#545459">{content}</Typography>
          <Typography color="#545459" fontWeight="700">
            {price}
          </Typography>
        </Box>
      </CardActionArea>
    </Paper>
  );
}
