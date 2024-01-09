import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import heart from "../../../assets/icons/heart.svg";
import heartFilled from "../../../assets/icons/heart_filled.svg";
import person from "../../../assets/icons/person.svg";
import { useState } from "react";
import { VideoCardStyle } from "./CardStyle";

function VideoCard({ data }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <Box sx={{ my: 1, pointer: "cursor" }}>
      <CardMedia
        component="img"
        image={data.imageUrl}
        sx={{ borderRadius: "8px" }}
      />
      <Box sx={{ mt: 1 }}>
        <Typography sx={VideoCardStyle.Instructor}>
          {data.instructor}
          <img
            src={isLiked ? heartFilled : heart}
            alt="heart"
            onClick={handleLikeClick}
          />
        </Typography>
        <Typography sx={VideoCardStyle.Title}>{data.title}</Typography>
        <Box>
          <Typography fontWeight="500">
            {data.price} <span style={{ fontSize: "12px" }}>원</span>
          </Typography>
        </Box>
        <Typography sx={VideoCardStyle.StudentCount}>
          <img src={person} alt="person" />
          {data.studentCount}
        </Typography>
      </Box>
    </Box>
  );
}

export default VideoCard;
