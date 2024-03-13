import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from 'components/common/navigation-btn/NavigationBtnStyles';
import DoneIcon from '@mui/icons-material/Done';

function Done() {
  const navigate = useNavigate();
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}>
        <Typography sx={{ fontSize: '25px', fontWeight: 500, p: 4 }}>
          회원가입이 완료되었습니다!
        </Typography>
        <Box sx={{ padding: 4 }}>
          <DoneIcon sx={{ fontSize: '40px' }} />
        </Box>
        <Button
          sx={buttonStyle.EndButton}
          onClick={() => {
            navigate('/');
          }}>
          이용하러 가기
        </Button>
      </Container>
    </>
  );
}

export default Done;
