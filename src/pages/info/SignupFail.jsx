import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from 'components/common/navigation-btn/NavigationBtnStyles';
import Close from '@mui/icons-material/Close';
import { infoBasicStyles } from './InfoStyles';

function SignupFail() {
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
        <Typography sx={{ fontSize: '25px', fontWeight: 500, p: 4 }}>회원가입 실패</Typography>
        <Typography sx={infoBasicStyles.typographySubtitle}>알 수 없는 오류가 발생했습니다. 처음부터 다시 시도해주세요.</Typography>
        <Box sx={{ padding: 4 }}>
          <Close sx={{ fontSize: '40px' }} />
        </Box>
        <Button
          sx={buttonStyle.EndButton}
          onClick={() => {
            navigate('/signin');
          }}>
          로그인 재시도
        </Button>
      </Container>
    </>
  );
}

export default SignupFail;
