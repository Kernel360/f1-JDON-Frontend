import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import heart from "../../../assets/icons/heart.svg";
import heartFilled from "../../../assets/icons/heart_filled.svg";
import person from "../../../assets/icons/person.svg";
import { useState, useEffect } from "react";
import { VideoCardStyle } from "./CardStyle";
import "./../../../styles/animations.scss";
import { postFavoritVideo } from "../../../api/api";
import { useNavigate } from "react-router-dom";

function VideoCard({ data, myFavorite }) {
  const [isLiked, setIsLiked] = useState(
    myFavorite ? true : data.isFavortie || false
  );
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLoggedInState")
  );

  const handleConfirm = () => {
    if (
      window.confirm(
        "[찜]은 로그인 후 이용하실 수 있습니다. 로그인페이지로 이동하시겠습니까?"
      )
    ) {
      navigate("/signin");
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();

    if (isLogin === "false") {
      handleConfirm();
      return;
    } else {
      setIsLiked(!isLiked);
    }
  };

  useEffect(() => {
    if (data.isFavortie !== undefined) {
      setIsLiked(data.isFavortie);
    }
  }, [data.isFavortie]);

  useEffect(() => {
    if (isLiked && data.lectureId) {
      const fetchVideoData = async () => {
        try {
          const vedioData = {
            lectureId: data.lectureId,
            isFavorite: isLiked,
          };
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
        src={isLiked === true ? heartFilled : heart}
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
