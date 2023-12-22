import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Paper } from "@mui/material";

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

        <Typography variant="body2" component="div" color="text.secondary">
          {name}
        </Typography>
        <Typography>{content}</Typography>
        <Typography v>{price}</Typography>
      </CardActionArea>
    </Paper>
  );
}
