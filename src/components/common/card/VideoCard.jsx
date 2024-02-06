import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";
import heart from "../../../assets/icons/heart.svg";
import heartFilled from "../../../assets/icons/heart_filled.svg";
import person from "../../../assets/icons/person.svg";
import { useState, useEffect } from "react";
import { VideoCardStyle } from "./CardStyle";
import "./../../../styles/animations.scss";
import { postFavoritVideo } from "../../../api/api";

function VideoCard({ data }) {
  const [isLiked, setIsLiked] = useState(data.isFavortie || false);
  // console.log("비디오 data", data);

  useEffect(() => {
    if (data.isFavortie !== undefined) {
      setIsLiked(data.isFavortie);
    }
  }, [data.isFavortie]);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prevIsLiked) => !prevIsLiked);
    // console.log("클릭하자마자", isLiked);
  };

  useEffect(() => {
    if (data.lectureId) {
      console.log("체크된 것", data, isLiked);
      const fetchVideoData = async () => {
        try {
          const vedioData = {
            lectureId: data.lectureId,
            isFavorite: isLiked,
          };
          // console.log("통신을 위한 데이터 가공vedioData", vedioData);
          await postFavoritVideo(vedioData);
        } catch (error) {
          console.error("viedoCard파일 postFavoritVideo 통신에러", error);
        }
      };
      fetchVideoData();
    }
  }, [isLiked, data.lectureId]);

  const handleCardClick = () => {
    window.open(data.lectureUrl, "_blank");
  };

  return (
    <Box
      sx={{ my: 1, pointer: "cursor", position: "relative" }}
      onClick={handleCardClick}
    >
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
            {data.price.toLocaleString()}{" "}
            <span style={{ fontSize: "14px" }}>원</span>
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
