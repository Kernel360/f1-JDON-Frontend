import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import heart from "../../../assets/icons/heart.svg";
import heartFilled from "../../../assets/icons/heart_filled.svg";
import person from "../../../assets/icons/person.svg";
import { useState } from "react";
import { VideoCardStyle } from "./CardStyle";
import "./../../../styles/animations.scss";
import { postFavoritVideo } from "../../../api/api";
import { useNavigate } from "react-router-dom";

function VideoCard({ data, onSuccess, myFavorite, onError }) {
  const [isFavorite, setIsFavorite] = useState(
    myFavorite ? true : data.isFavorite
  );

  const isLogin = localStorage.getItem("isLoggedInState") === "true";
  const navigate = useNavigate();

  const toggleFavoriteStatus = async (e) => {
    e.stopPropagation();

    if (!isLogin) {
      promptLogin();
      return;
    }
    try {
      await postFavoritVideo({
        lectureId: data.lectureId,
        isFavorite: !isFavorite,
      });
      //마이페이지 찜화면에서는 좋아요표시를 안바꿔도되서 조건을 넣음
      if (!myFavorite) {
        setIsFavorite(!isFavorite);
      }
      if (onSuccess) onSuccess(isFavorite);
    } catch (error) {
      if (onError) onError(error);
    }
  };
  const promptLogin = () => {
    const confirmResult = window.confirm(
      "찜하기는 로그인 후 이용할 수 있습니다. 로그인 하시겠습니까?"
    );
    if (confirmResult) {
      navigate("/signin");
    }
  };

  const goToLecture = () => {
    window.open(data.lectureUrl, "_blank");
  };

  return (
    <Box
      sx={{ my: 1, pointer: "cursor", position: "relative" }}
      onClick={goToLecture}
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
        src={isFavorite ? heartFilled : heart}
        alt="heart"
        onClick={toggleFavoriteStatus}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          animation: data.isFavorite ? "pop 0.3s ease" : "none",
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
