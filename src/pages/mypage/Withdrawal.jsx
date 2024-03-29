import { useState } from 'react';

import { deleteMember, logoutMember } from 'api/api';
import { buttonStyle } from 'components/common/button/NavigationBtnStyles';
import Header from 'components/common/header/Header';
import { USER_QUIT } from 'constants/headerProps';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Checkbox, Container, FormControlLabel } from '@mui/material';

function Withdrawal() {
  const navigate = useNavigate();
  const [checkState, setCheckState] = useState(false); // 체크박스 상태

  const checkBoxHandler = () => {
    setCheckState(!checkState);
  };

  const deleteMeHandler = async () => {
    if (!checkState) {
      alert('체크박스를 선택해야 진행할 수 있습니다.');
      return;
    } else {
      try {
        const logoutPromise = logoutMember();
        const deletePromise = deleteMember();
        await Promise.all([deletePromise, logoutPromise]);
        alert('회원탈퇴가 성공적으로 진행되었습니다. \n지금까지 JDON을 이용해주셔서 감사합니다.');
        navigate('/');
      } catch (error) {
        console.error('Withdrawal파일 deleteMember 통신에러', error);
      }
    }
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '85vh',
        justifyContent: 'space-between',
        paddingX: '29px',
      }}>
      <Header title={USER_QUIT.title} url={USER_QUIT.url} />

      <Box sx={{ whiteSpace: 'pre-line', wordBreak: 'break-all' }}>
        <h1>회원탈퇴</h1>
        탈퇴 후 같은 소셜 계정으로 재 가입이 불가능하며,
        <br />
        <br />
        삭제된 모든 내용은 복구할 수 없습니다. <br /> <br />
        또한, 본인의 부주의로 인해 발생한 문제에 대해 <br /> <br />
        당사는 책임지지 않습니다.
        <br />
        <br />
        <br />
        <FormControlLabel
          control={<Checkbox checked={checkState} onChange={checkBoxHandler} name="123123" />}
          label="위의 사항을 확인하였습니다."
        />
      </Box>

      <Button
        onClick={deleteMeHandler}
        disabled={!checkState}
        fullWidth
        mb={1}
        sx={{
          ...buttonStyle.Button,
          ...(checkState === true ? buttonStyle.DeleteButton : ''),
        }}>
        회원탈퇴
      </Button>
    </Container>
  );
}

export default Withdrawal;
