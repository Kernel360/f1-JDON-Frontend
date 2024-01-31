import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";
import heart from "../../../assets/icons/heart.svg";
import heartFilled from "../../../assets/icons/heart_filled.svg";
import person from "../../../assets/icons/person.svg";
import { useState } from "react";
import { VideoCardStyle } from "./CardStyle";
import "./../../../styles/animations.scss";
import { postFavoritVideo } from "../../../api/api";

function VideoCard({ data }) {
  const [isLiked, setIsLiked] = useState(false);
  console.log(data);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    try {
      const res = await postFavoritVideo(data.lectureId, !isLiked);
      setIsLiked((prevIsLiked) => !prevIsLiked);
      console.log("좋아요 응답", res);
    } catch (error) {
      console.error("postFavoritVideo 통신에러", error);
    }
  };

  return (
    <Link
      href={data.lectureUrl}
      style={{
        textDecoration: "none",
        background: "inherit !important",
        outline: "none",
        boxShadow: "none",
      }}
      data-id={data.id} // 데이터의 ID를 data-id 속성으로 저장
    >
      <Box sx={{ my: 1, pointer: "cursor", position: "relative" }}>
        <CardMedia
          component="img"
          image={data.imageUrl}
          sx={{
            borderRadius: "8px",
            maxHeight: "230px",
          }}
        />
        <img
          src={isLiked ? heartFilled : heart}
          alt="heart"
          onClick={handleLikeClick}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            animation: isLiked ? "pop 0.3s ease" : "none",
          }}
        />
        <Box sx={{ mt: 1 }}>
          <Typography sx={VideoCardStyle.Instructor}>
            {data.instructor}
          </Typography>
          <Typography sx={VideoCardStyle.Title}>{data.title}</Typography>
          <Box>
            <Typography fontWeight="600" color="#545459">
              {data.price} <span style={{ fontSize: "14px" }}>원</span>
            </Typography>
          </Box>
          <Typography sx={VideoCardStyle.StudentCount}>
            <img src={person} alt="person" />
            {data.studentCount}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

export default VideoCard;
