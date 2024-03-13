import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import heart from 'assets/icons/heart.svg';
import heartFilled from 'assets/icons/heart_filled.svg';
import person from 'assets/icons/person.svg';
import { useState } from 'react';
import 'styles/animations.scss';
import { postFavoriteVideo } from 'api/api';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';
import { VideoCardStyle } from '../CardStyle';

function VideoCard({ data, onSuccess, myFavorite, onError }) {
  const [isFavorite, setIsFavorite] = useState(myFavorite ? true : data.isFavorite);

  const isLogin = useRecoilValue(isLoggedInState).isLoginUser;

  const navigate = useNavigate();

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!isLogin) {
      promptLogin();
      return;
    }

    const changeFavoriteStatus = async () => {
      const confirmation = !isFavorite || window.confirm('찜을 취소하시겠습니까?');
      if (confirmation) {
        try {
          await postFavoriteVideo({
            lectureId: data.lectureId,
            isFavorite: !isFavorite,
          });

          if (!myFavorite) {
            setIsFavorite((prev) => !prev);
          }

          if (onSuccess) {
            onSuccess(!isFavorite);
          }
        } catch (error) {
          if (onError) {
            onError(error);
          }
        }
      }
    };

    changeFavoriteStatus();
  };

  const promptLogin = () => {
    const confirmResult = window.confirm(
      '찜은 로그인 후 이용할 수 있습니다. \n 로그인 페이지로 이동하시겠습니까?',
    );
    if (confirmResult) {
      navigate('/signin');
    }
  };

  const goToLecture = () => {
    window.open(data.lectureUrl, '_blank');
  };

  return (
    <Box sx={{ my: 1, cursor: 'pointer', position: 'relative' }} onClick={goToLecture}>
      <CardMedia
        component="img"
        image={data.imageUrl}
        sx={{
          borderRadius: '8px',
          maxHeight: '230px',
        }}
      />
      <img
        src={isFavorite ? heartFilled : heart}
        alt="heart"
        onClick={toggleFavorite}
        style={{
          position: 'absolute',
          top: 6,
          right: 6,
          animation: data.isFavorite ? 'pop 0.3s ease' : 'none',
        }}
      />
      <Box sx={{ mt: 1 }}>
        <Typography sx={VideoCardStyle.Instructor}>{data.instructor}</Typography>
        <Typography sx={VideoCardStyle.Title}>{data.title}</Typography>
        <Box>
          <Typography fontWeight="600" color="#545459">
            {data.price.toLocaleString()} <span style={{ fontSize: '14px' }}>원</span>
          </Typography>
        </Box>
        <Typography sx={VideoCardStyle.StudentCount}>
          <img src={person} alt="person" />
          {data.studentCount.toLocaleString('ko-KR')}
        </Typography>
      </Box>
    </Box>
  );
}

export default VideoCard;
