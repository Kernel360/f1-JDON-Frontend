import { buttonStyle } from 'components/common/button/NavigationBtnStyles';
import { useNavigate } from 'react-router-dom';

import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, Container, Typography } from '@mui/material';

function SignUpSuccessPage() {
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
  );
}

export default SignUpSuccessPage;
