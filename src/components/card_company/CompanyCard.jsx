import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Paper } from "@mui/material";
import example from "./../../assets/example.png";

export default function CompanyCard({ name, content }) {
  return (
    <Paper elevation={0} sx={{ my: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={example}
          alt="green iguana"
        />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body3" component="div" color="#9A9AA1">
            {name}
          </Typography>
          <Typography color="#545459">{content}</Typography>
        </Box>
      </CardActionArea>
    </Paper>
  );
}
