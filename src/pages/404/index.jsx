import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { buttonStyle } from 'components/common/button/NavigationBtnStyles';
import { infoBasicStyles } from 'components/member/sign-up/InfoStyles';

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <Typography sx={{ fontSize: '25px', fontWeight: 500, p: 4 }}>존재하지 않는 페이지</Typography>
      <Typography sx={infoBasicStyles.typographySubtitle}>
        접근할 수 없는 URL 주소입니다.
      </Typography>
      <Box sx={{ padding: 4 }}>
        <Close sx={{ fontSize: '40px' }} />
      </Box>
      <Button
        sx={buttonStyle.EndButton}
        onClick={() => {
          navigate('/');
        }}>
        메인 페이지로
      </Button>
    </Container>
  );
}

export default NotFound;
