import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Paper } from "@mui/material";
import example from "./../../assets/example.png";

export default function CompanyCard({ name, content }) {
  return (
    <Paper elevation={0}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={example}
          alt="green iguana"
        />

        <Typography variant="body2" component="div">
          {name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {content}
        </Typography>
      </CardActionArea>
    </Paper>
  );
}
